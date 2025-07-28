// // import { Product } from '../types';

// // export default function ProductCard({ product }: { product: Product }) {
// //   return (
// //     <div>
// //       <h2>{product.name}</h2>
// //       <p>₹{product.price}</p>
// //       <p>{product.description}</p>
// //     </div>
// //   );
// // }


// 'use client';

// import { Product } from '@/app/types';

// interface Props {
//   product: Product;
// }

// export default function ProductCard({ product }: Props) {
//   const handleAddToCart = () => {
//     const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
//     const updatedCart = [...existingCart, product];
//     localStorage.setItem('cart', JSON.stringify(updatedCart));
//     alert(`${product.name} added to cart!`);
//   };

//   return (
//     <div className="bg-white shadow rounded-lg p-6 flex flex-col justify-between">
//       <div>
//         <h2 className="text-lg font-bold mb-2">{product.name}</h2>
//         <p className="text-gray-600 mb-4">{product.description}</p>
//         <p className="text-indigo-600 font-semibold text-lg">₹{product.price}</p>
//       </div>

//       <button
//         onClick={handleAddToCart}
//         className="mt-4 w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded hover:bg-indigo-700 transition"
//       >
//         Add to Cart
//       </button>
//     </div>
//   );
// }

'use client';

import { Product } from '@/app/types';
import axios from 'axios';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const handleAddToCart = async () => {
    const customerIdInput = prompt('Enter your Customer ID:');
    const quantityInput = prompt('Enter quantity:', '1');

    const customerId = parseInt(customerIdInput || '');
    const quantity = parseInt(quantityInput || '1');

    if (!customerId || !quantity || quantity <= 0) {
      alert('❌ Invalid input. Please enter valid values.');
      return;
    }

    try {
      await axios.post('http://localhost:3001/cart', {
        customerId,
        productId: product.id,
        quantity,
      });

      alert(`✅ ${product.name} (x${quantity}) added to cart!`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('❌ Failed to add to cart. Please try again.');
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 flex flex-col justify-between">
      <div>
        <h2 className="text-lg font-bold mb-2">{product.name}</h2>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <p className="text-indigo-600 font-semibold text-lg">₹{product.price}</p>
      </div>

      <button
        onClick={handleAddToCart}
        className="mt-4 w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded hover:bg-indigo-700 transition"
      >
        Add to Cart
      </button>
    </div>
  );
}
