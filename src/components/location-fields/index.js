import React from "react";
import styles from './index.module.scss';

const LocationFieldsComponent = () => {
    return (
        <div className={styles.gridContainer}>
            {/*  GRID ITEM ISN"T EVEN USED? DONT EVEN HAVE SCSS WTF? */}
            <div className={styles.gridItem}> 
                <div className={styles.formControl}>
                    <p>อีเมล*</p>
                    <div ><input type="text" value="" /></div>
                </div>
            </div>

            <div className={styles.gridItem}>
                <div className={styles.formControl}>
                    <p>เบอร์โทรศัพท์*</p>
                    <div ><input type="text" value="" /></div>
                </div>
            </div>

            <div className={styles.gridItem}>
                <div className={styles.formControl}>
                    <p>ที่อยู่*</p>
                    <div ><input type="text" value="" /></div>
                </div>
            </div>

            <div className={styles.gridItem}>
                <div className={styles.formControl}>
                    <p>ชื่อ นามสกุล*</p>
                    <div ><input type="text" value="" /></div>
                </div>
            </div>

            <div className={styles.gridItem}>
                <div className={styles.formControl}>
                    <p>แขวง*</p>
                    <div ><input type="text" value="" /></div>
                </div>
            </div>

            <div className={styles.gridItem}>
                <div className={styles.formControl}>
                    <p>เขต*</p>
                    <div ><input type="text" value="" /></div>
                </div>
            </div>

            <div className={styles.gridItem}>
                <div className={styles.formControl}>
                    <p>จังหวัด*</p>
                    <div ><input type="text" value="" /></div>
                </div>
            </div>

            <div className={styles.gridItem}>
                <div className={styles.formControl}>
                    <p>รหัสไปรษณีย์*</p>
                    <div ><input type="text" value="" /></div>
                </div>
            </div>

        </div>
    );
}

export default LocationFieldsComponent;