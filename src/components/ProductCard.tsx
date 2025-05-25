import { PlusIcon, MinusIcon } from "@heroicons/react/24/solid";

interface ProductCardProps {
  item: {
    id: string;
    image: string;
    productName: string;
    price: number;
  };
  count: number;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  onChangeManual: (id: string, newValue: number) => void;
}

export default function ProductCard({
  item,
  count,
  onIncrement,
  onDecrement,
  onChangeManual,
}: ProductCardProps) {
  return (
    <div className="group relative bg-white p-6 rounded-md">
      <div className="w-full h-30 lg:h-36 overflow-hidden bg-blue-100 relative">
        <img
          alt={item.id}
          src={item.image}
          className="lg:w-full h-full p-4 object-contain"
        />
      </div>

      <div className="mt-4">
        <h3 className="text-sm text-gray-700">{item.productName}</h3>
        <p className="mt-1 text-xl">
          {item.price} <span className="text-red-400">Baht</span>
        </p>
      </div>

      <div className="flex justify-end mt-auto gap-2">
        {count > 0 && (
          <>
            <button
              onClick={() => onDecrement(item.id)}
              className="flex items-center justify-center w-6 h-6 text-white bg-red-400 rounded-xl"
            >
              <MinusIcon className="w-4 h-4" />
            </button>
            {/* <span>{count}</span> */}
            <input
              type="number"
              min={0}
              value={count}
              onChange={(e) => {
                const newValue = parseInt(e.target.value, 10);
                if (!isNaN(newValue)) {
                  onChangeManual(item.id, newValue);
                }
              }}
              className="w-12 text-center border border-gray-300 rounded"
            />
          </>
        )}
        <button
          onClick={() => onIncrement(item.id)}
          className="flex items-center justify-center w-6 h-6 text-white bg-red-400 rounded-xl"
        >
          <PlusIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
