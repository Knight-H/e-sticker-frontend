import React, { useState, useEffect } from "react";
import styles from './index.module.scss';
import { useFormikContext } from 'formik';

import MessageImage from './checkbox.png';

const Order1ProductConfigComponent = (props) => {
    // const { values, setFieldValue } = useFormikContext();

    // useEffect(() => {
    //     if (values.material) {
    //         values.optionMaterial.map((data) => {
    //             if (data.name === values.material) {
    //                 setFieldValue("optionCoat", data.coating_list, false);
    //             }
    //         })
    //     }
    //   }, [values.material]);

    return (
        <main>
            <div className={styles.centerImg}>
                <img src={MessageImage} width="300" />
            </div>
        </main>
    )
}

export default Order1ProductConfigComponent;