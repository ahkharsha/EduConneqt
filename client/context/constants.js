import { ethers } from "ethers";
import Web3Modal from "web3modal";
import axios from "axios";

import socialMediaDapp from "./SocialMediaDapp.json";

export const CONTRACT_ABI = socialMediaDapp.abi;
export const CONTRACT_ADDRESS = "0xdBa12A418D48c8A8e7D0ee84CAFE74AE9f20e478";

export const PINATA_API_KEY = "6913532cb8a350b6dbb3";
export const PINATA_SECRECT_KEY = "0c93e6871fd49b760c5aa1461e5fb4c86e6bd3e6bdf61c3220efdc0aee4020b4";

// NETWORK
const networks = {
  open_campus_codex: {
    chainId: `0x${Number(656476).toString(16)}`,
    chainName: "Open Campus Codex",
    nativeCurrency: {
      name: "EDU",
      symbol: "EDU",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.open-campus-codex.gelato.digital"],
    blockExplorerUrls: ["https://opencampus-codex.blockscout.com"],
  },
  localhost: {
    chainId: `0x${Number(5003).toString(16)}`,
    chainName: "localhost",
    nativeCurrency: {
      name: "EDU",
      symbol: "EDU",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.open-campus-codex.gelato.digital"],
    blockExplorerUrls: ["https://opencampus-codex.blockscout.com"],
  },
};


const changeNetwork = async ({ networkName }) => {
  try {
    if (!window.ethereum) throw new Error("No crypto wallet found");
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          ...networks[networkName],
        },
      ],
    });
  } catch (err) {
    console.log(err.message);
  }
};

export const handleNetworkSwitch = async () => {
  const networkName = "open_campus_codex";
  await changeNetwork({ networkName });
};

export const checkIfWalletConnected = async () => {
  if (!window.ethereum) return console.log("Please Install MetaMask");
  const network = await handleNetworkSwitch();

  const account = await window.ethereum.request({ method: "eth_accounts" });

  if (account.length) {
    return account[0];
  } else {
    console.log("Please Install MetaMask & Connect, Reload");
  }
};

export const connectWallet = async () => {
  try {
    if (!window.ethereum) return alert("Please install MetaMask");
    const network = await handleNetworkSwitch();
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    return accounts[0];
  } catch (error) {
    console.log(error);
  }
};
