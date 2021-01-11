// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { withRouter } from 'react-router';
// import styles from './index.module.scss';



// import { auth } from '../../firebase/index.js'

// const AdminNavBarComponent = ({ history }) => {
//     const [isBurgerToggled, setIsBurgerToggled] = useState(false);
//     let url = window.location.pathname;

//     return (
//         <header>
//             <nav className={styles.navBar}>
//                 <h1 className={styles.titleNavBar} onClick={() => history.push('/admin')}>Stickerwish Dashboard</h1>

//                 {url !== "/admin-login" &&
//                     <>
//                         {/* <Logo onClick={() => history.push('/')} /> */}
//                         <ul className={`${styles.navLinks} ${isBurgerToggled ? styles.navActive : styles.navInactive}`}>
//                             <li><Link to="/"><EditPen />ปรับแต่งตัวเลือก</Link></li>
//                             <li><Link to={{
//                                 pathname: "/",
//                                 // hash: "#stepsOrder",
//                                 state: { scrollToStepsOrder: true }
//                             }}
//                             // onClick={stepsOrderScroll}
//                             ><IconRock />เปลี่ยนรหัสผ่าน</Link></li>
//                             <li><Link onClick={() => {
//                                 auth.signOut().then(response => {
//                                     console.log("response", response)
//                                     setIsBurgerToggled(false)
//                                     history.push("/")
//                                 })
//                             }}
//                                 to={{
//                                     pathname: "/admin/login",
//                                     // hash: "#ourWorks",  
//                                     state: { scrollToOurWorks: true }
//                                 }}><LockOut />ออกจากระบบ</Link></li>
//                         </ul>

//                         <div className={`${styles.burger} ${isBurgerToggled ? styles.toggle : ""}`}
//                             onClick={e => setIsBurgerToggled(!isBurgerToggled)}>
//                             <div className={styles.line1}></div>
//                             <div className={styles.line2}></div>
//                             <div className={styles.line3}></div>
//                         </div>
//                     </>
//                 }
//             </nav>
//         </header>
//     );
// };


// export default withRouter(AdminNavBarComponent);


























import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { withRouter } from 'react-router';
import styles from './index.module.scss';

import { ReactComponent as EditPen } from './edit-pen.svg';
import { ReactComponent as IconRock } from './icon-rock.svg';
import { ReactComponent as LockOut } from './lock-out.svg';

import useWindowSize from '../../hooks/useWindowSize';
import { auth } from '../../firebase/index'
import { i18_th } from '../common-scss/i18_text'

const AdminNavBarComponent = ({ history, itemCount }) => {
    const [isBurgerToggled, setIsBurgerToggled] = useState(false);

    // Maybe this should be moved out and made reusable instead of passing in
    const { width } = useWindowSize();

    // If the window is greater than 768, unToggle the Burger.
    useEffect(() => {
        if (width > 768) {
            setIsBurgerToggled(false);
        }
    }, [width]);

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

    return (
        <header>

            <nav className={styles.navBar}>
                <h1 className={styles.titleNavBar} onClick={() => history.push('/admin')}>Stickerwish Dashboard</h1>
                <ul className={`${styles.navLinks} ${isBurgerToggled ? styles.navActive : styles.navInactive}`}>
                    <li>
                        <Link><EditPen />ปรับแต่งตัวเลือก</Link>
                    </li>
                    <li><Link to="/admin/setting"><IconRock />เปลี่ยนรหัสผ่าน</Link>
                    </li>
                    <li>
                        <Link onClick={() => {
                            auth.signOut().then(response => {
                                setIsBurgerToggled(false)
                                history.push("/admin/login")
                            })
                        }}
                            to="/admin/login"><LockOut />ออกจากระบบ</Link>
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


export default withRouter(AdminNavBarComponent);