import React, { useState } from "react";
import { Link } from "react-router-dom";
import { withRouter } from 'react-router';
import styles from './index.module.scss';
import { ReactComponent as EditPen } from './edit-pen.svg';
import { ReactComponent as IconRock } from './icon-rock.svg';
import { ReactComponent as LockOut } from './lock-out.svg';

const AdminNavBarComponent = ({ history }) => {
    const [isBurgerToggled, setIsBurgerToggled] = useState(false);
    let url = window.location.pathname;
    console.log("url", url)
    return (
        <header>
            <nav className={styles.navBar}>
                <h1 className={styles.titleNavBar} onClick={() => history.push('/')}>Stickerwish Dashboard</h1>

                {url !== "/admin-login" &&
                    <>
                        <ul className={`${styles.navLinks} ${isBurgerToggled ? styles.navActive : ""}`}>
                            <li><Link to="/"><EditPen />ปรับแต่งตัวเลือก</Link></li>
                            <li><Link to={{
                                pathname: "/",
                                // hash: "#stepsOrder",
                                state: { scrollToStepsOrder: true }
                            }}
                            // onClick={stepsOrderScroll}
                            ><IconRock />เปลี่ยนรหัสผ่าน</Link></li>
                            <li><Link to={{
                                pathname: "/",
                                // hash: "#ourWorks",  
                                state: { scrollToOurWorks: true }
                            }}><LockOut />ออกจากระบบ</Link></li>
                        </ul>

                        <div className={`${styles.burger} ${isBurgerToggled ? styles.toggle : ""}`}
                            onClick={e => setIsBurgerToggled(!isBurgerToggled)}>
                            <div className={styles.line1}></div>
                            <div className={styles.line2}></div>
                            <div className={styles.line3}></div>
                        </div>
                    </>
                }
            </nav>
        </header>
    );
};


export default withRouter(AdminNavBarComponent);