"use client";
import CartSummaryBar from "@/components/CartSummaryBar";
import CategoryCard from "@/components/CategoryCard";
import OrderModal from "@/components/OrderModal";
import ProductCard from "@/components/ProductCard";

import { useEffect, useState } from "react";

interface Product {
  id: string;
  productName: string;
  category: string;
  image: string;
  price: number;
}

export default function HomePage() {
  const [data, setData] = useState<Product[]>([]);
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>(
    {}
  );
  const [counts, setCounts] = useState<Record<string, number>>(
    data.reduce((acc, item) => {
      acc[item.id] = 0;
      return acc;
    }, {} as Record<string, number>)
  );

  const [searchProductsByName, setSearchProductsByName] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [receiptId, setReceiptId] = useState("");
  const [showData, setShowData] = useState<Product[]>(data);
  const [errorMessage, setErrorMessage] = useState("");
  const [newData, setNewData] = useState<
  { productName: string; price: number; quantity: number }[]
>([]);
  const categoryItems = [
    { key: "book", category: "Books", image: "/images/books.png" },
    {
      key: "stationery",
      category: "Stationery",
      image: "/images/stationery.png",
    },
    {
      key: "accessory",
      category: "Accessories",
      image: "/images/accessories.png",
    },
  ];

  const filteredData = data
    ? data.filter((item) => selectedItems[item.category])
    : [];

  const searchData =
    filteredData.length > 0
      ? filteredData.filter((item) =>
          item.productName
            ?.toLowerCase()
            .includes(searchProductsByName.toLowerCase())
        )
      : data.filter((item) =>
          item.productName
            ?.toLowerCase()
            .includes(searchProductsByName.toLowerCase())
        );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/listProduct");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (searchProductsByName.length > 0) {
      setShowData(searchData);
    } else if (filteredData.length > 0) {
      setShowData(filteredData);
    } else {
      setShowData(data);
    }
  }, [data, filteredData.length, searchProductsByName]);
  useEffect(() => {
  const updatedNewData = data.reduce(
    (acc, item) => {
      const quantity = counts[item.id] || 0;
      if (quantity > 0) {
        acc.push({
          productName: item.productName,
          price: item.price,
          quantity,
        });
      }
      return acc;
    },
    [] as { productName: string; price: number; quantity: number }[]
  );
  setNewData(updatedNewData);

}, [counts, data]);

useEffect(() => {
  setCounts(prevCounts => {
    const newCounts: Record<string, number> = {};
    data.forEach(item => {
      newCounts[item.id] = prevCounts[item.id] || 0;
    });
    return newCounts;
  });
}, [data]);

  const handleDecrement = (id: string) => {
    setCounts((prevCounts) => {
      const newCounts = { ...prevCounts };
      if (newCounts[id] > 0) {
        newCounts[id] = Math.max(newCounts[id] - 1, 0);
        if (newCounts[id] === 0) {
          delete newCounts[id];
        }
      }
      return newCounts;
    });
  };

  const handleIncrement = (id: string) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [id]: (prevCounts[id] || 0) + 1,
    }));
  };

  const onChangeManual = (id: string, newValue: number) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [id]: newValue,
    }));
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  const handleCheckboxChange = (item: string) => {
    setSelectedItems((prevState) => ({
      ...prevState,
      [item]: !prevState[item],
    }));
  };

  const calculateTotalPrices = () => {
    return data.reduce((total, item) => {
      return total + (counts[item.id] || 0) * item.price;
    }, 0);
  };

  const handleAddProduct = async () => {
    try {
      const response = await fetch("/api/addReceipt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: receiptId,
          products: newData,
        }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        const errorMessage = errorResponse.message || "Failed to add product";
        throw new Error(errorMessage);
      }
      console.log("Product added successfully");
      setOpenModal(false);
      setReceiptId("");
      setErrorMessage("");
      setCounts(() =>
        data.reduce((acc, item) => {
          acc[item.id] = 0;
          return acc;
        }, {} as Record<string, number>)
      );
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error adding product:", error.message);
        setErrorMessage(error.message);
      } else {
        console.error("Unexpected error:", error);
        setErrorMessage("An unexpected error occurred.");
      }
    }
  };
  // const totalQuantity = newData.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <main className="flex min-h-screen w-full flex-col">
      <div className="px-6 py-16 ">
        <div className="flex items-center justify-between grid grid-cols-3 gap-4">
          <img
            alt="banner"
            src="/images/banner.jpg"
            className="w-full h-40 object-cover rounded-2xl col-span-3"
          />{" "}
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 mt-4 col-span-2">
            Select Category
          </h2>
          <div className="col-span-3 md:col-span-1 relative flex-auto max-w-md">
            <input
              id="search"
              name="search"
              type="text"
              placeholder="Search products"
              onChange={(e) => setSearchProductsByName(e.target.value)}
              className="block w-full max-w-md rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 30 30"
            >
              <path
                fill="#f9b4b9"
                d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"
              ></path>
            </svg>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-4 gap-x-2 lg:grid-cols-8 xl:gap-x-8">
          {categoryItems.map(({ key, category, image }) => (
            <CategoryCard
              key={key}
              category={category}
              image={image}
              isSelected={selectedItems[key]}
              onToggle={() => handleCheckboxChange(key)}
            />
          ))}
        </div>

        <h2 className="text-2xl font-bold tracking-tight text-gray-900 mt-4 mb-4">
          What would you like to get today?
        </h2>
        <div className="mt-6 grid gap-x-6 gap-y-10 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:gap-x-4">
          {showData.length > 0
            ? showData.map((item) => (
                <ProductCard
                  key={item.id}
                  item={item}
                  count={counts[item.id] || 0}
                  onIncrement={handleIncrement}
                  onDecrement={handleDecrement}
                  onChangeManual={onChangeManual}
                />
              ))
            : "Not Found"}
        </div>
        {Object.keys(counts).length > 0 && (
          <CartSummaryBar
            totalPrice={calculateTotalPrices()}
            onCreateOrder={() => setOpenModal(true)}
          />
        )}
        <OrderModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          receiptId={receiptId}
          setReceiptId={setReceiptId}
          errorMessage={errorMessage}
          newData={newData}
          handleAddProduct={handleAddProduct}
          totalPrice={calculateTotalPrices()}
          // setNewData={setNewData}
        />
      </div>
    </main>
  );
}
