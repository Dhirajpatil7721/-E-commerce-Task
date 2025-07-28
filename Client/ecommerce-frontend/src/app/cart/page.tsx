// // 'use client'
// // import { useState } from 'react';
// // import { Product } from '@/app/types';
// // import Headers from '@/app/components/Header';

// // export default function CartPage() {
// //   const [cart, setCart] = useState<Product[]>([]);

// //   return (
// //     <div>
// //       <Headers/>
// //       <h1>Your Cart</h1>
// //       {cart.map((p, index) => (
// //         <div key={index}>
// //           <h3>{p.name} - ₹{p.price}</h3>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // }


// 'use client';

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Headers from '@/app/components/Header';

// interface Product {
//   id: number;
//   name: string;
//   price: number;
//   description: string;
// }

// interface Customer {
//   id: number;
//   name: string;
//   email: string;
//   mobile: number;
// }

// interface CartItem {
//   id: number;
//   customerId: number;
//   productId: number;
//   quantity: number;
// }

// interface FullCartItem extends CartItem {
//   product: Product;
//   customer: Customer;
// }

// export default function CartPage() {
//   const [cart, setCart] = useState<FullCartItem[]>([]);

//   useEffect(() => {
//     const fetchCartData = async () => {
//       try {
//         const cartRes = await axios.get<CartItem[]>('http://localhost:3001/cart');

//         const fullCart = await Promise.all(
//           cartRes.data.map(async (item) => {
//             const [productRes, customerRes] = await Promise.all([
//               axios.get<Product>(`http://localhost:3001/product/${item.productId}`),
//               axios.get<Customer>(`http://localhost:3002/customer/${item.customerId}`),
//             ]);

//             return {
//               ...item,
//               product: productRes.data,
//               customer: customerRes.data,
//             };
//           })
//         );

//         setCart(fullCart);
//       } catch (err) {
//         console.error('Error fetching cart data:', err);
//       }
//     };

//     fetchCartData();
//   }, []);

//   return (
//     <div className="p-6">
//       <Headers />
//       <h1 className="text-2xl font-bold mb-4 mt-5">🛒 Cart</h1>
//       {cart.map((item) => (
//         <div key={item.id} className="border p-4 mb-4 rounded shadow">
//           <h2 className="text-xl font-semibold">{item.product.name}</h2>
//           <p>{item.product.description}</p>
//           <p className="text-gray-600">Quantity: {item.quantity}</p>
//           <p className="text-green-600">Price: ₹{item.product.price * item.quantity}</p>
//           <p className="text-sm text-gray-500">
//             Ordered by: {item.customer.name} ({item.customer.email})
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// }
'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Headers from '@/app/components/Header';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

interface Customer {
  id: number;
  name: string;
  email: string;
  mobile: number;
}

interface CartItem {
  id: number;
  customerId: number;
  productId: number;
  quantity: number;
}

interface FullCartItem extends CartItem {
  product: Product;
  customer: Customer;
}

export default function CartPage() {
  const [cart, setCart] = useState<FullCartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const cartRes = await axios.get<CartItem[]>('http://localhost:3001/cart');
        const fullCart = await Promise.all(
          cartRes.data.map(async (item) => {
            const [productRes, customerRes] = await Promise.all([
              axios.get<Product>(`http://localhost:3001/product/${item.productId}`),
              axios.get<Customer>(`http://localhost:3002/customer/${item.customerId}`),
            ]);

            return {
              ...item,
              product: productRes.data,
              customer: customerRes.data,
            };
          })
        );
        setCart(fullCart);
      } catch (err) {
        console.error('Error fetching cart data:', err);
      }
    };

    fetchCartData();
  }, []);

  const handleBuyNow = async (item: FullCartItem) => {
    setLoading(true);
    setMessage('');
    try {
      const orderData = {
        productId: item.productId,
        customerId: item.customerId,
        quantity: item.quantity,
      };

      const response = await axios.post('http://localhost:3001/order', orderData);
      setMessage('✅ Order placed successfully!');
      console.log('Order placed:', response.data);
    } catch (error) {
      console.error('Failed to place order:', error);
      setMessage('❌ Failed to place order. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <Headers />
      <h1 className="text-2xl font-bold mb-4 mt-5">🛒 Cart</h1>

      {message && (
        <div className={`mb-4 text-center ${message.includes('✅') ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </div>
      )}

      {cart.map((item) => (
        <div key={item.id} className="border p-4 mb-4 rounded shadow">
          <h2 className="text-xl font-semibold">{item.product.name}</h2>
          <p>{item.product.description}</p>
          <p className="text-gray-600">Quantity: {item.quantity}</p>
          <p className="text-green-600">Price: ₹{item.product.price * item.quantity}</p>
          <p className="text-sm text-gray-500">
            Ordered by: {item.customer.name} ({item.customer.email})
          </p>

          <button
            onClick={() => handleBuyNow(item)}
            disabled={loading}
            className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            {loading ? 'Placing...' : 'Buy Now'}
          </button>
        </div>
      ))}
    </div>
  );
}
