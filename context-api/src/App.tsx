import './App.css'

import { ThemeContextProvider } from './context/ThemeContext'
import ThemeView from './components/ThemeView'
function App() {
    return (
        <ThemeContextProvider>
            <>
                <ThemeView />
            </>
        </ThemeContextProvider>
    )
}

export default App
