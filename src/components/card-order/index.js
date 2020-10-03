import React from "react";
import styles from './index.module.scss';

import { ReactComponent as Circle } from '../approve-layout/circle.svg';

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const CardOrderComponent = (props) => {
    return (
        <Carousel responsive={responsive}>
            <div className={`${styles.card} ${`${props.expandCard}` === `${0}` && styles.active}`} onClick={() => props.setExpandCard(0)}>
                <h4>หมายเลขรายการ ITM00001</h4>
                <div className={styles.description}>
                    <Circle />
                    <h4>สติกเกอร์แบบกลม</h4>
                    <p>กระดาษอาร์ต - เคลือบด้าน - ขนาด 10x20 mm </p>
                    <h4 className={styles.quality}>300ชิ้น</h4>
                    <h4 className={styles.price}>500฿</h4>
                </div>

                <label className={styles.waitApproval}>กำลังดำเนินการ</label>
            </div>
            <div className={`${styles.card} ${`${props.expandCard}` === `${1}` && styles.active}`} onClick={() => props.setExpandCard(1)}>
                <h4>หมายเลขรายการ ITM00001</h4>
                <div className={styles.description}>
                    <Circle />
                    <h4>สติกเกอร์แบบกลม</h4>
                    <p>กระดาษอาร์ต - เคลือบด้าน - ขนาด 10x20 mm </p>
                    <h4 className={styles.quality}>300ชิ้น</h4>
                    <h4 className={styles.price}>500฿</h4>
                </div>

                <label className={styles.waitApproval}>กำลังดำเนินการ</label>
            </div>
            <div className={`${styles.card} ${`${props.expandCard}` === `${2}` && styles.active}`} onClick={() => props.setExpandCard(2)}>
                <h4>หมายเลขรายการ ITM00001</h4>
                <div className={styles.description}>
                    <Circle />
                    <h4>สติกเกอร์แบบกลม</h4>
                    <p>กระดาษอาร์ต - เคลือบด้าน - ขนาด 10x20 mm </p>
                    <h4 className={styles.quality}>300ชิ้น</h4>
                    <h4 className={styles.price}>500฿</h4>
                </div>

                <label className={styles.waitApproval}>กำลังดำเนินการ</label>
            </div>
            <div>Item 4</div>
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