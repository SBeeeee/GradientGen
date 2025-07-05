import { Sun, Moon } from "lucide-react";
const  ThemeToggle = ({ isDark, setIsDark }) => {
    return (
      <button
        className={`p-2 rounded border transition-colors ${
          isDark ? "bg-white text-black" : "bg-black text-white"
        }`}
        onClick={() => setIsDark(!isDark)}
      >
        {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </button>
    )
  }
  
  export default ThemeToggle;