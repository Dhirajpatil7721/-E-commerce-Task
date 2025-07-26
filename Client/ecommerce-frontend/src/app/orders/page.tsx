// 'use client';

// import { useEffect, useState } from 'react';
// import { product_api } from '@/app/api';
// import { Order } from '@/app/types';
// import Headers from '@/app/components/Header';

// export default function OrdersPage() {
//     const [orders, setOrders] = useState<Order[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         product_api
//             .get('/order')
//             .then(res => {
//                 setOrders(res.data);
//                 setLoading(false);
//             })
//             .catch(err => {
//                 console.error(err);
//                 setError('Failed to load orders.');
//                 setLoading(false);
//             });
//     }, []);

//     if (loading) return <p>Loading orders...</p>;
//     if (error) return <p>{error}</p>;

//     return (
//         <div className="p-6">
//             <Headers/>
//             <h1 className="text-2xl font-bold mb-4">Order History</h1>
//             {orders.length === 0 ? (
//                 <p>No orders found.</p>
//             ) : (
//                 orders.map(order => (
//                     <div key={order.id} className="mb-4 p-4 border rounded shadow">
//                         <h3 className="font-semibold text-lg">Order #{order.id}</h3>
//                         <div className="pl-4 mt-2">
//                             {order.items?.map((item, idx) => (
//                                 <p key={idx} className="text-gray-700">• {item.name}</p>
//                             ))}
//                         </div>
//                     </div>
//                 ))
//             )}
//         </div>
//     );
// }

// 'use client';

// import { useEffect, useState } from 'react';
// import { product_api, customer_api } from '@/app/api';
// import Headers from '@/app/components/Header';

// // Interfaces
// interface Order {
//   id: number;
//   productId: number;
//   customerId: number;
//   quantity: number;
// }

// interface Customer {
//   id: number;
//   name: string;
// }

// interface EnrichedOrder extends Order {
//   name: string;
// }

// export default function OrdersPage() {
//   const [orders, setOrders] = useState<EnrichedOrder[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // Fetch orders and customer names
//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const orderRes = await product_api.get<Order[]>('/order');

//         const enrichedOrders: EnrichedOrder[] = await Promise.all(
//           orderRes.data.map(async (order) => {
//             try {
//               const customerRes = await customer_api.get<Customer>(
//                 `/customer/${order.customerId}`
//               );
//               return { ...order, name: customerRes.data.name };
//             } catch (err) {
//               console.error('Customer fetch failed:', err);
//               return { ...order, name: 'Unknown' };
//             }
//           })
//         );

//         setOrders(enrichedOrders);
//         setLoading(false);
//       } catch (err) {
//         console.error('Order fetch failed:', err);
//         setError('Failed to load orders.');
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   // Loading or error states
//   if (loading) return <p className="p-6">Loading orders...</p>;
//   if (error) return <p className="p-6 text-red-500">{error}</p>;

//   // Render orders
//   return (
//     <div className="p-6">
//       <Headers />
//       <h1 className="text-2xl font-bold mb-4">Order History</h1>

//       {orders.length === 0 ? (
//         <p>No orders found.</p>
//       ) : (
//         orders.map((order) => (
//           <div key={order.id} className="mb-4 p-4 border rounded shadow bg-white">
//             <h3 className="font-semibold text-lg mb-1">Order #{order.id}</h3>
//             <p className="text-gray-700">👤 Customer: {order.name}</p>
//             <p className="text-gray-700">📦 Product ID: {order.productId}</p>
//             <p className="text-gray-700">🔢 Quantity: {order.quantity}</p>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

'use client';

import { useEffect, useState } from 'react';
import { product_api, customer_api } from '@/app/api';
import Headers from '@/app/components/Header';

interface Order {
  id: number;
  productId: number;
  quantity: number;
  customerId: number;
  name: string;
  productName: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orderRes = await product_api.get('/order');
        const ordersData = orderRes.data;

        const enrichedOrders = await Promise.all(
          ordersData.map(async (order: any) => {
            let name = 'Unknown';
            let productName = 'Unknown';

            try {
              const customerRes = await customer_api.get(`/customer/${order.customerId}`);
              console.log("customerRes :",customerRes)
              name = customerRes.data?.name ?? 'Unknown';
            } catch (err) {
              console.error('Customer fetch failed', err);
            }

            try {
              const productRes = await product_api.get(`/product/${order.productId}`);
              productName = productRes.data?.name ?? 'Unknown';
            } catch (err) {
              console.error('Product fetch failed', err);
            }

            return {
              id: order.id,
              productId: order.productId,
              quantity: order.quantity,
              customerId: order.customerId,
              name,
              productName,
            };
          })
        );

        setOrders(enrichedOrders);
      } catch (err) {
        setError('Failed to load orders');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p className="p-6">Loading orders...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Headers />
      <h1 className="text-3xl font-bold mb-6">📦 Order History</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="grid gap-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow p-4">
              <h3 className="text-xl font-semibold mb-2">Order #{order.id}</h3>
              <p>👤 Customer: <span className="font-medium">{order.name}</span></p>
              <p>📦 Product: <span className="font-medium">{order.productName}</span></p>
              <p>🔢 Quantity: {order.quantity}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
