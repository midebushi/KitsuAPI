interface SliderButtonProps {
    children: React.ReactNode,
    onClick: () => void,
    direction: 'left' | 'right'
}

const SliderButton = ({ children, onClick, direction }: SliderButtonProps) => {
  return (
    <button 
        className={`absolute ${direction}-2 top-1/2 -translate-y-1/2 z-10 bg-theme-background-secondary/90 text-theme-text-primary p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-theme-accent hover:text-white hover:scale-110 hidden md:block`}
        onClick={onClick}
    >
        {children}
    </button>
  )
}

export default SliderButton
