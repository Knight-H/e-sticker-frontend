import React from "react";
import {Link} from "react-router-dom";
import { withRouter } from 'react-router';
import styles from './index.module.scss';

import { ReactComponent as ProfileIcon } from './profile-icon.svg';
import { ReactComponent as ShoppingCart } from './shopping-cart.svg';
import { ReactComponent as Logo } from './logo.svg';

const NavBarComponent = ({history}) => {
    return (
        <header>
            <div className={styles.topBar}>
                <button>
                    <ProfileIcon/>
                    เข้าสู่ระบบ
                </button>
                <button>
                    <ShoppingCart/>
                    ตะกร้าสินค้า
                </button>
            </div>
            <nav className={styles.navBar}>
                <Logo onClick={() => history.push('/')}/>
                <ul>
                    <li><Link to="/">หน้าแรก</Link></li>
                    <li><Link to="/">วิธีการสั่งซื้อ</Link></li>
                    <li><Link to="/">ตัวอย่างผลงาน</Link></li>
                    <li><button><Link to="/">สั่งทำสติกเกอร์</Link></button></li>
                </ul>
            </nav>
        </header>
    );
};

export default withRouter(NavBarComponent);