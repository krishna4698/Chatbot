import { useEffect, useState } from 'react'

type Theme = 'dark' | 'light'

const getInitialTheme = (): Theme => {
  const savedTheme = window.localStorage.getItem('chatbot-theme')

  if (savedTheme === 'dark' || savedTheme === 'light') {
    return savedTheme
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem('chatbot-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((currentTheme) =>
      currentTheme === 'dark' ? 'light' : 'dark',
    )
  }

  return {
    isDark: theme === 'dark',
    theme,
    toggleTheme,
  }
}
