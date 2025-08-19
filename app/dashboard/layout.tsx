import type React from "react"
import type { Metadata } from "next"
import { Work_Sans, Open_Sans } from "next/font/google"
import { DashboardLayout } from "@/components/dashboard-layout"

const workSans = Work_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-work-sans",
  weight: ["400", "600", "700"],
})

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
  weight: ["400", "500", "600"],
})

export const metadata: Metadata = {
  title: "Dashboard Historical Insights Dashboard",
  description: "Manage complex historical data relationships and research",
  generator: "v0.app",
}

export default function DashboardLayoutWrapper({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
        <DashboardLayout>{children}</DashboardLayout>
      
  )
}
