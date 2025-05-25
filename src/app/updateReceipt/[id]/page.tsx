"use client";
import ReceiptProductItem from "@/components/ReceiptProductItem";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface Selected {
  productName: string;
  price: number;
  quantity: number;
}
interface Product {
  id: string;
  productName: string;
  category: string;
  image: string;
  prices: number;
}
interface Receipt {
  id: number;
  products: Selected[];
}

export default function EditReceipt() {
  const pathname = usePathname();
  const id = pathname?.split("/").pop();
  const [receipt, setReceipt] = useState<Receipt>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [productData, setProductData] = useState<Product[]>([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchReceipt = async () => {
      if (!id) return;
      try {
        const response = await fetch(`/api/getReceipts?id=${id}`);
        if (!response.ok) throw new Error("Failed to fetch receipt");
        const data = await response.json();
        setReceipt(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchProduct = async () => {
      try {
        const response = await fetch("/api/listProduct");
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setProductData(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
    fetchReceipt();
  }, [id]);

  const updateReceipt = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!receipt) return;

    setSubmitting(true);
    try {
      const response = await fetch(`/api/updateReceipt/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(receipt),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error: ${errorData.error || "Unknown error"}`);
      }
    } catch (err: any) {
      console.error("Update failed:", err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteProduct = async (index: number) => {
    if (!receipt) return;
    const updatedProducts = receipt.products.filter((_, i) => i !== index);
    const updatedReceipt = { ...receipt, products: updatedProducts };
    setReceipt(updatedReceipt);
  };

  const getProductImage = (productName: string) => {
    const product = productData.find(
      (item) => item.productName === productName
    );
    return product ? product.image : "/images/default.png";
  };

  const calculateTotalPrices = (products: Selected[]): number => {
    return products.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };
  const handleQuantityChange = (index: number, newQty: number) => {
    if (!receipt) return;
    const updatedProducts = receipt.products.map((item, i) =>
      i === index ? { ...item, quantity: newQty } : item
    );
    setReceipt({ ...receipt, products: updatedProducts });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!receipt) return <p>No receipt found</p>;

  return (
    <main className="flex min-h-screen w-full flex-col bg-gray-200 px-6 py-16 ">
      <h1 className="text-2xl font-bold mb-4 col-span-2">Edit Receipt</h1>
      <form onSubmit={updateReceipt}>
        <div className="bg-white p-6 rounded-xl">
          {" "}
          <div className="mt-2 grid grid-cols-1 gap-4">
            <div className="grid grid-cols-5 font-bold text-gray-700 p-2 border-b mt-2">
              <div className="col-span-2">Item</div>
              <div className="text-center">Qty</div>
              <div className="text-right">Total</div>
              <div className="text-right pr-2">Delete</div>
            </div>

            {receipt.products.map((product, index) => (
              <ReceiptProductItem
                key={index}
                product={product}
                getProductImage={getProductImage}
                onDelete={() => handleDeleteProduct(index)}
                onQuantityChange={(newQty) =>
                  handleQuantityChange(index, newQty)
                }
              />
            ))}
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between py-4 text-md font-bold">
              <p>Total Price</p>
              <p>
                {calculateTotalPrices(receipt.products)}{" "}
                <span className="text-blue-500 ml-1">Baht</span>
              </p>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="bg-blue-400 text-white px-4 py-2 rounded w-full font-bold"
            >
              {submitting ? "Updating..." : "Update Receipt"}
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}
