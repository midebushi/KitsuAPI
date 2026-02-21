import { useThemeStore } from "../store/themeStore"

import { MdSunny } from "react-icons/md";
import { FaMoon } from "react-icons/fa6";

import Button from "./Button"

const ThemeToggle = () => {
    const { toggleTheme, theme } = useThemeStore()

  return (
    <Button
        onClick={toggleTheme}
        color="transparent"
        className="text-theme-text-primary transition-all duration-150 hover:scale-105"
    >
        {theme === 'light' ? <MdSunny /> : <FaMoon />}
    </Button>
  )
}

export default ThemeToggle
