import React from "react";
import styles from './index.module.scss';

import { ReactComponent as Banner } from './banner.svg';

import { ReactComponent as S11SampleIcon } from './s1-1-sample-icon.svg';
import { ReactComponent as S12BasketIcon } from './s1-2-basket-icon.svg';
import { ReactComponent as S13StatusIcon } from './s1-3-status-icon.svg';
import { ReactComponent as S21OrderIcon } from './s2-1-order-icon.svg';
import { ReactComponent as S31ArtIcon } from './s3-1-art-icon.svg';
import { ReactComponent as S32PPWhiteIcon } from './s3-2-pp-white-icon.svg';
import { ReactComponent as S33PPSilverIcon } from './s3-3-pp-silver-icon.svg';
import { ReactComponent as S34PPTransIcon } from './s3-4-pp-trans-icon.svg';
import { ReactComponent as S41LogoIcon } from './s4-1-logo-icon.svg';
import { ReactComponent as S51OrderIcon } from './s5-1-order-icon.svg';


import FooterComponent from "../footer";

const HomeComponent = () => {
    return (
        <>
        <main>
            <Banner className={styles.banner} />

            <section className={styles.section1}>
                <button>
                    <S11SampleIcon />
                    ขอชุดตัวอย่างสติกเกอร์
                </button>
                <button>
                    <S12BasketIcon />
                    ขั้นตอนการสั่งซื้อ
                </button>
                <button>
                    <S13StatusIcon />
                    ดูสถานะการสั่งซื้อ
                </button>
            </section>

            <section className={styles.section2}>
                <h2>ขั้นตอนการสั่งซื้อ</h2>
                <ol className={styles.stepsOrder}>
                    <li>
                        <span><S11SampleIcon /></span>
                        <p>เลือกรูปแบบสติกเกอร์</p>
                    </li>
                    <li>
                        <span><S11SampleIcon /></span>
                        <p>อัพโหลดไฟล์ & ชำระเงิน</p>
                    </li>
                    <li>
                        <span><S11SampleIcon /></span>
                        <p>อนุมัติแบบงาน</p>
                    </li>
                    <li>
                        <span><S11SampleIcon /></span>
                        <p>ผลิต และ จัดส่งสินค้า</p>
                    </li>
                </ol>
                <button>
                    <S21OrderIcon />
                    <b>สั่งซื้อสินค้า</b>
                </button>

            </section>

            <section className={styles.section3}>
                <h2>ผลงานของเรา</h2>
                <div className={styles.cardWrapper}>
                    <div className={styles.card}>
                        กระดาษ Art
                    <S31ArtIcon id="s31Svg" />
                        <button>
                            ดูตัวอย่าง
                    </button>
                    </div>
                    <div className={styles.card}>
                        PP ขาว
                    <S32PPWhiteIcon id="s32Svg" />
                        <button>
                            ดูตัวอย่าง
                    </button>
                    </div>
                    <div className={styles.card}>
                        PP เงิน
                    <S33PPSilverIcon id="s33Svg" />
                        <button>
                            ดูตัวอย่าง
                    </button>
                    </div>
                    <div className={styles.card}>
                        PP ใส
                    <S34PPTransIcon id="s34Svg" />
                        <button>
                            ดูตัวอย่าง
                    </button>
                    </div>
                </div>

            </section>

            <section className={styles.section4}>
                <S41LogoIcon />


                <p>
                    <h2>เกี่ยวกับเรา</h2>
                    <b>Lorem Ipsum</b> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
                </p>

            </section>

            <button className={styles.orderButton}>
                <S51OrderIcon />
                สั่งซื้อสติกเกอร์
            </button>
        </main>

        <FooterComponent />
        </>
    );
};

export default HomeComponent;