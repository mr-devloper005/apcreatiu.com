"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Plus, Save, Sparkles } from "lucide-react";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { Footer } from "@/components/shared/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/lib/auth-context";
import { CATEGORY_OPTIONS } from "@/lib/categories";
import { SITE_CONFIG, type TaskKey } from "@/lib/site-config";
import { addLocalPost } from "@/lib/local-posts";

type Field = {
  key: string;
  label: string;
  type:
    | "text"
    | "textarea"
    | "url"
    | "number"
    | "tags"
    | "images"
    | "highlights"
    | "category"
    | "file";
  placeholder?: string;
  required?: boolean;
};

const FORM_CONFIG: Record<TaskKey, { title: string; description: string; fields: Field[] }> = {
  listing: {
    title: "Create Business Listing",
    description: "Add a local-only listing with business details.",
    fields: [
      { key: "title", label: "Listing title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Full description", type: "textarea", required: true },
      { key: "category", label: "Category", type: "category", required: true },
      { key: "location", label: "Location", type: "text" },
      { key: "address", label: "Address", type: "text" },
      { key: "website", label: "Website URL", type: "url" },
      { key: "email", label: "Business email", type: "text" },
      { key: "phone", label: "Phone", type: "text" },
      { key: "logo", label: "Logo URL", type: "url" },
      { key: "images", label: "Gallery images", type: "images" },
      { key: "highlights", label: "Highlights", type: "highlights" },
    ],
  },
  classified: {
    title: "Create Classified",
    description: "Add a local-only classified ad.",
    fields: [
      { key: "title", label: "Ad title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Ad details", type: "textarea", required: true },
      { key: "category", label: "Category", type: "category", required: true },
      { key: "location", label: "Location", type: "text" },
      { key: "address", label: "Address", type: "text" },
      { key: "website", label: "Website URL", type: "url" },
      { key: "email", label: "Business email", type: "text" },
      { key: "phone", label: "Phone", type: "text" },
      { key: "images", label: "Images", type: "images" },
      { key: "highlights", label: "Highlights", type: "highlights" },
    ],
  },
  article: {
    title: "Create Article",
    description: "Write a local-only article post.",
    fields: [
      { key: "title", label: "Article title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Article content (HTML allowed)", type: "textarea", required: true },
      { key: "category", label: "Category", type: "category", required: true },
      { key: "images", label: "Cover images", type: "images" },
      { key: "tags", label: "Tags", type: "tags" },
    ],
  },
  image: {
    title: "Create Image Share",
    description: "Share image-only content locally.",
    fields: [
      { key: "title", label: "Image title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Caption", type: "textarea" },
      { key: "category", label: "Category", type: "category" },
      { key: "images", label: "Images", type: "images", required: true },
      { key: "tags", label: "Tags", type: "tags" },
    ],
  },
  profile: {
    title: "Create Profile",
    description: "Create a local-only business profile.",
    fields: [
      { key: "brandName", label: "Brand name", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "About the brand", type: "textarea" },
      { key: "website", label: "Website URL", type: "url", required: true },
      { key: "logo", label: "Logo URL", type: "url", required: true },
    ],
  },
  social: {
    title: "Create Social Post",
    description: "Publish a local-only social update.",
    fields: [
      { key: "title", label: "Post title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Post content", type: "textarea", required: true },
      { key: "category", label: "Category", type: "category" },
      { key: "images", label: "Images", type: "images" },
      { key: "tags", label: "Tags", type: "tags" },
    ],
  },
  sbm: {
    title: "Create Bookmark",
    description: "Submit a local-only social bookmark.",
    fields: [
      { key: "title", label: "Bookmark title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Why it’s useful", type: "textarea" },
      { key: "website", label: "Target URL", type: "url", required: true },
      { key: "category", label: "Category", type: "category" },
      { key: "tags", label: "Tags", type: "tags" },
    ],
  },
  pdf: {
    title: "Create PDF Entry",
    description: "Add a local-only PDF resource.",
    fields: [
      { key: "title", label: "PDF title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Description", type: "textarea" },
      { key: "fileUrl", label: "PDF file URL", type: "file", required: true },
      { key: "category", label: "Category", type: "category", required: true },
      { key: "images", label: "Cover image", type: "images" },
    ],
  },
  org: {
    title: "Create Organization",
    description: "Create a local-only organization profile.",
    fields: [
      { key: "brandName", label: "Organization name", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "About the organization", type: "textarea" },
      { key: "website", label: "Website URL", type: "url" },
      { key: "logo", label: "Logo URL", type: "url" },
    ],
  },
  comment: {
    title: "Create Blog Comment",
    description: "Store a local-only blog comment entry.",
    fields: [
      { key: "title", label: "Comment title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Comment body", type: "textarea", required: true },
      { key: "website", label: "Target post URL", type: "url", required: true },
      { key: "category", label: "Category", type: "category" },
    ],
  },
};

export default function CreateTaskPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const params = useParams();
  const taskKey = params?.task as TaskKey;

  const taskConfig = useMemo(
    () => SITE_CONFIG.tasks.find((task) => task.key === taskKey && task.enabled),
    [taskKey]
  );
  const formConfig = FORM_CONFIG[taskKey];

  const [values, setValues] = useState<Record<string, string>>({});
  const [uploadingPdf, setUploadingPdf] = useState(false);

  const isListingFlow = taskKey === "listing";

  if (!taskConfig || !formConfig) {
    return (
      <div className="site-shell">
        <NavbarShell />
        <main className="flex flex-1 flex-col items-center justify-center px-4 py-16">
          <div className="site-surface-card max-w-md p-10 text-center">
          <h1 className="text-2xl font-semibold text-neutral-950">Task not available</h1>
          <p className="mt-2 text-neutral-600">
            This task is not enabled for the current site.
          </p>
          <Button className="mt-6 bg-neutral-950 text-white hover:bg-neutral-800" asChild>
            <Link href="/">Back home</Link>
          </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const updateValue = (key: string, value: string) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in before creating content.",
      });
      router.push("/login");
      return;
    }

    const missing = formConfig.fields.filter((field) => field.required && !values[field.key]);
    if (missing.length) {
      toast({
        title: "Missing fields",
        description: "Please fill all required fields before saving.",
      });
      return;
    }

    const title = values.title || values.brandName || "Untitled";
    const summary = values.summary || "";
    const contentType = taskConfig.contentType || taskKey;

    const content: Record<string, unknown> = {
      type: contentType,
    };

    if (values.category) content.category = values.category;
    if (values.description) content.description = values.description;
    if (values.website) content.website = values.website;
    if (values.email) content.email = values.email;
    if (values.phone) content.phone = values.phone;
    if (values.address) content.address = values.address;
    if (values.location) content.location = values.location;
    if (values.logo) content.logo = values.logo;
    if (values.fileUrl) content.fileUrl = values.fileUrl;
    if (values.brandName) content.brandName = values.brandName;

    const highlights = values.highlights
      ? values.highlights.split(",").map((item) => item.trim()).filter(Boolean)
      : [];
    if (highlights.length) content.highlights = highlights;

    const tags = values.tags
      ? values.tags.split(",").map((item) => item.trim()).filter(Boolean)
      : [];

    const images = values.images
      ? values.images.split(",").map((item) => item.trim()).filter(Boolean)
      : [];

    const post = addLocalPost({
      task: taskKey,
      title,
      summary,
      authorName: user.name,
      tags,
      content,
      media: images.map((url) => ({ url, type: "IMAGE" })),
      publishedAt: new Date().toISOString(),
    });

    toast({
      title: "Saved locally",
      description: "This post is stored only in your browser.",
    });

    router.push(`/local/${taskKey}/${post.slug}`);
  };

  const formFields = (
    <>
      <div className="flex flex-wrap gap-2">
        <Badge variant="secondary">{taskConfig.label}</Badge>
        <Badge variant="outline">Local-only</Badge>
      </div>

      <div className="mt-6 grid gap-6">
        {formConfig.fields.map((field) => (
          <div key={field.key} className="grid gap-2">
            <Label>
              {field.label} {field.required ? <span className="text-red-500">*</span> : null}
            </Label>
            {field.type === "textarea" ? (
              <Textarea
                rows={4}
                placeholder={field.placeholder}
                value={values[field.key] || ""}
                onChange={(event) => updateValue(field.key, event.target.value)}
                className="border-2 border-slate-200 bg-white focus-visible:ring-2 focus-visible:ring-primary/30"
              />
            ) : field.type === "category" ? (
              <select
                value={values[field.key] || ""}
                onChange={(event) => updateValue(field.key, event.target.value)}
                className="h-11 rounded-lg border-2 border-slate-200 bg-white px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
              >
                <option value="">Select category</option>
                {CATEGORY_OPTIONS.map((option) => (
                  <option key={option.slug} value={option.slug}>
                    {option.name}
                  </option>
                ))}
              </select>
            ) : field.type === "file" ? (
              <div className="grid gap-3">
                <Input
                  type="file"
                  accept="application/pdf"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (!file) return;
                    if (file.type !== "application/pdf") {
                      toast({
                        title: "Invalid file",
                        description: "Please upload a PDF file.",
                      });
                      return;
                    }
                    const reader = new FileReader();
                    setUploadingPdf(true);
                    reader.onload = () => {
                      const result = typeof reader.result === "string" ? reader.result : "";
                      updateValue(field.key, result);
                      setUploadingPdf(false);
                      toast({
                        title: "PDF uploaded",
                        description: "File is stored locally.",
                      });
                    };
                    reader.readAsDataURL(file);
                  }}
                />
                <Input
                  type="text"
                  placeholder="Or paste a PDF URL"
                  value={values[field.key] || ""}
                  onChange={(event) => updateValue(field.key, event.target.value)}
                />
                {uploadingPdf ? <p className="text-xs text-muted-foreground">Uploading PDF…</p> : null}
              </div>
            ) : (
              <Input
                type={field.type === "number" ? "number" : "text"}
                placeholder={
                  field.type === "images" || field.type === "tags" || field.type === "highlights"
                    ? "Separate values with commas"
                    : field.placeholder
                }
                value={values[field.key] || ""}
                onChange={(event) => updateValue(field.key, event.target.value)}
                className="h-11 border-2 border-slate-200 bg-white focus-visible:ring-2 focus-visible:ring-primary/30"
              />
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button className="bg-neutral-950 text-white hover:bg-neutral-800" onClick={handleSubmit}>
          <Save className="mr-2 h-4 w-4" />
          Save locally
        </Button>
        <Button variant="ghost" asChild>
          <Link href={taskConfig.route}>
            View {taskConfig.label}
            <Plus className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </>
  );

  return (
    <div className="site-shell">
      <NavbarShell />
      <main className="flex flex-1 flex-col">
        {isListingFlow ? (
          <section className="border-b border-amber-200/60 bg-gradient-to-br from-amber-50/80 via-white to-neutral-50">
            <div className="site-container py-10 sm:py-12 lg:py-14">
              <div className="mx-auto max-w-6xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-amber-200/80 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-900/90">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden />
                  List your business
                </div>
                <h1 className="mt-3 max-w-3xl font-[family-name:var(--font-fraunces)] text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl lg:text-[2.65rem]">
                  A polished profile that shows up when people are ready to choose
                </h1>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-neutral-600 sm:text-base">
                  {formConfig.description} Complete the fields below—your listing preview updates as you go, and you can
                  refine details anytime after saving.
                </p>
                <ul className="mt-8 grid gap-3 sm:grid-cols-3">
                  {[
                    "Lead with a clear title and one-line promise in the summary.",
                    "Match the category that best fits how customers search for you.",
                    "Add phone, email, or site so visitors can act in one tap.",
                  ].map((tip) => (
                    <li
                      key={tip}
                      className="flex gap-2 rounded-xl border border-amber-200/50 bg-white/90 p-4 text-sm text-neutral-700 shadow-sm"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" aria-hidden />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        ) : null}

        <div className="site-container py-12">
          <div className={`mx-auto ${isListingFlow ? "max-w-6xl" : "max-w-4xl"}`}>
            <div className="mb-8 flex items-center gap-3">
              <Button variant="ghost" size="icon" asChild>
                <Link href="/">
                  <ArrowLeft className="h-5 w-5" />
                </Link>
              </Button>
              <div>
                <h2
                  className={
                    isListingFlow
                      ? "text-xl font-semibold text-neutral-950 sm:text-2xl"
                      : "text-2xl font-semibold text-neutral-950"
                  }
                >
                  {formConfig.title}
                </h2>
                {!isListingFlow ? <p className="text-sm text-neutral-600">{formConfig.description}</p> : null}
              </div>
            </div>

            {isListingFlow ? (
              <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start">
                <div className="site-surface-card p-8">{formFields}</div>
                <aside className="space-y-4 lg:sticky lg:top-24">
                  <div className="rounded-xl border border-amber-200/60 bg-gradient-to-b from-amber-50/50 to-white p-5 shadow-sm">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-900/80">Before you publish</p>
                    <ul className="mt-3 space-y-2 text-sm text-neutral-600">
                      <li>Double-check hours for holidays and seasonal closures.</li>
                      <li>Use real photos—stock images reduce trust in directories.</li>
                      <li>Gallery URLs can be comma-separated; order is preserved.</li>
                    </ul>
                  </div>
                  <div className="rounded-xl border border-neutral-200/90 bg-white p-5 shadow-sm">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">Need help?</p>
                    <p className="mt-2 text-sm text-neutral-600">
                      Browse guides in{" "}
                      <Link href="/help" className="font-medium text-amber-800 underline-offset-4 hover:underline">
                        Help &amp; support
                      </Link>{" "}
                      or message us from{" "}
                      <Link href="/contact" className="font-medium text-amber-800 underline-offset-4 hover:underline">
                        Contact
                      </Link>
                      .
                    </p>
                  </div>
                </aside>
              </div>
            ) : (
              <div className="site-surface-card p-8">{formFields}</div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
