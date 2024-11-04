import { createContext, useEffect, useState } from 'react'
export const ThemeContext = createContext<null | object>(null)

export function ThemeContextProvider({
    children,
}: {
    children: React.ReactElement
}) {
    const [theme, setTheme] = useState<string>('light')
    useEffect(() => {
        const theme = localStorage.getItem('theme')
        if (!theme) {
            localStorage.setItem('theme', 'light')
        } else setTheme(theme)
    }, [])
    useEffect(() => {
        if (theme === 'light') {
            document.body.classList.add('light')
            document.body.classList.remove('dark')
            localStorage.setItem('theme', 'light')
        } else {
            document.body.classList.add('dark')
            document.body.classList.remove('light')
            localStorage.setItem('theme', 'dark')
        }
    }, [theme])
    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeContext
