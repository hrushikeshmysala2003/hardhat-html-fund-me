import { ethers } from "./ethers-5.1.esm.min.js";
import { abi, contractAddress } from "./constants.js";
const connectButton = document.getElementById("connectButton");
const fundButton = document.getElementById("fund");
connectButton.onclick = connect;
fundButton.onclick = fund;

async function connect() {
  if (typeof window.ethereum !== undefined) {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    document.getElementById("connectButton").innerHTML = "Connected";
    console.log(ethers);
  } else {
    document.getElementById("connectButton").innerHTML =
      "Please install metamask";
  }
}

async function fund() {
  const ethAmount = "0.5";
  console.log(`Funding with ${ethAmount}`);
  if (typeof window.ethereum !== "undefined") {
    // provide / connection to the blockchain
    // signer / wallet / someone with some gas
    // contract that we are interacting with ABI and address
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    try {
      const transactionResponse = await contract.fund({
        value: ethers.utils.parseEther(ethAmount),
      });
      await listenForTransactionMine(transactionResponse, provider);
      console.log("Done!");
      //   listen for the tx to be mined
      // listen for an event - we havent learned about yet
    } catch (error) {
      console.log(error);
    }
  }
}

function listenForTransactionMine(transactionResponse, provider) {
  console.log(`Mining ${transactionResponse.hash}...`);
  // return new Promise()
  // listen for this transaction to finish
  return new Promise((resolve, reject) => {
    provider.once(transactionResponse.hash, (TransactionReceipt) => {
      console.log(
        `Completed with ${TransactionReceipt.confirmations} confirmations`
      );
      resolve();
    });
  });
}
