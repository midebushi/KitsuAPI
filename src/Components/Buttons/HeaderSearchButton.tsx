import { IoSearch } from "react-icons/io5";

interface HeaderSearchButtonType {
    className?: string,
    isSearchOpen: boolean,
    setIsSearchOpen: (arg: boolean) => void
}

const HeaderSearchButton = ({ className = '', isSearchOpen, setIsSearchOpen }: HeaderSearchButtonType) => {
    return (
        <button 
            className={`text-2xl text-theme-text-primary absolute left-3 top-3 pl-0 flex items-center md:opacity-50 md:pointer-events-none ${className} ${isSearchOpen ? 'opacity-50' : ''}`}
            onClick={() => setIsSearchOpen(!isSearchOpen)}    
        >
            <IoSearch />
        </button>
    )
}

export default HeaderSearchButton