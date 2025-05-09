import { useDarkMode } from '../context/ThemeContext'
import { Moon, Sun } from "lucide-react";

function DarkModeToggler() {
const {darkMode,setDarkMode}=useDarkMode();
  return (
    <button onClick={()=>setDarkMode(!darkMode)} className='cursor-pointer '>
      {darkMode? <Sun size={24} />:<Moon size={24} />}
    </button>
  )
}

export default DarkModeToggler
