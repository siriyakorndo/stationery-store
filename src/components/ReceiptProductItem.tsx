interface ReceiptProductItemProps {
  product: {
    productName: string;
    price: number;
    quantity: number;
  };
  onDelete: () => void;
  onQuantityChange: (newQuantity: number) => void;
  getProductImage: (name: string) => string;
}

export default function ReceiptProductItem({
  product,
  onDelete,
  onQuantityChange,
  getProductImage,
}: ReceiptProductItemProps) {
  return (
    <div className="p-3 border-b border-gray-200">
      <div className="grid grid-cols-12 gap-4 items-center text-sm">
        <div className="hidden md:block col-span-1">
          <img
            src={getProductImage(product.productName)}
            alt={product.productName}
            className="w-16 h-16 object-cover rounded"
          />
        </div>
        <div className="col-span-5 md:col-span-4">
          <div className="font-semibold text-gray-800">
            {product.productName}
          </div>
          <div className="text-gray-500 text-xs">{product.price} Baht / ea</div>
        </div>
        <div className="col-span-2 text-center text-gray-700">
          {" "}
          <input
            type="number"
            min={1}
            value={product.quantity}
            onChange={(e) => {
              const newValue = parseInt(e.target.value, 10);
              if (!isNaN(newValue) && newValue > 0) {
                onQuantityChange(newValue);
              }
            }}
            className="w-12 text-center border border-gray-300 rounded"
          />
        </div>

        <div className="col-span-3 text-right font-bold text-blue-600">
          {product.price * product.quantity} Baht
        </div>
        <div className="col-span-2 text-right">
          <div
            onClick={onDelete}
            className="text-red-500 cursor-pointer underline text-s hover:text-red-700 transition"
          >
            Delete
          </div>
        </div>
      </div>
    </div>
  );
}
