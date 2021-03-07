import React, { useEffect, useState } from "react";
import AdminKpi from "../admin-kpi";
import styles from "./index.module.scss";
import { Link } from "react-router-dom";

import { axiosInst } from "../common-scss/common";

const useInputChange = () => {
  const [input, setInput] = useState({});

  const handleInputChange = (e) =>
    setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value,
    });

  return [input, handleInputChange];
};

const initialLineYears = (n = 10) => {
  var new_date = new Date();
  var start_year = new_date.getFullYear();
  let rows_year = [
    {
      year_id: start_year,
    },
  ];
  for (var i = 1; i <= n; i++) {
    start_year = start_year - 1;
    if (start_year >= "2020") {
      rows_year.push({
        year_id: start_year,
      });
    }
  }
  return rows_year;
};

const AdminComponent = (props) => {
  var statusFilter = {
    ALL: "แสดงทั้งหมด",
    WAIT_PAYMENT: "รอชำระเงิน",
    DOING: "กำลังดำเนินการ",
    PRODUCING: "กำลังผลิตสินค้า",
    DILIVERING: "อยู่ระหว่างจัดส่ง",
    REFUN: "ขอเงินคืน",
    DONE_REFUN: "คืนเงินสำเร็จ",
    DONE: "รายการสำเร็จ",
    CANCEL: "ยกเลิก",
  };

  let countOrder = {
    ALL: 0,
    DOING: 0,
    DONE: 0,
    CANCEL: 0,
    WAIT_PAYMENT: 0,
  };

  const [selectStatus, setSelectStatus] = useState(statusFilter.ALL);
  const [textSearch, setTextSearch] = useInputChange();
  const [selectMonth, setSelectMonth] = useInputChange();
  const [selectYear, setSelectYear] = useInputChange();
  const [loading, setLoading] = useState(false);
  const [countOrderIndex, setCountOrderIndex] = useState(0);
  const [countItemIndex, setCountItemIndex] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0)

  const [orderData, setOrderData] = useState([]);
  useEffect(() => {
    let countOrderIndex = 0;
    let countItemIndex = 0;
    let totalPrice = 0;
    setLoading(true);
    axiosInst
      .get("orders", {
        headers: {
          Authorization:  'Basic ZGlnaXRhbHdpc2g6SzZDd2N3dkF6QVNDRGZWNg=='
        }
       })
      .then((res) => {
        setOrderData(
          res.data &&
            res.data.slice().sort((a, b) => {
              return new Date(b.timeStamp) - new Date(a.timeStamp);
            })
        );


        res.data.map((data) => {
          if (
            selectMonth.month === "allMonth" ||
            JSON.stringify(selectMonth) === "{}" &&
            new Date(
              `${
                selectYear.year ? selectYear.year : new Date().getFullYear()
              }`
            )
              .toISOString()
              .slice(0, 4) ===
            new Date(data.timeStamp).toISOString().slice(0, 4)
          ) {
            countOrderIndex = countOrderIndex + 1;
            countItemIndex = countItemIndex + data.itemsList.length;
            totalPrice = totalPrice + data.totalCost;
          } else if (
            new Date(
              `${
                selectYear.year ? selectYear.year : new Date().getFullYear()
              }-${selectMonth.month}`
            )
              .toISOString()
              .slice(0, 7) ===
            new Date(data.timeStamp).toISOString().slice(0, 7)
          ) {
            countOrderIndex = countOrderIndex + 1;
            countItemIndex = countItemIndex + data.itemsList.length;
            totalPrice = totalPrice + data.totalCost;
          }
        });


        setTotalPrice(totalPrice) 
        setCountOrderIndex(countOrderIndex);
        setCountItemIndex(countItemIndex);
        setLoading(false);
      })
      .catch((reason) => {
        console.log(reason);
        setLoading(false);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectYear.year, selectMonth.month]);

  if (Array.isArray(orderData)) {
    orderData.map((dataObjectMapped) => {
      if (
        dataObjectMapped.status === statusFilter.DONE ||
        dataObjectMapped.status === statusFilter.DONE_REFUN
      ) {
        countOrder.DONE = countOrder.DONE + 1;
      } else if (
        dataObjectMapped.status === statusFilter.DOING ||
        dataObjectMapped.status === statusFilter.PRODUCING ||
        dataObjectMapped.status === statusFilter.DILIVERING
      ) {
        countOrder.DOING = countOrder.DOING + 1;
      } else if (
        dataObjectMapped.status === statusFilter.CANCEL ||
        dataObjectMapped.status === statusFilter.REFUN
      ) {
        countOrder.CANCEL = countOrder.CANCEL + 1;
      } else if (dataObjectMapped.status === statusFilter.WAIT_PAYMENT) {
        countOrder.WAIT_PAYMENT = countOrder.WAIT_PAYMENT + 1;
      }
      countOrder.ALL = countOrder.ALL + 1;
      return null;
    });
  }
  return (
    <React.Fragment>
      <div class={`loader loader-default ${loading ? "is-active" : ""}`}></div>
      <section className={styles.section1}>
        <AdminKpi kpi={{ order: 10, sales: 1234567, member: 1000 }} />
      </section>
      <section className={styles.section2}>
        <div className={`${styles.containerCol} ${styles.containerMargin}`}>
          <h3>รายการคำสั่งซื้อ</h3>
        </div>
        <div className={`${styles.containerRow} ${styles.containerMargin}`}>
          <div
            className={`${styles.statusAdmin} ${styles.statusDoing} ${
              styles.statusMargin
            } ${styles.divButton} ${
              `${selectStatus}` === `${statusFilter.DOING}` &&
              styles.divButtonActive
            }`}
            onClick={() => setSelectStatus(statusFilter.DOING)}
          >
            กำลังดำเนินการ - {countOrder.DOING} รายการ
          </div>
          <div
            className={`${styles.statusAdmin} ${styles.statusWaitPayment} ${
              styles.statusMargin
            } ${styles.divButton} ${
              `${selectStatus}` === `${statusFilter.WAIT_PAYMENT}` &&
              styles.divButtonActive
            }`}
            onClick={() => setSelectStatus(statusFilter.WAIT_PAYMENT)}
          >
            รอชำระเงิน - {countOrder.WAIT_PAYMENT} รายการ
          </div>
          <div
            className={`${styles.statusAdmin} ${styles.statusDone} ${
              styles.statusMargin
            } ${styles.divButton} ${
              `${selectStatus}` === `${statusFilter.DONE}` &&
              styles.divButtonActive
            }`}
            onClick={() => setSelectStatus(statusFilter.DONE)}
          >
            เสร็จสิ้น - {countOrder.DONE} รายการ
          </div>
          <div
            className={`${styles.statusAdmin} ${styles.statusCancel} ${
              styles.statusMargin
            } ${styles.divButton} ${
              `${selectStatus}` === `${statusFilter.CANCEL}` &&
              styles.divButtonActive
            }`}
            onClick={() => setSelectStatus(statusFilter.CANCEL)}
          >
            ยกเลิก - {countOrder.CANCEL} รายการ
          </div>
          <div
            className={`${styles.statusAdmin} ${styles.statusNormal} ${
              styles.statusMargin
            } ${styles.divButton} ${
              `${selectStatus}` === `${statusFilter.ALL}` &&
              styles.divButtonActive
            }`}
            onClick={() => setSelectStatus(statusFilter.ALL)}
          >
            แสดงทั้งหมด
          </div>

          <select
            name="month"
            className={styles.inputAdmin}
            onChange={setSelectMonth}
          >
            <option value="allMonth">ทุกเดือน</option>
            <option value="01">มกราคม</option>
            <option value="02">กุมภาพันธ์</option>
            <option value="03">มีนาคม</option>
            <option value="04">เมษายน</option>
            <option value="05">พฤษภาคม</option>
            <option value="06">มิถุนายน</option>
            <option value="07">กรกฎาคม</option>
            <option value="08">สิงหาคม</option>
            <option value="09">กันยายน</option>
            <option value="10">ตุลาคม</option>
            <option value="11">พฤศจิกายน</option>
            <option value="12">ธันวาคม</option>
          </select>

          <select
            name="year"
            className={styles.inputAdmin}
            onChange={setSelectYear}
          >
            {initialLineYears().map((data) => (
              <option value={`${data.year_id}`}>{data.year_id}</option>
            ))}
          </select>

          <input
            type="text"
            name="search"
            className={styles.inputAdmin}
            placeholder="ค้นหา"
            onChange={setTextSearch}
          />
        </div>
      </section>
      <div className={styles.adminTable}>
        <table>
          <thead>
            <tr>
              <th>วันที่ออเดอร์</th>
              <th>เลขออเดอร์</th>
              {/* <th>เลขสมาชิก</th> */}
              <th>ชื่อ นามสกุล</th>
              <th>เบอร์โทรศัพท์</th>
              <th>รายการสินค้า</th>
              <th>ราคารวม</th>
              <th>สถานนะ</th>
              <th>เลขการที่จัดส่ง</th>
              {/* <th>ผู้รับผิดชอบ</th> */}
              <th>จัดการ</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Total</td>
              <td>{countOrderIndex}</td>
              <td></td>
              <td></td>
              <td>{countItemIndex}</td>
              <td>{totalPrice}</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            {(() => {
              if (orderData === null) return;
              return orderData.map((dataObjectMapped) => {
                // console.log(dataObjectMapped)
                if (dataObjectMapped.orderID) {
                  var statusOrder = styles.statusCancel;
                  var textSearchMatch = dataObjectMapped.orderID.match(
                    textSearch["search"]
                  );

                  if (
                    dataObjectMapped.status === statusFilter.DONE ||
                    dataObjectMapped.status === statusFilter.DONE_REFUN
                  ) {
                    statusOrder = styles.statusDone;
                  } else if (
                    dataObjectMapped.status === statusFilter.DOING ||
                    dataObjectMapped.status === statusFilter.PRODUCING ||
                    dataObjectMapped.status === statusFilter.DILIVERING
                  ) {
                    statusOrder = styles.statusDoing;
                  } else if (
                    dataObjectMapped.status === statusFilter.CANCEL ||
                    dataObjectMapped.status === statusFilter.REFUN
                  ) {
                    statusOrder = styles.statusCancel;
                  } else if (
                    dataObjectMapped.status === statusFilter.WAIT_PAYMENT
                  ) {
                    statusOrder = styles.statusWaitPayment;
                  }

                  if (
                    (selectStatus === dataObjectMapped.status ||
                      selectStatus === statusFilter.ALL) &&
                    textSearchMatch !== null
                  ) {
                    if (
                      selectMonth.month === "allMonth" ||
                      JSON.stringify(selectMonth) === "{}" &&
                      new Date(
                        `${
                          selectYear.year ? selectYear.year : new Date().getFullYear()
                        }`
                      )
                        .toISOString()
                        .slice(0, 4) ===
                      new Date(dataObjectMapped.timeStamp).toISOString().slice(0, 4)
                    ) {
                      return (
                        <tr key={dataObjectMapped.orderID}>
                          <td>{dataObjectMapped.timeStamp}</td>
                          <td>{dataObjectMapped.orderID}</td>
                          {/* <td>{dataObjectMapped.customerID}</td> */}
                          <td>{dataObjectMapped.shippingAddress.fullname}</td>
                          <td>{dataObjectMapped?.shippingAddress.phone}</td>
                          <td>{dataObjectMapped?.itemsList?.length || 0}</td>
                          <td>{dataObjectMapped.totalCost}</td>
                          <td>
                            <div
                              className={`${styles.statusAdmin} ${styles.statusCenter} ${statusOrder}`}
                            >
                              {dataObjectMapped.status}
                            </div>
                          </td>
                          <td>{dataObjectMapped.shippingNumber}</td>
                          {/* <td>{dataObjectMapped?.reposiable_name}</td> */}
                          <td>
                            <Link
                              to={"/admin/myorder/" + dataObjectMapped.myID}
                            >
                              จัดการ
                            </Link>
                          </td>
                        </tr>
                      );
                    } else if (
                      new Date(
                        `${
                          selectYear.year
                            ? selectYear.year
                            : new Date().getFullYear()
                        }-${selectMonth.month}`
                      )
                        .toISOString()
                        .slice(0, 7) ===
                      new Date(dataObjectMapped.timeStamp)
                        .toISOString()
                        .slice(0, 7)
                    ) {
                      return (
                        <tr key={dataObjectMapped.orderID}>
                          <td>{dataObjectMapped.timeStamp}</td>
                          <td>{dataObjectMapped.orderID}</td>
                          {/* <td>{dataObjectMapped.customerID}</td> */}
                          <td>{dataObjectMapped.shippingAddress.fullname}</td>
                          <td>{dataObjectMapped?.shippingAddress.phone}</td>
                          <td>{dataObjectMapped?.itemsList?.length || 0}</td>
                          <td>{dataObjectMapped.totalCost}</td>
                          <td>
                            <div
                              className={`${styles.statusAdmin} ${styles.statusCenter} ${statusOrder}`}
                            >
                              {dataObjectMapped.status}
                            </div>
                          </td>
                          <td>{dataObjectMapped.shippingNumber}</td>
                          {/* <td>{dataObjectMapped?.reposiable_name}</td> */}
                          <td>
                            <Link
                              to={"/admin/myorder/" + dataObjectMapped.myID}
                            >
                              จัดการ
                            </Link>
                          </td>
                        </tr>
                      );
                    }
                  } else {
                    return null;
                  }
                } else {
                  return null;
                }
              });
            })()}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};

export default AdminComponent;
