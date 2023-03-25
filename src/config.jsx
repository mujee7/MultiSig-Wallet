import Web3 from "web3";

export const ContractAddress = "0xA5f18Fb04D4CD7F1dd75e680bC4a26418903FCD2";
//old address 0xC26eDeab298725FD6295e92624435cf3886Ba966
//polygon mumbai chainID
const chainId = 80001;
export const web3 = new Web3(
  "https://solemn-icy-sunset.bsc-testnet.discover.quiknode.pro/146f42549cf179d7117ec11c84476907a4fa7edd/"
);

export const ethereum = window.ethereum;
// check if metamask extension is installed on the browser
export const isMetaMaskInstalled = () => {
  if (ethereum) {
    return true;
  }
  return false;
};

// connect to metakmask wallet
export const connectWallet = async () => {
  const accounts = await ethereum.request({ method: "eth_requestAccounts" });

  const chainID =await changeChainID()
    return [accounts,chainID];
  
};

// connect to metakmask wallet
export const connectAccount = async () => {
  const accounts = await ethereum.request({ method: "eth_accounts" });
  const chainID =await changeChainID()
  return [accounts,chainID];
  
};

// disconnect metamask wallet
export const disconnectWallet = () => {
  localStorage.removeItem("isWalletConnected");
  isWalletConnected();
};

// check metamask on disconnect
export const onMetamaskDisconnect = () => {
  ethereum.on("disconnect", () => {
    console.log("Disconnected");
  });
};

// check metamask on connected
export const onMetamaskconnect = async () => {
  const chainId = await getChainId();
  ethereum.on("connect", () => {
    console.log(chainId);
  });
};

// on chain change
export const onChainChange = () => {
  ethereum.on("chainChanged", (_chainId) => {
    return parseInt(_chainId);
  });
};

export const getChainId = async () => {
  const chainId = await ethereum.request({ method: "eth_chainId" });

  return parseInt(chainId);
};

export const isWalletConnected = () => {
  if (localStorage.getItem("isWalletConnected") === "true") {
    return true;
  }

  return false;
};

export const connectWalletLocaly = () => {
  localStorage.setItem("isWalletConnected", true);
};

const changeChainID = async () => {
  let web3;
  web3 = new Web3(ethereum);
  const currentChainId = await web3.eth.getChainId();
  return currentChainId;
  
   
};

