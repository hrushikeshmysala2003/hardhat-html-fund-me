import { ethers } from "./ethers-5.1.esm.min.js";

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

async function fund(ethAmount) {
  console.log(`Funding with ${ethAmount}`);
  if (typeof window.ethereum !== "undefined") {
    // provide / connection to the blockchain
    // signer / wallet / someone with some gas
    // contract that we are interacting with ABI and address
  }
}
