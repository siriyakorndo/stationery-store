import { Dialog } from "@headlessui/react";
import { ExclamationTriangleIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface DeleteModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose} className="relative z-10">
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

            <div className="flex flex-col items-center justify-center mb-4">
              <ExclamationTriangleIcon className="w-20 h-20 text-red-500 mb-2 bg-red-100 p-2 rounded-full" />
              <div className="text-lg font-semibold">Delete Receipt</div>
            </div>

            <div className="flex justify-between space-x-2 mt-4 w-full">
              <button
                onClick={onClose}
                className="flex items-center justify-center rounded-md p-3 text-sm font-medium w-1/2 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="bg-red-500 text-white flex items-center justify-center rounded-md p-3 text-sm font-medium w-1/2 hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default DeleteModal;
