import { RiTelegram2Fill } from "react-icons/ri";

const Footer = () => {
  return (
    <footer className="px-20 py-3 flex justify-between items-center bg-theme-background shadow-xl">
        <p className="text-theme-text-primary">Midebushi. Никаких прав я не защищал.</p>
        <a href="https://t.me/midebushi"><RiTelegram2Fill className="text-theme-text-primary" /></a>
    </footer>
  )
}

export default Footer
