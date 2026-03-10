import { Link } from "@tanstack/react-router"
import { useAuthStore } from "../store/authStore"
import { useCurrentUser } from "../hooks/useCurrentUser"
import { useState } from "react";


import Button from "./Buttons/Button"
import BurgerButton from "./Buttons/BurgerButton";
import HeaderSearchButton from "./Buttons/HeaderSearchButton";
import ThemeToggle from "./ThemeToggle"
import Skeleton from "./Skeleton"


const Header = () => {

  const { isAuthenticated, logout } = useAuthStore()
  const { data: user, isLoading } = useCurrentUser()

  const [ isMenuOpen, setIsMenuOpen ] = useState(false)
  const [ isSearchOpen, setIsSearchOpen ] = useState(false)


  return (
    <header className="relative md:px-20 px-4 py-3 bg-theme-background shadow-xl/10 z-20">
      <div className="flex justify-between max-w-425 m-auto items-center">
        <Link to="/" className="text-2xl h-10 font-bold text-theme-text-primary transition-all duration-150 hover:scale-105 whitespace-nowrap mr-auto">Kitsu</Link>
        <div className="flex max-w-full">
          <div className={`relative mx-5 flex items-center h-12 md:w-full md:max-w-140 ${isSearchOpen ? 'w-full md:max-w-140' : 'w-10 '}`}>
            
            <HeaderSearchButton isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen}/>
            <input 
              type="text" 
              placeholder="Search in Kitsu"
              className={` text-theme-text-primary rounded focus:outline-0 transition-all duration-300  md:placeholder:text-theme-text-primary md:bg-theme-background-secondary md:placeholder:opacity-50 h-full md:w-full md:pr-3 md:pl-12 md:opacity-100 ${isSearchOpen ? 'w-full pr-3 pl-12 opacity-100 bg-theme-background-secondary' : 'w-0 px-0 opacity-0 placeholder:text-transparent'}`}
            />
          </div>
       
        </div>
        <BurgerButton isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}></BurgerButton>
        
        <div className={`fixed md:static right-0 w-full p-4 top-16 md:w-auto flex flex-col md:flex-row md:p-0 gap-4 md:items-center shadow-xl md:shadow-none origin-top bg-theme-background transition-all duration-300 ease-in-out z-50 ${isMenuOpen ? 'flex flex-col items-end translate-x-0' : 'translate-x-full md:translate-x-0'}`}>
          
          {isAuthenticated ? (
            <div className="flex gap-3 flex-col md:flex-row items-end">
              {isLoading ? (
                <div className="text-theme-text-primary flex items-center gap-3">
                  <Skeleton className="w-[79px] h-[24px]"></Skeleton>
                  <Skeleton className="w-10 h-10"></Skeleton>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <span className="font-bold text-theme-text-primary">{user?.attributes?.name}</span>
                  <img 
                    src={user?.attributes?.avatar?.tiny} 
                    alt="Avatar" 
                    className="w-10 h-10 rounded-full border-2 border-green-500"
                  />
                </div>
              )}

              <Button 
                onClick={() => { logout(); window.location.reload(); }}
                className="px-3 py-1 rounded cursor-pointer text-white"
                color='attention'
                >
                  Exit
              </Button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link to="/login" className="px-4 py-2 text-nowrap bg-theme-accent hover:bg-theme-accent-hov rounded transition-all duration-150 hover:scale-105 text-white">
                Log In
              </Link>
              <Link to="/register" className="px-4 py-2 text-theme-text-primary transition-all duration-150 hover:scale-105">
                Register
              </Link>
            </div>
          )}
          <ThemeToggle/>

        </div>
      </div>
      
    </header>
  )
}

export default Header
