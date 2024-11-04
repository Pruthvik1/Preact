import React, { useContext } from 'react'
import ThemeContext from '../context/ThemeContext'

function ThemeView() {
    const { theme, setTheme } = useContext(ThemeContext)
    const handleClick = () => {
        if (theme === 'light') {
            setTheme('dark')
        } else {
            setTheme('light')
        }
    }
    return (
        <div className="form-wrap">
            <button className="form-btn" onClick={handleClick}>
                Theme Change
            </button>
            <p> current Theme is {theme}</p>
        </div>
    )
}

export default ThemeView
