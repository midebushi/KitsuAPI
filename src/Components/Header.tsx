import { Link } from "@tanstack/react-router"
import { useAuthStore } from "../store/authStore"
import { useCurrentUser } from "../hooks/useCurrentUser"
import { IoSearch } from "react-icons/io5";

import Button from "./Buttons/Button"
import ThemeToggle from "./ThemeToggle"
import Skeleton from "./Skeleton"



const Header = () => {

  const { isAuthenticated, logout } = useAuthStore()
  const { data: user, isLoading } = useCurrentUser()

  return (
    <header className="px-20 py-3 flex justify-between bg-theme-background shadow-xl/30">
      <Link to="/" className="text-2xl font-bold text-theme-text-primary transition-all duration-150 hover:scale-105">Kitsu API</Link>
      <div className="flex gap-4 items-center">
        <div className="relative w-full max-w-sm">
          <IoSearch className="absolute left-0 top-3 pl-0 flex items-center pointer-events-none w-10 text-theme-text-primary opacity-50" />
          <input 
            type="text" 
            placeholder="Search in Kitsu"
            className="bg-theme-background-secondary text-theme-text-primary p-2 rounded pl-10 focus:outline-0"
          />

        </div>
        {isAuthenticated ? (
          <div className="flex items-center gap-3">
            {isLoading ? (
              <div className="text-theme-text-primary flex items-center gap-3">
                <Skeleton className="w-[79px] h-[24px]"></Skeleton>
                <Skeleton className="w-10 h-10"></Skeleton>
              </div>
            ) : (
              <>
                <span className="font-bold text-theme-text-primary">{user?.attributes?.name}</span>
                <img 
                  src={user?.attributes?.avatar?.tiny} 
                  alt="Avatar" 
                  className="w-10 h-10 rounded-full border-2 border-green-500"
                />
              </>
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
          // ЕСЛИ НЕТ
          <div className="flex gap-2">
            <Link to="/login" className="px-4 py-2 bg-theme-accent hover:bg-theme-accent-hov rounded transition-all duration-150 hover:scale-105 text-white">
              Log In
            </Link>
            <Link to="/register" className="px-4 py-2 text-theme-text-primary transition-all duration-150 hover:scale-105">
              Register
            </Link>
          </div>
        )}
        <ThemeToggle/>

      </div>
      
    </header>
  )
}

export default Header
