import { FaStar } from "react-icons/fa";

const Card = ({ item }: { item: any }) => {
  return (
    <li className="snap-start shrink-0 px-2">
      <div className="rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform cursor-pointer w-48 bg-theme-background">
        <img 
          src={item.attributes.posterImage?.small} 
          alt={item.attributes.canonicalTitle}
          className="w-48 h-44 object-cover"
        />
        <div className="p-4">
          <h3 className="text-sm font-bold text-theme-text-primary truncate">
            {item.attributes.canonicalTitle}
          </h3>
          <div className="flex items-center gap-1">
            <FaStar  className="text-amber-300"/>
            <p className="text-theme-text-primary/60 text-sm mt-1">
            {item.attributes.averageRating || 'N/A'}
            </p>
          </div>
        </div>
      </div>
    </li>
  )
}

export default Card
