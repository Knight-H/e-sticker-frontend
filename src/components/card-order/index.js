import React from "react";
import styles from './index.module.scss';
import { useFormikContext } from 'formik';

import { ReactComponent as Circle } from '../approve-layout/circle.svg';

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const CardOrderComponent = (props) => {
    const { values, setFieldValue } = useFormikContext();

    return (
        <Carousel responsive={responsive}>
            {values.itemsList.map((listCard, index) => {
                // console.log("listCard", listCard)
                return (
                    <div className={`${styles.card} ${`${values.expandCard}` === `${index}` && styles.active}`} onClick={() => setFieldValue("expandCard", index, false)}>
                        <h4>หมายเลขรายการ {listCard.itemID}</h4>
                        <div className={styles.description}>
                            <img src={listCard.messages[0].content} />
                            {/* <Circle /> */}
                            <h4>รูปแบบ{listCard.shape}</h4>
                            <p>{listCard.material} - {listCard.coat} - ขนาด {listCard.width}x{listCard.height} cm.</p>
                            <h4 className={styles.quality}>{listCard.units}ชิ้น</h4>
                            <h4 className={styles.price}>{listCard.price}฿</h4>
                        </div>
                        <LabelSatus status={listCard.status} paymentStatus={values.paymentStatus} paymentMethod={values.paymentMethod} />
                    </div>
                )
            })}
        </Carousel>
    )
}

export default CardOrderComponent;


const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3
    },
    tablet: {
        breakpoint: { max: 1024, min: 700 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 700, min: 0 },
        items: 1
    }
};

const LabelSatus = ({ status, paymentStatus, paymentMethod }) => {
    if (status === "รออนุมัติแบบ" && paymentMethod !== "transfer_money") {
        return <label className={`${styles.labelStatus} ${styles.orangeStatus}`}>สถานะ: รออนุมัติแบบ</label>
    } else if (status === "อนุมัติแบบ" && paymentMethod !== "transfer_money") {
        return <label className={`${styles.labelStatus} ${styles.greenStatus}`}>สถานะ: อนุมัติแบบ</label>
    } else if (paymentStatus === "pending" && paymentMethod === "transfer_money") {
        return <label className={`${styles.labelStatus} ${styles.blueStatus}`}>สถานะ: รอการยืนยันชำระเงิน</label>
    } else {
        return <label></label>
    }
}
