import { ethers } from "ethers";

const localProvider = new ethers.providers.Web3Provider(window.ethereum);

export const getProvider = () => {
  return localProvider;
};

export const getSigner = (index = 0) => {
  const provider = getProvider();
  const signer = provider.getSigner();
  return signer;
};

export const getContract = (address, abi) => {
  const signer = getSigner();
  const contract = new ethers.Contract(address, abi, signer);
  return contract;
};