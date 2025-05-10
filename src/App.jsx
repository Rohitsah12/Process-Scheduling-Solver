import Header from './components/Header'
import Input from './components/Input'
import { ThemeProvider } from './context/ThemeContext'

function App() {
  return (
    <ThemeProvider>
      <Header />
      <Input />
    </ThemeProvider>
        
  )
}

export default App
