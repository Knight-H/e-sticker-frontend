import React, { useEffect } from "react";
import styles from "./index.module.scss";
import { Field } from "formik";
import axios from "axios";
import firebaseApp from "../../firebase/index.js";

const ModalShipping = ({ values, setFieldValue }) => {
  useEffect(() => {
    if (values.shapeID || values.shapeID === 0) {
      setFieldValue(
        `${values.modalShape}Kind`,
        values.shape[values.shapeID].name,
        false
      );
      setFieldValue(
        `${values.modalShape}File`,
        values.shape[values.shapeID].imgUrl,
        false
      );
    } else {
      setFieldValue(`${values.modalShape}Kind`, "", false);
      setFieldValue(`${values.modalShape}File`, "", false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.shapeID]);

  const addOptionShape = () => {
    setFieldValue("loading", true, false);
    let data = values[`${values.modalShape}Kind`];
    const storageRef = firebaseApp.storage().ref();
    let timeStamp = new Date().toISOString().slice(0, 10);

    if (values[`${values.modalShape}File`]) {
      storageRef
        .child(
          `productOptions/${timeStamp}-${
            values[`${values.modalShape}File`].name
          }`
        )
        .put(values[`${values.modalShape}File`])
        .then((snapshot) => {
          snapshot.ref.getDownloadURL().then((url) => {
            console.log(url);
            let dataPost = {
              imgUrl: url,
              name: data,
            };
            values.shape.push(dataPost);

            let dataPostNew = {
              shape_list: values.shape,
            };
            axios
              .put(
                `https://asia-east2-digitalwish-sticker.cloudfunctions.net/productOptions/HOnTVwWrX27N7tql4WQE`,
                dataPostNew,
                {
                  headers: {
                    Authorization:
                      "Basic ZGlnaXRhbHdpc2g6SzZDd2N3dkF6QVNDRGZWNg==",
                  },
                }
              )
              .then((res) => {
                setFieldValue("fetch", true, false);
                setFieldValue("modalShape", "", false);
                setFieldValue("loading", false, false);
              })
              .catch(function (err) {
                setFieldValue("loading", false, false);
                console.log("err", err);
              });
          });
        });
    } else {
      let dataPost = {
        imgUrl: "",
        name: data,
      };
      values.shape.push(dataPost);

      let dataPostNew = {
        shape_list: values.shape,
      };
      axios
        .put(
          `https://asia-east2-digitalwish-sticker.cloudfunctions.net/productOptions/HOnTVwWrX27N7tql4WQE`,
          dataPostNew,
          {
            headers: {
              Authorization: "Basic ZGlnaXRhbHdpc2g6SzZDd2N3dkF6QVNDRGZWNg==",
            },
          }
        )
        .then((res) => {
          setFieldValue("fetch", true, false);
          setFieldValue("loading", false, false);
          setFieldValue("modalShape", "", false);
        })
        .catch(function (err) {
          setFieldValue("loading", false, false);
          console.log("err", err);
        });
    }
  };

  const editOptionShape = () => {
    setFieldValue("loading", true, false);
    const storageRef = firebaseApp.storage().ref();
    let timeStamp = new Date().toISOString().slice(0, 10);
    console.log(values[`${values.modalShape}File`]);
    if (values[`${values.modalShape}File`]) {
      if (typeof values[`${values.modalShape}File`] !== "object") {
        values.shape[values.shapeID].name = values[`${values.modalShape}Kind`];
        values.shape[values.shapeID].imgUrl =
          values[`${values.modalShape}File`];

        let dataPost = {
          shape_list: values.shape,
        };
        console.log(dataPost);
        axios
          .put(
            `https://asia-east2-digitalwish-sticker.cloudfunctions.net/productOptions/HOnTVwWrX27N7tql4WQE`,
            dataPost,
            {
              headers: {
                Authorization: "Basic ZGlnaXRhbHdpc2g6SzZDd2N3dkF6QVNDRGZWNg==",
              },
            }
          )
          .then((res) => {
            setFieldValue("fetch", true, false);
            setFieldValue("loading", false, false);
            setFieldValue("modalShape", "", false);
          })
          .catch(function (err) {
            console.log("err", err);
            setFieldValue("loading", false, false);
          });
      } else {
        storageRef
          .child(
            `productOptions/${timeStamp}-${
              values[`${values.modalShape}File`].name
            }`
          )
          .put(values[`${values.modalShape}File`])
          .then((snapshot) => {
            snapshot.ref.getDownloadURL().then((url) => {
              values.shape[values.shapeID].name =
                values[`${values.modalShape}Kind`];
              values.shape[values.shapeID].imgUrl = url;

              let dataPost = {
                shape_list: values.shape,
              };
              console.log(dataPost);
              axios
                .put(
                  `https://asia-east2-digitalwish-sticker.cloudfunctions.net/productOptions/HOnTVwWrX27N7tql4WQE`,
                  dataPost,
                  {
                    headers: {
                      Authorization:
                        "Basic ZGlnaXRhbHdpc2g6SzZDd2N3dkF6QVNDRGZWNg==",
                    },
                  }
                )
                .then((res) => {
                  setFieldValue("fetch", true, false);
                  setFieldValue("modalShape", "", false);
                  setFieldValue("loading", false, false);
                })
                .catch(function (err) {
                  setFieldValue("loading", false, false);
                  console.log("err", err);
                });
            });
          });
      }
    } else {
      values.shape[values.shapeID].name = values[`${values.modalShape}Kind`];
      values.shape[values.shapeID].imgUrl = "";

      let dataPost = {
        shape_list: values.shape,
      };
      console.log(dataPost);
      axios
        .put(
          `https://asia-east2-digitalwish-sticker.cloudfunctions.net/productOptions/HOnTVwWrX27N7tql4WQE`,
          dataPost,
          {
            headers: {
              Authorization: "Basic ZGlnaXRhbHdpc2g6SzZDd2N3dkF6QVNDRGZWNg==",
            },
          }
        )
        .then((res) => {
          setFieldValue("fetch", true, false);
          setFieldValue("loading", false, false);
          setFieldValue("modalShape", "", false);
        })
        .catch(function (err) {
          setFieldValue("loading", false, false);
          console.log("err", err);
        });
    }
  };

  const removeOptionShape = () => {
    setFieldValue("loading", true, false);
    values.shape.splice(values.shapeID, 1);
    console.log(values.shape);
    let dataPost = {
      shape_list: values.shape,
    };

    axios
      .put(
        `https://asia-east2-digitalwish-sticker.cloudfunctions.net/productOptions/HOnTVwWrX27N7tql4WQE`,
        dataPost,
        {
          headers: {
            Authorization: "Basic ZGlnaXRhbHdpc2g6SzZDd2N3dkF6QVNDRGZWNg==",
          },
        }
      )
      .then((res) => {
        setFieldValue("fetch", true, false);
        setFieldValue("modalShape", "", false);
        setFieldValue("loading", false, false);
      })
      .catch(function (err) {
        console.log("err", err);
        setFieldValue("loading", false, false);
      });
  };

  const handleChangeImgShape = (event) => {
    if (event.target.files) {
      setFieldValue(`${values.modalShape}File`, event.target.files[0], false);
    }
  };

  return (
    <div
      className={styles.modal}
      style={{ display: values.modalShape ? "block" : "none" }}
    >
      <div className={styles.modalContent}>
        <div>
          <span
            className={styles.close}
            onClick={() => {
              setFieldValue("modalShape", "", false);
              setFieldValue("shapeID", "", false);
            }}
          >
            &times;
          </span>
        </div>
        <div className={styles.rowInModal}>
          <Field
            name={`${values.modalShape}Kind`}
            className={styles.text}
            placeholder="รูปแบบ"
          />
        </div>
        <div className={styles.rowInModal}>
          <input
            type="file"
            id="file"
            onChange={(e) => handleChangeImgShape(e)}
          />
          <label
            for="file"
            className={`${styles.buttonUploadFile} ${styles.label}`}
          >
            อัพโหลดไฟล์
          </label>
        </div>
        <div className={`${styles.floatRight} ${styles.rowInModal}`}>
          {values.shapeID || values.shapeID === 0 ? (
            <button
              type="button"
              className={styles.removeOption}
              onClick={() => removeOptionShape()}
            >
              ลบ
            </button>
          ) : null}
          <button
            type="button"
            className={styles.addOption}
            onClick={() =>
              values.shapeID || values.shapeID === 0
                ? editOptionShape()
                : addOptionShape()
            }
          >
            บันทึก
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalShipping;
