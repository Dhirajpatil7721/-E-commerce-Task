'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Headers from '@/app/components/Header';
import { useRouter } from 'next/navigation';

interface Customer {
    id: number;
    name: string;
    email: string;
    mobile: string;
}

export default function CustomerList() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [error, setError] = useState('');

    const router = useRouter();

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const res = await axios.get('http://localhost:3002/customer');
                setCustomers(res.data);
            } catch (err) {
                setError('❌ Failed to fetch customers');
            }
        };

        fetchCustomers();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <Headers />
            <button
                onClick={() => router.push('/customer')}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Add Customer
            </button>
            <div className="max-w-5xl mx-auto mt-6 bg-white p-4 rounded shadow">
                <h1 className="text-2xl font-bold mb-4 text-center">📋 Customer List</h1>

                {error ? (
                    <p className="text-red-600 text-center">{error}</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full table-auto border border-gray-300">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="border px-4 py-2">ID</th>
                                    <th className="border px-4 py-2">Name</th>
                                    <th className="border px-4 py-2">Email</th>
                                    <th className="border px-4 py-2">Mobile</th>
                                </tr>
                            </thead>
                            <tbody>
                                {customers.map((customer) => (
                                    <tr key={customer.id} className="text-center hover:bg-gray-100">
                                        <td className="border px-4 py-2">{customer.id}</td>
                                        <td className="border px-4 py-2">{customer.name}</td>
                                        <td className="border px-4 py-2">{customer.email}</td>
                                        <td className="border px-4 py-2">{customer.mobile}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {customers.length === 0 && (
                            <p className="text-center mt-4 text-gray-600">No customers found.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
