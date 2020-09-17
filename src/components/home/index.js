import React from "react";
import styles from './index.module.scss';

import { ReactComponent as Banner } from './banner.svg';

import { ReactComponent as S11SampleIcon } from './s1-1-sample-icon.svg';
import { ReactComponent as S12BasketIcon } from './s1-2-basket-icon.svg';
import { ReactComponent as S13StatusIcon } from './s1-3-status-icon.svg';

const HomeComponent = () => {
    return (
        <main>
            <Banner className={styles.banner}/>
            
            <div className={styles.section1}>
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
            </div>
        </main>
    );
};

export default HomeComponent;