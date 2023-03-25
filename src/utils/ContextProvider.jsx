import { useState } from "react";
import { ModalContext } from "./ModalContext";
import { toast } from "react-toastify";

import {
  connectWallet,
  connectWalletLocaly,
  isWalletConnected,
  disconnectWallet,
  ContractAddress,
  connectAccount,
  web3,
} from "../config";
import ABIII from "../utils/MultiAbi.json"
import Account from "../components/section/collection/Account";
const ContextProvider = ({ children }) => {
  
  const AddressMultiSig="0xa1adFf9416B23fca5f1EE9F51769DDC5BFbFcBA2"
  const [chainName,setChainName]=useState()
  const [CHAINID,setCHAINID]=useState();
  const [visibility, setVisibility] = useState(false);
  const [walletModalvisibility, setModalvisibility] = useState(false);
  const [NextMint, setNextMint] = useState();
  const [shareModalVisibility, setShareModalvisibility] = useState(false);
  const [metamaskModalVisibility, setMetamaskModalVisibility] = useState(false);
  const [connectWalletModal, setConnectWalletModal] = useState(false);
  const [account, setAccount] = useState("");
  const [NFT, setNFT] = useState();
  const [NFTID, setNFTID] = useState();
  const [contractAddress, setContractAddress] = useState();
  const [WEB3, setWEB3] = useState();
  const [Contract, setContract] = useState();
  const [Basic, setBasic] = useState();
  const [Count, setCount] = useState();
  const [reload, setReload] = useState();

async  function createContract(){
  const contract= new web3.eth.Contract(ABIII,AddressMultiSig);
  return contract;
}
async  function transaction(to,value,data){
  console.log(to)
  console.log(account[0])
  console.log(data)
  const contract= createContract()
  try{
    // const transact=await (await contract).methods.getTransactionCount().call()

    // const transact=await (await contract).methods.submitTransaction(to.toLowerCase(),value,data).send({from:account[0]})
  //  console.log(transact)
   var tx={
    from:account[0],
    to:to,
    data:await (await contract).methods.submitTransaction(to,value,data).encodeABI()
   }
   const txHash = await window.ethereum.request({
    method: 'eth_sendTransaction',
    params: [tx],
  });

  }
  catch(err){
    console.log(err)
  }
  
}
async function getCount(){
  const contract= createContract()
  try{
     const transact=await (await contract).methods.getTransactionCount().call()
     return transact
  }catch(err){
    console.log(err)
  }

}
async function getCountEachTransact(val){
  const contract= createContract()
  try{
     const transact=await (await contract).methods.getTransaction(val).call()
     return transact
  }catch(err){
    console.log(err)
  }

}
async function ConfirmTransaction(val){
  const contract= createContract()
  try{
     
     var tx={
      from:account[0],
      to:AddressMultiSig,
      data:await (await contract).methods.confirmTransaction(val).encodeABI()
     }
     const txHash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [tx],
    });
  }catch(err){
    console.log(err)
  }

}
async function ExecuteTransaction(val){
  const contract= createContract()
  try{
     
     var tx={
      from:account[0],
      to:AddressMultiSig,
      data:await (await contract).methods.executeTransaction(val).encodeABI()
     }
     const txHash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [tx],
    });
  }catch(err){
    console.log(err)
  }

}
async function RevokeTransaction(val){
  const contract= createContract()
  try{
     
     var tx={
      from:account[0],
      to:AddressMultiSig,
      data:await (await contract).methods.revokeConfirmation(val).encodeABI()
     }
     const txHash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [tx],
    });
  }catch(err){
    console.log(err)
  }

}


  const mintModalHandle = () => {
    setVisibility(!visibility);
  };
  const walletModalHandle = () => {
    setModalvisibility(!walletModalvisibility);
  };

  const shareModalHandle = (e) => {
    e.preventDefault();
    setShareModalvisibility(!shareModalVisibility);
  };

  const metamaskModalHandle = () => {
    setMetamaskModalVisibility(!metamaskModalVisibility);
  };

  const connectWalletModalHanlde = () => {
    if (!isWalletConnected()) {
      setConnectWalletModal(!connectWalletModal);
    }
  };

  const connectWalletHandle = async () => {
    const [accounts,chainID ]= await connectAccount();
    setAccount(accounts);
    setCHAINID(chainID)
    console.log(chainID)
    setName(chainID)
    if (!isWalletConnected()) {
      connectWalletLocaly();
    }
    setModalvisibility(!walletModalvisibility);
    toast.success("Successfully connected");
  };

  const isWalletAlreadyConnected = async () => {
    if (isWalletConnected()) {
      const [accounts,chainID ]= await connectAccount();
      setAccount(accounts);
      setCHAINID(chainID)
      console.log(chainID)
      setName(chainID)
    } else {
      const [accounts,chainID ] = await connectWallet();
      setCHAINID(chainID)
      setAccount(accounts);
      console.log(chainID)
      setName(chainID)
    }
  };

  const disconnectWalletFromApp = () => {
    disconnectWallet();
    setAccount("");
  };
  
   const setName=async(chainid)=>{
    console.log("setName",chainid)
    if(chainid==1)
    {
      setChainName("ethereum")
    }else if(chainid==137){
      setChainName("polygon")


    }
    else if(chainid==80001){
      setChainName("mumbai")


    }
    else if(chainid==5){
      setChainName("goerli")


    }

   }

  return (
    <ModalContext.Provider
      value={{
        visibility,
        mintModalHandle,
        walletModalHandle,
        walletModalvisibility,
        shareModalVisibility,
        shareModalHandle,
        metamaskModalVisibility,
        metamaskModalHandle,
        account,
        connectWalletHandle,
        isWalletAlreadyConnected,
        disconnectWalletFromApp,
        connectWalletModalHanlde,
        connectWalletModal,
        setNFT,
        setNFTID,
        NFT,
        NFTID,
        contractAddress,
        setContractAddress,
        WEB3,
        setWEB3,
        Contract,
        setContract,
        Basic,
        setBasic,
        Count,
        setCount,
        NextMint,
        setNextMint,
        reload,
        setReload,
        CHAINID,
        setCHAINID,
        chainName,
        transaction,
        getCount,
        getCountEachTransact,
        ConfirmTransaction,
        ExecuteTransaction,
        RevokeTransaction,
        
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ContextProvider;
