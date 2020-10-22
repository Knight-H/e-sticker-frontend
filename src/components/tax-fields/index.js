import React from "react";
import { Field, ErrorMessage } from 'formik';

import styles from './index.module.scss';

const LocationFieldsComponent = (props) => {
    return (
        <div className={styles.gridContainer}>
            {/*  GRID ITEM ISN"T EVEN USED? DONT EVEN HAVE SCSS WTF? */}

            <div className={styles.gridItem}>
                <div className={styles.formControl}>
                    <p>ชื่อ นามสกุล* <ErrorMessage name="billingFullname" render={msg => <span style={{color: "red"}}>{msg}</span>}/></p>
                    <Field name="billingFullname" type="text"/>
                </div>
            </div>

            <div className={styles.gridItem}>
                <div className={styles.formControl}>
                    <p>ที่อยู่* <ErrorMessage name="billingFulladdress" render={msg => <span style={{color: "red"}}>{msg}</span>}/></p>
                    <Field name="billingFulladdress" type="text"/>
                </div>
            </div>

            <div className={styles.gridItem}>
                <div className={styles.formControl}>
                    <p>เลขที่ใบกำกับภาษี</p>
                    <Field name="billingTaxID" type="text"/>
                </div>
            </div>

        </div>
    );
}

export default LocationFieldsComponent;