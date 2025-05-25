"use client";
import { Dialog } from "@headlessui/react";
import {
  ExclamationTriangleIcon,
  PencilSquareIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/16/solid";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface Products {
  productName: string;
  price: number;
  quantity: number;
}

interface Receipt {
  id: string;
  products: Products[];
}

export default function ShowAllReceipt() {
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [id, setId] = useState("");

  useEffect(() => {
    const fetchReceipts = async () => {
      try {
        const response = await fetch("/api/getReceipts");
        if (!response.ok) {
          throw new Error("Failed to fetch receipts");
        }
        const data = await response.json();
        setReceipts(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReceipts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/deleteReceipt/${id}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const result = await response.json();
      console.log(result.message);
  
      setReceipts((prevReceipts) => prevReceipts.filter((receipt) => receipt.id !== id));
  
      setOpenModal(false);
    } catch (error) {
      console.error("Failed to delete receipt:", error);
    }
  };
  
  const calculateTotalProductPrice = (product: Products[]): number => {
    return product.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };
  return (
    <main className="flex min-h-screen w-full flex-col bg-gray-200 px-6 py-16 ">
      <h1 className="text-2xl font-bold mb-4 col-span-2">Receipts</h1>
      <div className="bg-white p-6 rounded-xl">
        {receipts.length === 0 ? (
          <h2 className="text-xl font-bold mb-4 col-span-2">
            No receipt found
          </h2>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-4 col-span-2">All Receipts</h2>
            <div className="m-6 grid  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {receipts.map((receipt) => (
                <div
                  key={receipt.id}
                  className="shadow-lg ring-1 ring-gray-900/5 rounded-2xl p-6 flex flex-col items-center bg-blue-300"
                >
                  <div className="w-full bg-white rounded-2xl py-8 px-4">
                    <div>Order Name: {receipt.id}</div>
                    <h2 className="text-xl font-bold">
                      {calculateTotalProductPrice(receipt.products)}{" "}
                      <span className="text-blue-400">Baht</span>
                    </h2>
                  </div>

                  <div className="flex space-x-2 mt-12 w-full">
                    <button
                      className="flex-1 bg-white text-red-600 rounded-xl px-3 py-1 text-sm font-medium border border-transparent hover:bg-gray-100 flex items-center justify-center"
                      onClick={() => {
                        setOpenModal(true), setId(receipt.id);
                      }}
                    >
                      <TrashIcon className="w-4 mr-2" />
                      Delete
                    </button>
                    <Link
                      className="flex-1 bg-white rounded-xl px-3 py-1 text-sm font-medium border border-transparent hover:bg-gray-100 flex items-center justify-center"
                      href={`/updateReceipt/${receipt.id}`}
                    >
                      <PencilSquareIcon className="w-4 mr-2" />
                      Edit
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <Dialog open={openModal} onClose={() => {}} className="relative z-10">
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
                  onClick={() => setOpenModal(false)}
                />
              </div>

              <div className="flex flex-col items-center justify-center mb-4">
                <ExclamationTriangleIcon className="w-20 h-20 text-red-500 mb-2 bg-red-100 p-2 rounded-full" />
                <div className="text-lg font-semibold">Delete Receipt</div>
              </div>

              <div className="flex justify-between space-x-2 mt-4 w-full">
                <button
                  onClick={() => setOpenModal(false)}
                  className="flex items-center justify-center rounded-md p-3 text-sm font-medium w-1/2 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(id)}
                  className="bg-red-500 text-white flex items-center justify-center rounded-md p-3 text-sm font-medium w-1/2 hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </main>
  );
}
