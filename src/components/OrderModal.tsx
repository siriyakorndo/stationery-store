import { Dialog } from "@headlessui/react";
import { ClipboardDocumentListIcon } from "@heroicons/react/16/solid";
import { XMarkIcon } from "@heroicons/react/24/solid";

interface Product {
  productName: string;
  price: number;
  quantity: number;
}

interface OrderModalProps {
  open: boolean;
  onClose: () => void;
  receiptId: string;
  setReceiptId: (value: string) => void;
  errorMessage?: string;
  newData: Product[];
  handleAddProduct: () => void;
  totalPrice: number;
  // setNewData: React.Dispatch<
  //   React.SetStateAction<
  //     { productName: string; price: number; quantity: number }[]
  //   >
  // >;
}

export default function OrderModal({
  open,
  onClose,
  receiptId,
  setReceiptId,
  errorMessage,
  newData,
  handleAddProduct,
  totalPrice,
  // setNewData,
}: OrderModalProps) {
  // function handleDelete(index: number) {
  //   const updatedData = newData.filter((_, i) => i !== index);
  //   setNewData(updatedData);
  // }
  // console.log(newData);
  // const computedTotalPrice = newData.reduce(
  //   (acc, product) => acc + product.price * product.quantity,
  //   0
  // );

  return (
    <Dialog open={open} onClose={() => {}} className="relative z-10">
      <div
        className="fixed inset-0 bg-black/50"
        aria-hidden="true"
        onClick={(e) => e.stopPropagation()}
      />
      <div
        className="fixed inset-0 flex items-center justify-center p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full mx-auto bg-white rounded-xl p-6 shadow-lg max-w-md">
          <div className="relative">
            <div className="absolute top-0 right-0">
              <XMarkIcon
                className="w-4 h-4 text-gray-400 cursor-pointer"
                onClick={onClose}
              />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center mb-4">
            <ClipboardDocumentListIcon className="w-16 h-16 text-white mb-2 bg-red-500 p-2 rounded-full" />
            <div className="text-lg font-semibold">Name Your Order</div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddProduct();
            }}
          >
            <input
              id="receiptId"
              name="receiptId"
              type="text"
              value={receiptId}
              placeholder="Input Your Order Name..."
              onChange={(e) => setReceiptId(e.target.value)}
              className="block w-full max-w-md rounded-md border-0 py-1.5 pl-5 pr-20 text-gray-900 ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm"
            />
            {errorMessage && (
              <div className="text-red-500 mt-2">Error : {errorMessage}</div>
            )}

            <div className="grid grid-cols-4 font-bold text-gray-700 p-2 border-b mt-2">
              <div className="col-span-2">Item</div>
              <div className="text-center">Qty</div>
              <div className="text-right">Total</div>
            </div>

            {newData.map((product, index) => (
              <div key={index} className="p-2 border-b border-gray-200">
                <div className="grid grid-cols-4 gap-2 items-center text-sm">
                  <div className="col-span-2">
                    <div className="font-medium">{product.productName} </div>
                    <div className="text-gray-500">{product.price} Baht/ea</div>
                  </div>
                  <div className="text-center">{product.quantity}</div>
                  {/* <input
                    type="number"
                    min={1}
                    value={product.quantity}
                    onChange={(e) => {
                      const newValue = parseInt(e.target.value, 10);
                      if (!isNaN(newValue) && newValue > 0) {
                        setNewData((prevData) =>
                          prevData.map((p, i) =>
                            i === index ? { ...p, quantity: newValue } : p
                          )
                        );
                      }
                    }}
                    className="w-16 text-center border border-gray-300 rounded"
                  /> */}

                  <div className="text-right">
                    {product.price * product.quantity} ฺ
                  </div>
                  {/* <div
                    onClick={() => handleDelete(index)}
                    className="ml-4 text-red-500 hover:text-red-700 font-bold"
                    aria-label={`Delete ${product.productName}`}
                  >
                    Delete
                  </div> */}
                </div>
              </div>
            ))}
            <div className="flex justify-between w-full px-2 py-2">
              <div className="font-bold">Total Price</div>
              <div className="text-right font-bold text-red-400">
                {totalPrice} Baht
              </div>
            </div>

            <div className="flex justify-between space-x-2 mt-4 w-full">
              <button
                onClick={onClose}
                className="flex items-center justify-center rounded-md p-3 text-sm font-medium w-1/2 bg-gray-100 hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`flex items-center justify-center rounded-md p-3 text-sm font-medium w-1/2
    ${
      receiptId && newData.length > 0
        ? "bg-blue-400 text-white hover:bg-blue-500"
        : "bg-gray-300 text-gray-500 cursor-not-allowed"
    }`}
                disabled={!receiptId || newData.length == 0}
              >
                Save Order
              </button>
            </div>
          </form>
        </div>
      </div>
    </Dialog>
  );
}
