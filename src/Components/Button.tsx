import { AiOutlineLoading } from "react-icons/ai"

const buttonColors = {
    'accent': 'bg-theme-accent hover:bg-theme-accent-hov',
    'attention': 'bg-theme-attention hover:bg-theme-attention-hov',
    'transparent': 'bg-transparent hover:bg-theme-transparent-hov',
} as const

type ButtonColorKey = keyof typeof buttonColors

interface ButtonType {
    children: string | React.ReactNode,
    color: ButtonColorKey,
    className?: string,
    type?: 'button' | 'submit' | 'reset',
    onClick?: () => void,
    loading?: boolean,
}

const Button: React.FC<ButtonType> = ({ children, color = 'accent', className = '', type = 'button', onClick, loading = false }) => {
    const colorClass = buttonColors[color]

  return (
    <button 
      className={`${className} ${colorClass} flex items-center justify-center px-4 py-2 rounded transition-all duration-150 hover:scale-105 disabled:opacity-75 disabled:cursor-not-allowed`} 
      onClick={onClick}
      type={type}
      disabled={loading}
    >
        {loading ? <AiOutlineLoading className="animate-spin text-white" /> : children}
    </button>
  )
}

export default Button
