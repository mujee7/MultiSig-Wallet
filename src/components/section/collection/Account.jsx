import Product from "./product/Product";

import { useState, useEffect } from "react";
import CollectionStyleWrapper from "./Collection.style";
import { useNavigate } from "react-router-dom";

import { useModal } from "../../../utils/ModalContext";
import MintNowModal from "../../../common/modal/mintNowModal";
const Account = () => {
  const { transaction,setNFT, getCount,ConfirmTransaction,ExecuteTransaction,RevokeTransaction, getCountEachTransact,visibility,mintModalHandle, account, CHAINID,setCHAINID,isWalletAlreadyConnected } = useModal();
  const [products, setProducts] = useState([]);
  const [To, setTo] = useState([]);
  const [Approve, setApprove] = useState([]);
  const [Execute, setExecute] = useState([]);
  const [Revoke, setRevoke] = useState([]);
  const [Value, setValue] = useState([]);

  const [Data, setData] = useState([]);

  let nav = useNavigate();
  const getImage = async (value) => {
    try {
      let data = await fetch(
        `https://gateway.pinata.cloud/ipfs/QmewasZSkCSe7t66sCzAmGvpxoHp1UGDymrTmGVbELrz5G/${value}.json`
      );
      data = await data.json();
      console.log(data);

      // setProducts([...products],[ {...data,id:value}])
      setProducts((prevValue) => {
        return [...prevValue, { ...data, id: value }];
      });
    } catch (err) {
      console.log(err);
    }
    // console.log(data)
  };
  // const getNextMint = async () => {
  //   if (Contract) {
  //     try {
  //       const TotalTokens = await Contract.methods.balanceOf(account[0]).call();
  //       console.log(TotalTokens);
  //       for (var j = 0; j < TotalTokens; j++) {
  //         const Supply = await Contract.methods
  //           .tokenOfOwnerByIndex(account[0], j)
  //           .call();
  //         console.log("yeah its working here in getting NFT by index", Supply);
  //         getImage(Supply);
  //       }
  //     } catch (err) {
  //       console.log("error in getting NFTs of Owner ie (getNextMint)");
  //     }

  //     // setRemaining(TokenURI)
  //   }
  // };

  // const something = async () => {
  //   if (!Basic) await CreateContractInstance();
  //   console.log(Contract);
  // };

  const getNFTs=async()=>{
    try{
      const value= await getCount();
      for (var i=0;i<value;i++)
      {
       const something=await getCountEachTransact(i)
       console.log(something)
       setProducts((prevValue) => {
        return [...prevValue, something];
       });
      }
      
    }catch{
      
    }

  }

  useEffect(() => {
     getNFTs()
    
  }, [account,CHAINID]);
  useEffect(() => {
    window.ethereum.on('accountsChanged', function (accounts) {
      isWalletAlreadyConnected()
      
    })
    
  }, []);
  useEffect(() => {
    window.ethereum.on('chainChanged', function (accounts) {
      isWalletAlreadyConnected()
      
    })
    
  }, []);
  const callit=async (product)=>{
    setNFT(product)
    mintModalHandle()
    

  }

  console.log("checking the data of products", products);
  return (
    <CollectionStyleWrapper>
    {visibility && <MintNowModal />}
      <div className="container">
        <div className="row filters_row">
          <div className="col-lg-12 col-md-8">
            <div className="collection_items">
              <div className="row products_row">
                {/* {console.log(products)} */}
                To
                <input onChange={(e)=>{setTo(e.target.value)}}></input>
                Value
                <input onChange={(e)=>{setValue(e.target.value)}}></input>
                Data
                <input onChange={(e)=>{setData(e.target.value)}}></input>

                <button onClick={()=>{transaction(To,Value,Data)}} style={{color:"black"}}>Create transaction</button>
<h1 style={{color:"white"}}>Confirm transaction</h1>
<input onChange={(e)=>{setApprove(e.target.value)}}></input>
<button onClick={()=>{ConfirmTransaction(Approve)}} style={{color:"black"}}>Confirm</button>
<h1>Execute transaction</h1>
<input onChange={(e)=>{setExecute(e.target.value)}}></input>
<button onClick={()=>{ExecuteTransaction(Execute)}} style={{color:"black"}}>Execute</button>
<h1>Revoke transaction</h1>
<input onChange={(e)=>{setRevoke(e.target.value)}}></input>
<button onClick={()=>{RevokeTransaction(Revoke)}} style={{color:"black"}}>Revoke</button>
{console.log("products",products)}
<h1>Transactions</h1>
                {products?.map((product, idx) => (
                  <div
                    key={idx}
                    className="col-lg-12 col-sm-12 col-12"
                    
                    style={{ cursor: "pointer" }}
                  >
                    <Product product={product} key={idx}></Product>
                  </div>
                ))}
              </div>
            </div>
            {/* <Pagination /> */}
          </div>
          {/* <button onClick={()=>{getNFTs()}}>click</button> */}
        </div>
      </div>
    </CollectionStyleWrapper>
  );
};

export default Account;
