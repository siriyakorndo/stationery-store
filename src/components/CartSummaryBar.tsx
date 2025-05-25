interface CartSummaryBarProps {
  totalPrice: number;
  onCreateOrder: () => void;
}

export default function CartSummaryBar({
  totalPrice,
  onCreateOrder,
}: CartSummaryBarProps) {
  return (
    <div className="fixed bottom-0 right-0 w-full md:w-3/4 lg:w-5/6 bg-white text-white py-4 text-center">
      <div className="mx-auto px-4 flex items-center justify-between grid grid-cols-4 gap-4">
        <div className="col-span-2 lg:col-span-3 bg-red-400 text-white flex items-center justify-between rounded-md p-4 text-sm md:text-md font-bold w-full">
          <div>
            {/* <span className="text-red-500 bg-white p-3 mr-2 rounded-md">
              {totalQuantity}
            </span> */}
            <span>Total</span>
          </div>

          <div>{totalPrice} Baht</div>
        </div>

        <button
          onClick={onCreateOrder}
          className="col-span-2 lg:col-span-1 bg-blue-400 text-white flex items-center justify-center rounded-md p-4 text-md font-bold w-full"
        >
          Create Order
        </button>
      </div>
    </div>
  );
}
