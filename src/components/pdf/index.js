import React, { useRef, useState, useEffect, createRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import styles from './index.module.scss'
import axios from 'axios'
import logo from './logo.svg'
import qr from './qr.svg'
import QRCode from 'qrcode.react'

const WhyComponentToPrint = (data) => {
  console.log('data', data)
  return (
    <div>
      <div className={styles.page}>
        <div className={styles.subpage}>
          {/* Head Page */}
          <div className={styles.row} style={{ alignItems: 'center', justifyContent: 'space-between' }}>
            <img src={logo} width='200' style={{ marginLeft: '-25px'}} />
            <h3 className={styles.headPage}>ออเดอร์หมายเลข #{data.orderID}</h3>
            {/* <img src={qr} width='100' /> */}
            <QRCode value={`http://localhost:3000/myorder/${data.id}`} size={100} />
          </div>
        
          <h3 style={{margin: '20px 0 10px' }}>ผู้ส่ง / FROM</h3>
          <div className={`${styles.row} ${styles.box}`}>
            <div className={styles.col50}>
              <p><b>ชื่อ:</b> Million Polyseal Official</p>
              <p><b>ที่อยู่:</b> 81/258-9 ซอยเพชรเกษม 116 ถนนเพชรเกษม แขวงหนองค้างพลู, เขตหนองแขม, จังหวัด กรุงเทพมหานคร 10160</p>
            </div>
            <div className={styles.col50}>
              <p><b>เบอร์โทรศัพท์:</b> 0896460259</p>
              <p><b>อีเมล:</b> stickerwish.th@gmail.com </p>
            </div>
          </div>
       
          <h3 style={{margin: '20px 0 10px' }}>ผู้รับ / TO</h3>
          <div className={`${styles.row} ${styles.box}`}>
            <div className={styles.col50}>
              <p><b>ชื่อ:</b> {data.addressCustomer.fullname}</p>
              <p><b>ที่อยู่:</b> {data.addressCustomer.address} {data.addressCustomer.county} {data.addressCustomer.city} {data.addressCustomer.provice} {data.addressCustomer.zip}</p>
            </div>
            <div className={styles.col50}>
              <p><b>เบอร์โทรศัพท์:</b> {data.addressCustomer.phone}</p>
              <p><b>อีเมล:</b> {data.addressCustomer.email}</p>
            </div>
          </div>
       
          <h3 style={{margin: '20px 0 10px' }}>ออเดอร์หมายเลข #{data.orderID}</h3>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>รายการ</th>
                <th>รายละเอียด</th>
                <th>จำนวน</th>
              </tr>
            </thead>
            <tbody>
              {data.data.map((data) => (
                <tr>
                  <td>{data.index}</td>
                  <td>{data.itemID}</td>
                  <td>{data.name}</td>
                  <td>{data.qty ? data.qty + ' ชิ้น' : ' '}</td>
                </tr>
              ))}
            </tbody>
          </table>
        
          <h3 style={{margin: '20px 0 10px' }}>หมายเหตุ</h3>
          <div className={`${styles.row} ${styles.box}`}>
            <p>การจัดส่งแบบ: ลงทะเบียน</p>
          </div>
       
        </div>
      </div>
    </div>
  )
}

/**
 * This is a wrapper, as the react-to-printer requires a component
 * in order to render and print.
 * There might be other/better ways of doing this, but for now, this
 * works.
 * NOTE: If no such wrapper, react-to-print complains about:
 * "work only Class based components"
 */
class FunctionalComponentWrapper extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return <WhyComponentToPrint {...this.props} />
  }
}

export const PDF = (props) => {
  const componentRef = useRef()
  const [data, setData] = useState([])

  const [id, setID] = useState('')
  const [orderID, setOrderID] = useState('')
  const [addressCustomer, setAddressCustomer] = useState({})
  const [lineItems, setLineItems] = useState([])

  // Fetch Docuement Receive
  useEffect(() => {
    
    axios.get(`https://asia-east2-digitalwish-sticker.cloudfunctions.net/orders/${props.match.params.id}`, {
      headers: {
        Authorization:  'Basic ZGlnaXRhbHdpc2g6SzZDd2N3dkF6QVNDRGZWNg=='
      }
     })
      .then(res => {
          setID(props.match.params.id)
          setOrderID(res.data.orderID)
          setAddressCustomer(res.data.shippingAddress)
          const itemListArray = []
          res.data.itemsList.map((data, index) => {
            let indexPlus = index+1
            const mapper = {
              index: indexPlus,
              itemID: res.data.orderID.replace("DW", "IT") + '/' + indexPlus,
              name: `${data.material} - ${data.coat} - ขนาด ${data.width}x${data.height} cm.`,
              qty: data.units
            }
            itemListArray.push(mapper)
          })
          setLineItems(itemListArray);
      }).catch(function (err) {
          console.log("err", err)
      })

  }, [props.match.params.id])

  const handlePrint = useReactToPrint({
    content: () => {
      return componentRef.current
    },
  })

  useEffect(() => {
    const test = [...lineItems]
    for (let i = 0; i < 11 - lineItems.length; i++) {
      test.push({
        index: '',
        itemID: '',
        name: '',
        qty: ''
      })
    }
    setData(test)
  }, [lineItems])

  return (
    <>
      <button onClick={handlePrint}>Print this out!</button>
      <FunctionalComponentWrapper
        ref={componentRef}
        data={data}
        id={id}
        orderID={orderID}
        addressCustomer={addressCustomer}
      />
    </>
  )
}