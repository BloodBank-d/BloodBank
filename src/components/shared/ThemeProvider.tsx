"use client"

import * as React from "react"

type Theme = "light" | "dark" | "system"

interface ThemeProviderContext {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = React.createContext<ThemeProviderContext | undefined>(undefined)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  attribute = "class"
}: {
  children: React.ReactNode
  defaultTheme?: Theme
  attribute?: string
}) {
  const [theme, setTheme] = React.useState<Theme>(defaultTheme)

  React.useEffect(() => {
    const root = window.document.documentElement
    const initialTheme = localStorage.getItem("theme") as Theme || defaultTheme
    
    setTheme(initialTheme)
    
    if (initialTheme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      root.classList.add(systemTheme)
    } else {
      root.classList.add(initialTheme)
    }
  }, [defaultTheme])

  const value = React.useMemo(() => ({
    theme,
    setTheme: (newTheme: Theme) => {
      const root = window.document.documentElement
      root.classList.remove("light", "dark")
      
      if (newTheme === "system") {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
        root.classList.add(systemTheme)
      } else {
        root.classList.add(newTheme)
      }
      
      localStorage.setItem("theme", newTheme)
      setTheme(newTheme)
    }
  }), [theme])

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = React.useContext(ThemeContext)
  if (!context) throw new Error("useTheme must be used within a ThemeProvider")
  return context
}
