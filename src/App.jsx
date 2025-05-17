import Header from './components/Header'
import Option from './components/Option'
import { ThemeProvider } from './context/ThemeContext'

function App() {
  return (
    <ThemeProvider>
      <Header />
      <Option />
      
    </ThemeProvider>
        
  )
}

export default App
