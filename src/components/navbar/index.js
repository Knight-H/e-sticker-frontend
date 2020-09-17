import React from "react";
import {Link} from "react-router-dom";
import { withRouter } from 'react-router';
import styles from './index.module.scss';

import { ReactComponent as ProfileIcon } from './profile-icon.svg';
import { ReactComponent as ShoppingCart } from './shopping-cart.svg';
import { ReactComponent as Logo } from './logo.svg';

const NavBarComponent = ({history}) => {
    return (
        <nav>
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
            <div className={styles.navBar}>
                <Logo onClick={() => history.push('/')}/>
                <div>
                    <Link to="/">หน้าแรก</Link>
                    <Link to="/">วิธีการสั่งซื้อ</Link>
                    <Link to="/">ตัวอย่างผลงาน</Link>
                    <button><Link to="/">สั่งทำสติกเกอร์</Link></button>
                </div>
            </div>
        </nav>
    );
};

export default withRouter(NavBarComponent);