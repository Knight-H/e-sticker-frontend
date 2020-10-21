import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { withRouter } from 'react-router';
import styles from './index.module.scss';

import { ReactComponent as ProfileIcon } from './profile-icon.svg';
import { ReactComponent as ShoppingCart } from './shopping-cart.svg';
import { ReactComponent as Logo } from './logo.svg';


import useWindowSize from '../../hooks/useWindowSize';
import { auth } from '../../firebase/index'
import { i18_th } from '../common-scss/i18_text'

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
    const [itemCountInCart, setItemCountInCart] = useState(itemCount)
    const { width } = useWindowSize();

    // If the window is greater than 768, unToggle the Burger.
    useEffect(() => {
        if (width > 768) {
            setIsBurgerToggled(false);
        }
    }, [width]);

    // Update when the cart item count changes
    useEffect(() => {
        setItemCountInCart(1.2)
    }, [itemCountInCart])

    // Not sure if this is the correct way to prevent scrolling when modal is open.
    // From Answer #2 of https://stackoverflow.com/questions/54989513/react-prevent-scroll-when-modal-is-open
    useEffect(() => {
        if (isBurgerToggled) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isBurgerToggled]);

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setIsLoggedIn(user?.uid ? true : false)
        })
    }, [isLoggedIn])

    function onClickDisableBurger() {
        // disable burger so user can scroll
        setIsBurgerToggled(false)
    }

    return (
        <header>
            <div className={styles.topBar}>

                {(() => {
                    return isLoggedIn ?
                        <Link to="/member">
                            <button>
                                <ProfileIcon />{i18_th.account_my_account}
                            </button>
                        </Link>
                        :
                        <Link to="/login">
                            <button>
                                <ProfileIcon />{i18_th.account_login}
                            </button>
                        </Link>
                })()}

                <Link to="/cart">
                    <button>
                        <ShoppingCart />ตะกร้าสินค้า {(() => {
                            if (!Number.isInteger(itemCountInCart) || itemCountInCart === 0) {
                                return ""
                            } else if (itemCountInCart <= 99) {
                                return "(" + itemCountInCart + ")"
                            }
                            return "(99+)"
                        })()}
                    </button>
                </Link>
            </div>
            <nav className={styles.navBar}>
                <Logo onClick={() => history.push('/')} />
                <ul className={`${styles.navLinks} ${isBurgerToggled ? styles.navActive : styles.navInactive}`}>
                    <li>
                        <Link to="/" onClick={onClickDisableBurger}>หน้าแรก</Link>
                    </li>
                    <li><Link to={{
                        pathname: "/",
                        // hash: "#stepsOrder",
                        state: { scrollToStepsOrder: true }
                    }} onClick={onClickDisableBurger}
                    // onClick={stepsOrderScroll}
                    >วิธีการสั่งซื้อ</Link>
                    </li>
                    <li>
                        <Link to={{
                            pathname: "/",
                            // hash: "#ourWorks",  
                            state: { scrollToOurWorks: true }
                        }} onClick={onClickDisableBurger}>ตัวอย่างผลงาน</Link>
                    </li>
                    <li>
                        <button>
                            <Link to="/customize" onClick={onClickDisableBurger}>สั่งทำสติกเกอร์</Link>
                        </button>
                    </li>
                </ul>

                <div className={`${styles.burger} ${isBurgerToggled ? styles.toggle : ""}`}
                    onClick={e => setIsBurgerToggled(!isBurgerToggled)}>
                    <div className={styles.line1}></div>
                    <div className={styles.line2}></div>
                    <div className={styles.line3}></div>
                </div>
            </nav>
        </header>
    );
};


export default withRouter(NavBarComponent);