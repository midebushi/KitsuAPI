import { forwardRef, type InputHTMLAttributes } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string,
  error?: string,
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ label, error, className = '', ...props}, ref) => {
        return (
            <div className='flex flex-col'>
                <label htmlFor="" className='text-theme-text-primary opacity-50'>{label}</label>
                <input ref={ref} className={`border border-theme-text-primary text-theme-text-primary p-2 rounded ${className}`} {...props}/>
                {error && (
                    <p className="text-theme-attention text-xs font-medium mt-1">{error}</p>
                )}
            </div>
        )
    }
)

Input.displayName = 'Input'

export default Input
