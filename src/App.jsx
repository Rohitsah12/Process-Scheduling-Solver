import Header from './components/Header'
import Input from './components/Input'
import Option from './components/Option'
import { ThemeProvider } from './context/ThemeContext'

function App() {
  return (
    <ThemeProvider>
      <Header />
      <Option />
      <Input />
    </ThemeProvider>
        
  )
}

export default App
