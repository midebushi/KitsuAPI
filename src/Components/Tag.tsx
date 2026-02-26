interface TagProps {
    name: string,
    className?: string
}
const Tag = ({ name, className}: TagProps) => {
  return (
    <li className={`border border-theme-text-primary/50 text-xs text-theme-text-primary rounded p-1 w-fit h-fit text-nowrap font-bold ${className}`}>
      {name}
    </li>
  )
}

export default Tag
