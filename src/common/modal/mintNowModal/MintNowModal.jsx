import { useState, useRef } from "react";
import { useModal } from "../../../utils/ModalContext";
import { FiX } from "react-icons/fi";
import Button from "../../button";
import MintModalStyleWrapper from "./MintNow.style";
import { web3 } from "../../../config";

import { useEffect } from "react";
import { isMetaMaskInstalled } from "../../../config";
import { toast } from "react-toastify";

const MintNowModal = () => {
  const ref = useRef();
  const [message, setMessage] = useState("");
  const [bool,setBool]=useState(false)
  const { mintModalHandle,chainName } = useModal();
  const {
    walletModalHandle,
    visibility,
    metamaskModalHandle,
    Count,

    NFT,
    account,
    contractAddress,
    Contract,
    setNextMint,
  } = useModal();

  let price = 0.03;

  // const transactionParameters = {
  //   to: contractAddress, // Required except during contract publications.
  //   from: account, // must match user's active address.
  //   data: Contract.methods._safeMint(account._address,Count).encodeABI(),
  // };
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  const mintNow = async () => {
    console.log(account);
    console.log(Count);
    console.log(contractAddress);

    try {
      const transactionParameters = {
        to: contractAddress, // Required except during contract publications.
        from: account[0], // must match user's active address.
        data: Contract.methods._safeMint(account[0], Count).encodeABI(),
      };
      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      });
      if (txHash) {
        await delay(5000);
        let pollInterval = 4;
        let elapsedTime = 0;

        while (elapsedTime < pollInterval) {
          let receipt;
          try {
            receipt = await web3.eth.getTransactionReceipt(txHash);
          } catch (err) {
            console.log("error retrieving transaction receipt: " + err);
          }
          console.log("Print kr bhai", receipt);
          if (receipt) {
            if (receipt.status) {
              console.log("txHash", txHash);
              setNextMint(txHash);
              toast.success("Successfully Minted");
              console.log("txHash", receipt.status);
              return receipt;
            } else {
              toast.warning("Transaction reverted");
              return null;
            }
          } else {
            await delay(5000);
          }
          elapsedTime += 2;
        }
        console.log("transaction failed");
      }
    } catch (err) {
      console.log(err);
      console.log("Eror in sending transactions");
    }
  };

  const handleWalletConnect = async () => {
    if (!isMetaMaskInstalled()) {
      metamaskModalHandle();
    } else {
      walletModalHandle();
    }
  };
  const check=async(chain)=>{
    console.log("ye ha chain", chain)
    if(chain=="goerli" || chain=="mumbai"){
      setBool(true)

    }

  }
  useEffect(() => {
    console.log(chainName)
    check(chainName)
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (visibility && ref.current && !ref.current.contains(e.target)) {
        mintModalHandle();
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [visibility]);
  return (
    <>
      <MintModalStyleWrapper
        className="modal_overlay"
        style={{ paddingTop: "20px" }}
      >
        <div className="mint_modal_box" style={{ marginTop: "75px" }}>
          <div className="mint_modal_content" ref={ref}>
            <div className="modal_header" style={{ marginTop: "-30px" }}>
              <h2>{NFT.name}</h2>
              <button onClick={() => mintModalHandle()}>
                <FiX />
              </button>
            </div>
            <div className="modal_body text-center">
              <div className="mint_img">
                {NFT.metadata?<img src={NFT.metadata.image} alt="bithu nft mint" />:<></>}
              </div>
              <div className="mint_count_list">
                <ul>
                  <li>
                    <h5>Owner</h5>
                    <br></br>
                    <h5>
                      <span>{NFT.ownerOf}</span>
                    </h5>
                  </li>
                  <li>
                    <h5>Symbol</h5>
                    <h5>{NFT.symbol} ETH</h5>
                  </li>
                  <li>
                    <h5>Token Hash</h5>
                    <h5>{NFT.tokenHash} ETH</h5>
                  </li>
                  <li>
                    <h5>Token ID</h5>
                    <h5>{NFT.tokenId} ETH</h5>
                  </li>
                  <li>
                    <h5 style={{ color: "red", margin: "auto" }}>
                      
                    </h5>
                  </li>
                  <div className="modal_mint_btn">
                    {bool ? (
                      <a href={`https://testnets.opensea.io/assets/${chainName}/${NFT.tokenAddress}/${NFT.tokenId}`} target="_blank">
                      <Button lg variant="mint"  >
                        Mint Now
                      </Button>
                      </a>
                    ) : (
                      <a href={`https://opensea.io/assets/${chainName}/${NFT.tokenAddress}/${NFT.tokenId}`} target="_blank">
                      <Button lg variant="mint"  >
                        Mint Now
                      </Button>
                      </a>
                    )}
                  </div>
                </ul>
              </div>
              {message && <p>{message}</p>}
            </div>
          </div>
        </div>
      </MintModalStyleWrapper>
    </>
  );
};

export default MintNowModal;
