"use client"

import * as React from "react"
import { ThemeProvider } from "next-themes"

export  default function CustomThemeProvider({ children, ...props }: { children: React.ReactNode; [key: string]: any }) {
  return <ThemeProvider {...props}>{children}</ThemeProvider>
}