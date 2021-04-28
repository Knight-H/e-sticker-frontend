import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import styles from "./index.module.scss";

import { ReactComponent as ProfileIcon } from "./profile-icon.svg";
import { ReactComponent as ShoppingCart } from "./shopping-cart.svg";
import { ReactComponent as Logo } from "./logo.svg";

import useWindowSize from "../../hooks/useWindowSize";
import { auth } from "../../firebase/index";
import { i18_th } from "../common-scss/i18_text";

import axios from "axios";
import qs from "querystring";
import jwt_decode from "jwt-decode";

import logo from "./logo.png";

// const stepsOrderScroll = () => {
//     const { pathname, hash } = window.location;
//     if (pathname === "/" && hash === "#stepsOrder"){
//         const stepsOrderElement = document.querySelector('#stepsOrder');
//     stepsOrderElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
//     }
// }

const NavBarComponent = ({ history, itemCount }) => {
  const [isBurgerToggled, setIsBurgerToggled] = useState(false);

  // Maybe this should be moved out and made reusable instead of passing in
  const [itemCountInCart, setItemCountInCart] = useState(itemCount);
  const { width } = useWindowSize();

  // If the window is greater than 768, unToggle the Burger.
  useEffect(() => {
    if (width > 768) {
      setIsBurgerToggled(false);
    }
  }, [width]);

  // Update when the cart item count changes
  useEffect(() => {
    setItemCountInCart(1.2);
  }, [itemCountInCart]);

  // Not sure if this is the correct way to prevent scrolling when modal is open.
  // From Answer #2 of https://stackoverflow.com/questions/54989513/react-prevent-scroll-when-modal-is-open
  useEffect(() => {
    if (isBurgerToggled) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isBurgerToggled]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setIsLoggedIn(user?.uid ? true : false);
    });
  }, [isLoggedIn]);

  function onClickDisableBurger() {
    // disable burger so user can scroll
    setIsBurgerToggled(false);
  }

  // useEffect(() => {
  //     let url = window.location.search;
  //     const urlParams = new URLSearchParams(url);
  //     let code = urlParams.get('code');

  //     if (code) {
  //         const requestBody = {
  //             "grant_type": "authorization_code",
  //             "code": code,
  //             "redirect_uri": "http://sticker.digitalwish.co.th",
  //             "client_id": "1655248592",
  //             "client_secret": "45f5c965e3ac723120e8adec38e8793c"
  //         }

  //         const config = {
  //             headers: {
  //                 'Content-Type': 'application/x-www-form-urlencoded'
  //             }
  //         }

  //         axios.post("https://api.line.me/oauth2/v2.1/token", qs.stringify(requestBody), config)
  //             .then((result) => {
  //                 console.log("https://api.line.me/oauth2/v2.1/token", result.data)
  //                 var decoded = jwt_decode(result.data.id_token);
  //                 console.log("decoded", decoded)
  //                 let data = {
  //                     "access_token": result.data.access_token,
  //                     "customer_id": decoded.sub,
  //                     "uid": decoded.sub,
  //                     "name": decoded.name,
  //                     "email": decoded.email,
  //                     "picture": decoded.picture
  //                 }
  //                 console.log("data", data);

  //                 axios.post("https://asia-east2-digitalwish-sticker.cloudfunctions.net/lineLogin", data)
  //                     .then((res) => {
  //                         console.log("https://asia-east2-digitalwish-sticker.cloudfunctions.net/lineLogin", res.data)
  //                         localStorage.setItem("token_line", result.data.id_token);

  //                         auth
  //                             .signInWithCustomToken(res.data.firebase_token)
  //                             .then((res_auth) => {
  //                                 console.log("res_auth", res_auth)

  //                                 auth.onAuthStateChanged((user) => {
  //                                     setIsLoggedIn(user?.uid ? true : false)
  //                                 })

  //                             })
  //                             .catch((error) => {
  //                                 console.log("error", error)
  //                             })

  //                     })
  //                     .catch((err) => {
  //                         console.log(err)
  //                     })
  //             })
  //             .catch((err) => {
  //                 console.log(err)
  //             })
  //     } else {
  //         auth.onAuthStateChanged((user) => {
  //             setIsLoggedIn(user?.uid ? true : false)
  //         })
  //     };

  // }, [isLoggedIn, window.location.search])

  return (
    <header>
      {/* <div className={styles.topBar}>

                
            </div> */}
      <nav className={styles.navBar}>
        {/*<Logo onClick={() => history.push('/')} className={styles.logoBrand} />*/}
        <img
          src={logo}
          onClick={() => history.push("/")}
          className={styles.logoBrand}
        />
        <ul
          className={`${styles.navLinks} ${
            isBurgerToggled ? styles.navActive : styles.navInactive
          }`}
        >
          <li>
            <Link to="/" onClick={onClickDisableBurger}>
              หน้าแรก
            </Link>
          </li>
          <li>
            <Link
              to={{
                pathname: "/",
                // hash: "#stepsOrder",
                state: { scrollToStepsOrder: true },
              }}
              onClick={onClickDisableBurger}
              // onClick={stepsOrderScroll}
            >
              วิธีการสั่งซื้อ
            </Link>
          </li>
          <li>
            <Link
              to={{
                pathname: "/",
                // hash: "#ourWorks",
                state: { scrollToOurWorks: true },
              }}
              onClick={onClickDisableBurger}
            >
              ตัวอย่างผลงาน
            </Link>
          </li>
          <li>
            <button>
              <Link to="/customize" onClick={onClickDisableBurger}>
                สั่งทำสติกเกอร์
              </Link>
            </button>
          </li>
          <li className={styles.topBarV2}>
            {(() => {
              return isLoggedIn ? (
                <Link to="/member">
                  <button>
                    <ProfileIcon />   
                  </button>
                </Link>
              ) : (
                <Link to="/login">
                  <button>
                    <ProfileIcon />
                  </button>
                </Link>
              );
            })()}
          </li>
          <li className={styles.topBarV2}>
            <Link to="/cart">
              <button>
                <ShoppingCart />
                {" "}
                {(() => {
                  if (
                    !Number.isInteger(itemCountInCart) ||
                    itemCountInCart === 0
                  ) {
                    return "";
                  } else if (itemCountInCart <= 99) {
                    return "(" + itemCountInCart + ")";
                  }
                  return "(99+)";
                })()}
              </button>
            </Link>
          </li>
        </ul>

        <div
          className={`${styles.burger} ${isBurgerToggled ? styles.toggle : ""}`}
          onClick={(e) => setIsBurgerToggled(!isBurgerToggled)}
        >
          <div className={styles.line1}></div>
          <div className={styles.line2}></div>
          <div className={styles.line3}></div>
        </div>
      </nav>
    </header>
  );
};

export default withRouter(NavBarComponent);
