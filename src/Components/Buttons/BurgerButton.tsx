import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

interface BurgerButtonType {
    isMenuOpen: boolean,
    setIsMenuOpen: (arg: boolean) => void,
}

const BurgerButton = ({ isMenuOpen, setIsMenuOpen }: BurgerButtonType) => {

  return (
    <button 
          className="md:hidden text-theme-text-primary text-2xl z-50 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
        </button>
  )
}

export default BurgerButton
