import { Product } from '../types';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div>
      <h2>{product.name}</h2>
      <p>₹{product.price}</p>
      <p>{product.description}</p>
    </div>
  );
}
