import React from 'react'
import Theme from '@src/components/common/ThemeProvider/types/Theme'

interface ThemeContextValue {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = React.createContext<ThemeContextValue>(undefined)

export const useTheme = () => React.useContext(ThemeContext)

const ThemeProvider = ({ children }: { children: unknown }) => {
  const [stateTheme, setStateTheme] = React.useState<Theme>(
    () => (localStorage.getItem('theme') as Theme) || 'auto'
  )

  React.useEffect(() => {
    let themeToSet: 'light' | 'dark'

    if (stateTheme === 'auto') {
      const prefersDarkTheme = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches

      themeToSet = prefersDarkTheme ? 'dark' : 'light'
    } else {
      themeToSet = stateTheme
    }

    window.document.documentElement.setAttribute('data-theme', themeToSet)
  }, [stateTheme])

  const setTheme = React.useCallback((theme: Theme) => {
    setStateTheme(theme)
    localStorage.setItem('theme', theme)
  }, [])

  return (
    <ThemeContext.Provider value={{ theme: stateTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
