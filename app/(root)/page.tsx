'use client';
import { useEffect, useState } from "react";
import { getContract } from "../../ethereum";
import Counter from "../../contracts/Voter.json";
import { type Contract } from "ethers";
import Link from 'next/link';

export default function Home() {
  const [count, setCount] = useState(0);
  const [against, setAgainst] = useState(0);
  const [contract, setContract] = useState<Contract>();

  useEffect(() => {
    async function initContract() {
      const contract = await getContract(
        "0xd9145CCE52D386f254917e481eB44e9943F39138",
        Counter.abi
      );
      setContract(contract);
      const initialCount = await contract.getFor();
      const initialAgainst = await contract.getAgainst();
      setCount(initialCount.toNumber());
      setAgainst(initialAgainst.toNumber());
    }
    initContract();
  }, []);

  async function voteFor() {
    if (!contract) return;
    const tx = await contract.voteFor();
    await tx.wait();
    const updatedCount = await contract.getFor();
    setCount(updatedCount.toNumber());
  }

  async function voteAgainst() {
    if (!contract) return;
    const tx = await contract.voteAgainst();
    await tx.wait();
    const updatedCount = await contract.getAgainst();
    setAgainst(updatedCount.toNumber());
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-sky-50 to-sky-200 py-6">
      <div className="w-full max-w-lg p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">Voting DApp</h1>
        <div className="text-center mb-4">
          <h2 className="text-2xl font-semibold mb-2 text-gray-700">Votes for: {count}</h2>
          <button 
            onClick={voteFor} 
            className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Vote for
          </button>
        </div>
        <div className="text-center mb-4">
          <h2 className="text-2xl font-semibold mb-2 text-gray-700">Votes Against: {against}</h2>
          <button 
            onClick={voteAgainst} 
            className="bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Vote Against
          </button>
        </div>
        <div className="text-center mt-6">
          <Link href="/connect">
            <div className="inline-block bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:scale-105">
              Connect
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}