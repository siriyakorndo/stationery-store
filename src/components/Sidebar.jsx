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
export default function Sidebar() {
  const pathname = usePathname();
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-col items-center flex-grow mt-6 space-y-4 ">
        <div className="text-lg font-bold">PAPER & PEN .</div>

        <div className="flex flex-col mt-6">
          <Link
            className={classNames(
              pathname === "/"
                ? "bg-blue-400 text-white"
                : "text-gray-500 hover:bg-blue-300 hover:text-gray-500",
              "flex items-center rounded-md px-3 py-2 text-sm font-medium w-full"
            )}
            href="/"
          >
            <BuildingStorefrontIcon
              className={classNames(
                "w-6 mr-2",
                pathname === "/" ? "text-white" : "text-gray-500"
              )}
            />
            Paper & Pen
          </Link>

          <Link
            className={classNames(
              pathname === "/receipt" || pathname.includes("updateReceipt")
                ? "bg-blue-400 text-white"
                : "text-gray-500 hover:bg-blue-300 hover:text-gray-500",
              "flex items-center rounded-md px-3 py-2 text-sm font-medium"
            )}
            href="/receipt"
          >
            <ClipboardDocumentCheckIcon
              className={classNames(
                "w-6 mr-2",
                pathname === "/receipt" || pathname.includes("updateReceipt")
                  ? "text-white"
                  : "text-gray-500"
              )}
            />
            Receipt
          </Link>
        </div>
      </div>
      <footer className="text-s text-gray-400">
        Images from{" "}
        <a
          href="https://www.pngtree.com"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-blue-500 font-bold"
        >
          Pngtree
        </a>{" "}
        and{" "}
        <a
          href="https://www.freepik.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-blue-500 font-bold"
        >
          freepik
        </a>{" "}
        and{" "}
        <a
          href="https://www.flaticon.com"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-blue-500 font-bold"
        >
          flaticon.com
        </a>{" "}
        under Free License.
      </footer>
    </div>
  );
}
