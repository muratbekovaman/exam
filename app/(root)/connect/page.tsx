'use client';
import Link from 'next/link';
import { useEffect, useState, useCallback } from "react";

declare global {
    interface Window {
        ethereum: any;
    }
}
export interface AccountType {
    address?: string;
}
export default function Home() {
    const [accountData, setAccountData] = useState<AccountType>({});

    const connectToMetaMask = useCallback(async () => {
        const ethereum = window.ethereum;
        if (typeof ethereum !== "undefined") {
            try {
                const accounts = await ethereum.request({
                    method: "eth_requestAccounts",
                });
                const address = accounts[0];
                setAccountData({ address: address });
                alert(`connected to MetaMask with address: ${address}`);
            } catch (error: Error | any) {
                alert(`Error connecting to MetaMask: ${error?.message ?? error}`);
            }
        } else {
            alert("MetaMask not installed");
        }
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-sky-50 to-sky-200 py-6">
            <div className="flex flex-1 flex-col justify-center items-center">
                <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
                    <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Welcome to MetaMask Connector</h1>
                    <div className="flex flex-col items-center">
                        <button
                            onClick={connectToMetaMask}
                            className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:scale-105"
                        >
                            Connect to MetaMask
                        </button>
                        {accountData.address && (
                            <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-inner text-gray-700">
                                Connected with address: {accountData.address}
                            </div>
                        )}
                        <Link href="/">
                            <div className="mt-6 inline-block bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:scale-105">
                                Go to Home Page
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}