import { CheckCircleIcon as SolidCheckCircleIcon } from "@heroicons/react/24/solid";
import { CheckCircleIcon as OutlineCheckCircleIcon } from "@heroicons/react/24/outline";

interface CategoryCardProps {
  category: string;
  image: string;
  isSelected: boolean;
  onToggle: () => void;
}

export default function CategoryCard({ category, image, isSelected, onToggle }: CategoryCardProps) {
  return (
    <div className="bg-white shadow-lg ring-1 ring-gray-900/5 rounded-2xl p-2 flex flex-col items-center">
      <div className="w-full flex justify-end">
        {isSelected ? (
          <SolidCheckCircleIcon
            className="w-6 text-blue-400 cursor-pointer"
            onClick={onToggle}
          />
        ) : (
          <OutlineCheckCircleIcon
            className="w-6 text-gray-500 cursor-pointer"
            onClick={onToggle}
          />
        )}
      </div>
      <img
        alt={category}
        src={image}
        className="w-1/2 h-auto object-cover"
      />
      <div className="mt-4 text-center capitalize">{category}</div>
    </div>
  );
}
