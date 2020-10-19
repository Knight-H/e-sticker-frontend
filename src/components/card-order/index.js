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
                console.log("listCard", listCard.status)
                return (
                    <div className={`${styles.card} ${`${values.expandCard}` === `${index}` && styles.active}`} onClick={() => setFieldValue("expandCard", index, false)}>
                        <h4>หมายเลขรายการ {listCard.orderID}</h4>
                        <div className={styles.description}>
                            <Circle />
                            <h4>{listCard.shape}</h4>
                            <p>{listCard.material} - {listCard.coat} - {listCard.cutting} - ขนาด {listCard.width}x{listCard.height} mm.</p>
                            <h4 className={styles.quality}>{listCard.units}ชิ้น</h4>
                            <h4 className={styles.price}>{listCard.price}฿</h4>
                        </div>
                        <LabelSatus status={listCard.approveMethod} />
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

const LabelSatus = ({ status }) => {
    if (status === "รออนุมัติแบบ") {
        return <label className={`${styles.labelStatus} ${styles.orangeStatus}`}>สถานะ: รออนุมัติแบบ</label>
    } else if (status === "อนุมัติแบบ") {
        return <label className={`${styles.labelStatus} ${styles.greenStatus}`}>สถานะ: อนุมัติแบบ</label>
    }
}
