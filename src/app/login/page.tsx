"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowRight, CheckCircle2, Lock, Mail, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/lib/auth-context"
import { NavbarShell } from "@/components/shared/navbar-shell"
import { Footer } from "@/components/shared/footer"

const benefits = [
  "Manage listing details from one calm dashboard.",
  "Save searches and return to useful businesses faster.",
  "Keep account access protected with clear sign-in controls.",
]

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    try {
      await login(email, password)
      router.push("/settings")
    } catch {
      setError("Invalid email or password")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="site-shell">
      <NavbarShell />
      <main className="flex flex-1 items-center bg-gradient-to-br from-amber-50/70 via-white to-neutral-50 px-4 py-12 sm:px-6 lg:px-10">
        <div className="mx-auto grid w-full max-w-[1160px] gap-8 lg:grid-cols-[minmax(0,1fr)_440px] lg:items-center">
          <section className="hidden lg:block">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white/80 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-amber-900 shadow-sm">
              <ShieldCheck className="h-4 w-4" aria-hidden />
              Account access
            </div>
            <h1 className="mt-6 font-[family-name:var(--font-fraunces)] text-5xl font-semibold tracking-tight text-neutral-950">
              Welcome back to your business workspace.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-neutral-600">
              Sign in to update listings, manage saved items, and keep your public profile current without leaving the directory flow.
            </p>
            <div className="mt-8 grid gap-3">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-3 text-sm text-neutral-700">
                  <CheckCircle2 className="h-5 w-5 text-amber-700" aria-hidden />
                  {benefit}
                </div>
              ))}
            </div>
          </section>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full rounded-xl border border-neutral-200/90 bg-white p-6 shadow-xl shadow-neutral-950/5 sm:p-8"
          >
            <Link href="/" className="text-sm font-semibold text-neutral-700 underline-offset-4 hover:text-neutral-950 hover:underline">
              Back to home
            </Link>

            <div className="mt-8">
              <h1 className="font-[family-name:var(--font-fraunces)] text-3xl font-semibold tracking-tight text-neutral-950">
                Sign in
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                Use your email and password to access your profile settings.
              </p>
            </div>

            {error && (
              <div className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
                {error}
              </div>
            )}

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

              <div className="space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/forgot-password" className="text-xs font-medium text-neutral-700 underline-offset-4 hover:text-neutral-950 hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-11 border-neutral-200 bg-neutral-50/70 pl-9"
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="h-11 w-full bg-neutral-950 text-white hover:bg-neutral-800" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign in"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-neutral-600">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="font-semibold text-neutral-950 underline-offset-4 hover:underline">
                Sign up
              </Link>
            </p>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  )
}