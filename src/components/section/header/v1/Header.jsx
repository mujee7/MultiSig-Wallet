import { useModal } from "../../../../utils/ModalContext";
import { useEffect, useState } from "react";
import { FaDiscord, FaWallet, FaUserAstronaut } from "react-icons/fa";
import { MdNotes } from "react-icons/md";
import Button from "../../../../common/button";
import NavWrapper from "./Header.style";
import MobileMenu from "../mobileMenu/MobileMenu";
import logo from "../../../../assets/images/nft/cpg/Cyber Punk Girl.png";
import { isMetaMaskInstalled } from "../../../../config";
import Dropdown from "react-bootstrap/Dropdown";
import { Link, useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
const Header = () => {
  let nav = useNavigate();

  const {
    walletModalHandle,
    metamaskModalHandle,
    account,
    isWalletAlreadyConnected,
    disconnectWalletFromApp,
  } = useModal();
  const [isMobileMenu, setMobileMenu] = useState(false);
  const handleMobileMenu = () => {
    setMobileMenu(!isMobileMenu);
  };

  const substr = (str, n) => {
    return str.length > n ? str.substr(0, n - 1) : str;
  };

  const handleWalletConnect = async () => {
    if (!isMetaMaskInstalled()) {
      metamaskModalHandle();
    } else {
      walletModalHandle();
    }
  };
  useEffect(() => {
    const header = document.getElementById("navbar");
    const handleScroll = window.addEventListener("scroll", () => {
      if (window.pageYOffset > 50) {
        header.classList.add("sticky");
      } else {
        header.classList.remove("sticky");
      }
    });

    return () => {
      window.removeEventListener("sticky", handleScroll);
    };
  }, []);

  useEffect(() => {
    isWalletAlreadyConnected();
  }, []);

  return (
    <NavWrapper className="bithu_header" id="navbar">
      <div className="container">
        {/* Main Menu Start */}
        <div className="bithu_menu_sect">
          <div className="bithu_menu_left_sect">
            <div className="logo">
              <HashLink to="/#">
                <a href="/">
                  <img src={logo} alt="bithu nft logo" />
                </a>
              </HashLink>
            </div>
          </div>
          <div className="bithu_menu_right_sect bithu_v1_menu_right_sect">
            <div className="bithu_menu_list">
              
            </div>
            <div className="bithu_menu_btns">
              <button className="menu_btn" onClick={() => handleMobileMenu()}>
                <MdNotes />
              </button>

              {account ? (
                <Dropdown>
                  <Dropdown.Toggle
                    variant="white"
                    id="dropdown-basic"
                    className="connect_btn"
                  >
                    {substr(account.toString(), 15)}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={() => disconnectWalletFromApp()}
                      style={{ color: "red" }}
                    >
                      Disconnect
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Button
                  sm
                  variant="hovered"
                  className="connect_btn"
                  onClick={() => handleWalletConnect()}
                >
                  <FaWallet />
                  Connect
                </Button>
              )}
              {account ? (
                <Button
                  sm
                  variant="hovered"
                  className="connect_btn"
                  style={{ backgroundColor: "#36bc8b" }}
                  onClick={() => nav("/Account")}
                >
                  <FaUserAstronaut />
                  Account
                </Button>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
        {/* <!-- Main Menu END --> */}
        
      </div>
    </NavWrapper>
  );
};

export default Header;
