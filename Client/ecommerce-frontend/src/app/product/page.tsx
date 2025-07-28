    'use client'
    import { useEffect, useState } from 'react';
    import { product_api, customer_api } from '@/app/api';
    import { Product } from '@/app/types';
    import ProductCard from '@/app/components/ProductCard';
    import Headers from '@/app/components/Header';

    export default function ProductPage() {
        const [products, setProducts] = useState<Product[]>([]);
        const [isLoading, setIsLoading] = useState(true);
        const [error, setError] = useState<string | null>(null);

        useEffect(() => {
            product_api.get('/product')
                .then(res => {
                    setProducts(res.data);
                    setIsLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setError('Failed to load products. Please try again later.');
                    setIsLoading(false);
                });
        }, []);

        if (isLoading) {
            return (
                <div className="flex justify-center items-center min-h-screen bg-gray-50">
                    <div className="flex flex-col items-center gap-4">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
                        <p className="text-gray-600 font-medium">Loading products...</p>
                    </div>
                </div>
            );
        }

        if (error) {
            return (
                <div className="flex justify-center items-center min-h-screen bg-gray-50">
                    <div className="max-w-md w-full bg-white p-6 rounded-xl shadow-md">
                        <div className="bg-red-50 border-l-4 border-red-500 p-4">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-red-800">Error loading products</h3>
                                    <div className="mt-2 text-sm text-red-700">
                                        <p>{error}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-4 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            );
        }

        return (
            <div className="min-h-screen bg-gray-50">
                <Headers />

                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                            Our Products
                        </h1>
                        <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
                            Discover our amazing collection
                        </p>
                    </div>

                    {products.length > 0 ? (
                        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                            {products.map(p => (
                                <ProductCard key={p.id} product={p} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-lg shadow-sm">
                            <svg
                                className="mx-auto h-12 w-12 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <h3 className="mt-4 text-lg font-medium text-gray-900">No products found</h3>
                            <p className="mt-2 text-sm text-gray-500">
                                We couldn't find any products available at the moment.
                            </p>
                        </div>
                    )}
                </main>
            </div>
        );
    }