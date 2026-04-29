"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, CheckCircle, Mail, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { NavbarShell } from "@/components/shared/navbar-shell"
import { Footer } from "@/components/shared/footer"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsSubmitted(true)
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="site-shell">
      <NavbarShell />
      <main className="flex flex-1 items-center bg-gradient-to-br from-amber-50/70 via-white to-neutral-50 px-4 py-12 sm:px-6 lg:px-10">
        <div className="mx-auto grid w-full max-w-[1060px] gap-8 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-center">
          <section className="hidden lg:block">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white/80 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-amber-900 shadow-sm">
              <ShieldCheck className="h-4 w-4" aria-hidden />
              Secure reset
            </div>
            <h1 className="mt-6 font-[family-name:var(--font-fraunces)] text-5xl font-semibold tracking-tight text-neutral-950">
              Get back into your account with a clean reset flow.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-neutral-600">
              Enter the email connected to your Apcreatiu account. If it matches our records, we will guide you through the next step.
            </p>
          </section>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full rounded-xl border border-neutral-200/90 bg-white p-6 shadow-xl shadow-neutral-950/5 sm:p-8"
          >
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-700 underline-offset-4 hover:text-neutral-950 hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to login
            </Link>

            {!isSubmitted ? (
              <>
                <h1 className="mt-8 font-[family-name:var(--font-fraunces)] text-3xl font-semibold tracking-tight text-neutral-950">
                  Reset your password
                </h1>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                  Send a secure reset link to the email address connected with your account.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-11 border-neutral-200 bg-neutral-50/70 pl-9"
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="h-11 w-full bg-neutral-950 text-white hover:bg-neutral-800"
                    disabled={isLoading}
                  >
                    {isLoading ? "Sending..." : "Send reset link"}
                  </Button>
                </form>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="pt-8 text-center"
              >
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                  <CheckCircle className="h-8 w-8 text-emerald-700" />
                </div>
                <h1 className="font-[family-name:var(--font-fraunces)] text-3xl font-semibold tracking-tight text-neutral-950">
                  Check your email
                </h1>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                  We sent a password reset link to <strong>{email}</strong>.
                </p>
                <Button asChild variant="outline" className="mt-8 w-full border-neutral-200">
                  <Link href="/login">Back to login</Link>
                </Button>
                <p className="mt-6 text-sm text-neutral-600">
                  Didn&apos;t receive the email?{" "}
                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="font-semibold text-neutral-950 underline-offset-4 hover:underline"
                  >
                    Try again
                  </button>
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  )
}