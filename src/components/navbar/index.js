import React, {useState} from "react";
import { Link } from "react-router-dom";
import { withRouter } from 'react-router';
import styles from './index.module.scss';

import { ReactComponent as ProfileIcon } from './profile-icon.svg';
import { ReactComponent as ShoppingCart } from './shopping-cart.svg';
import { ReactComponent as Logo } from './logo.svg';


// const stepsOrderScroll = () => {
//     const { pathname, hash } = window.location;
//     if (pathname === "/" && hash === "#stepsOrder"){
//         const stepsOrderElement = document.querySelector('#stepsOrder');
//     stepsOrderElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
//     }
    
// }

const NavBarComponent = ({ history }) => {
    const [isBurgerToggled, setIsBurgerToggled] = useState(false);

    return (
        <header>
            <div className={styles.topBar}>
                <button>
                    <ProfileIcon />
                    เข้าสู่ระบบ
                </button>
                <button>
                    <ShoppingCart />
                    ตะกร้าสินค้า
                </button>
            </div>
            <nav className={styles.navBar}>
                <Logo onClick={() => history.push('/')} />
                <ul className={`${styles.navLinks} ${isBurgerToggled ? styles.navActive : ""}`}>
                    <li><Link to="/">หน้าแรก</Link></li>
                    <li><Link to={{
                        pathname: "/",
                        // hash: "#stepsOrder",
                        state: {scrollToStepsOrder: true}
                    }} 
                    // onClick={stepsOrderScroll}
                    >วิธีการสั่งซื้อ</Link></li>
                    <li><Link to={{pathname: "/", 
                    // hash: "#ourWorks",  
                    state: {scrollToOurWorks: true}}}>ตัวอย่างผลงาน</Link></li>
                    <li><button><Link to="/form_step_shopping">สั่งทำสติกเกอร์</Link></button></li>
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