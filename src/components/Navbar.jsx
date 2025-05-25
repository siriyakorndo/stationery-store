"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  BuildingStorefrontIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/16/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function Navbar() {
  const pathname = usePathname();
  return (
    <div className="flex w-full">
      <div className="flex items-center justify-center flex-1 text-lg font-bold">
        PAPER & PEN .
      </div>

      <Link
        href="/"
        className={classNames(
          pathname === "/"
            ? "bg-blue-400 text-white"
            : "text-gray-500 hover:bg-blue-300 hover:text-gray-500",
          "flex items-center justify-center flex-1 px-3 py-4 text-sm font-medium"
        )}
      >
        <BuildingStorefrontIcon
          className={classNames(
            "w-5 h-5 mr-2",
            pathname === "/" ? "text-white" : "text-gray-500"
          )}
        />
        Paper & Pen
      </Link>

      <Link
        href="/receipt"
        className={classNames(
          pathname === "/receipt" || pathname.includes("updateReceipt")
            ? "bg-blue-400 text-white"
            : "text-gray-500 hover:bg-blue-300 hover:text-gray-500",
          "flex items-center justify-center flex-1 px-3 py-4 text-sm font-medium"
        )}
      >
        <ClipboardDocumentCheckIcon
          className={classNames(
            "w-5 h-5 mr-2",
            pathname === "/receipt" || pathname.includes("updateReceipt")
              ? "text-white"
              : "text-gray-500"
          )}
        />
        Receipt
      </Link>
    </div>
  );
}
