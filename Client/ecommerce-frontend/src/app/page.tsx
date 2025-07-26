'use client';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-8">Welcome to E-Commerce Dashboard</h1>

      <div className="grid grid-cols-2 gap-6">
        <Link href="/product">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded shadow">
            Products
          </button>
        </Link>

        <Link href="/cart">
          <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded shadow">
            Carts
          </button>
        </Link>

        <Link href="/customer">
          <button className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded shadow">
            Customers
          </button>
        </Link>

        <Link href="/orders">
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded shadow">
            Orders
          </button>
        </Link>
      </div>
    </main>
  );
}
