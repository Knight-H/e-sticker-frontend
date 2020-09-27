import React, {useState} from "react";
// import { Link } from "react-router-dom";
import { withRouter } from 'react-router';
import styles from './index.module.scss';

const AdminNavBarComponent = ({ history }) => {
    const [isBurgerToggled, setIsBurgerToggled] = useState(false);

    return (
        <header>
            <nav className={styles.navBar}>
                <h1 className={styles.titleNavBar}>Stickerwish Dashboard</h1>
                {/* onClick={() => history.push('/')} */}
                {/* <ul className={`${styles.navLinks} ${isBurgerToggled ? styles.navActive : ""}`}>
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
                    <li><button><Link to="/order-1-product-config">สั่งทำสติกเกอร์</Link></button></li>
                </ul>

                <div className={`${styles.burger} ${isBurgerToggled ? styles.toggle : ""}`} 
                    onClick={e => setIsBurgerToggled(!isBurgerToggled)}>
                    <div className={styles.line1}></div>
                    <div className={styles.line2}></div>
                    <div className={styles.line3}></div>
                </div> */}
            </nav>
        </header>
    );
};


export default withRouter(AdminNavBarComponent);