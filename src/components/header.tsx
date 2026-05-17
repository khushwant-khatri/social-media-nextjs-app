import Link from "next/link";

import HeaderClient from "@/components/headerClient";

export default function Header() {
  return (
    <header className="w-full h-20 border-b shadow-sm px-6 bg-white">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between gap-6">
        <Link href="/" className="text-3xl font-bold">
          Discuss
        </Link>

        <HeaderClient />
      </div>
    </header>
  );
}
