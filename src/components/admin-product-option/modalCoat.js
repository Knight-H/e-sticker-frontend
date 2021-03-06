import React, { useEffect } from "react";
import styles from "./index.module.scss";
import { Field } from "formik";
import axios from "axios";
import firebaseApp from "../../firebase/index.js";

const ModalShipping = ({ values, setFieldValue }) => {
  useEffect(() => {
    if (values.coatingID || values.coatingID === 0) {
      if (
        values.material[values.materialSelected].coating_list[values.coatingID]
      ) {
        setFieldValue(
          `${values.modalCoating}Kind`,
          values.material[values.materialSelected].coating_list[
            values.coatingID
          ].name,
          false
        );
        setFieldValue(
          `${values.modalCoating}Description`,
          values.material[values.materialSelected].coating_list[
            values.coatingID
          ].description,
          false
        );
        setFieldValue(
          `${values.modalCoating}File`,
          values.material[values.materialSelected].coating_list[
            values.coatingID
          ].imgUrl,
          false
        );
      }
    } else {
      setFieldValue(`${values.modalCoating}Kind`, "", false);
      setFieldValue(`${values.modalCoating}Description`, "", false);
      setFieldValue(`${values.modalCoating}File`, "", false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.coatingID, values.modalCoating]);

  const addOptionCoating = () => {
    setFieldValue("loading", true, false);
    let data = values[`${values.modalCoating}Kind`];
    const storageRef = firebaseApp.storage().ref();
    let timeStamp = new Date().toISOString().slice(0, 10);
    // console.log(values[`${values.modalCoating}File`])
    if (values[`${values.modalCoating}File`]) {
      storageRef
        .child(
          `productOptions/${timeStamp}-${
            values[`${values.modalCoating}File`].name
          }`
        )
        .put(values[`${values.modalCoating}File`])
        .then((snapshot) => {
          snapshot.ref.getDownloadURL().then((url) => {
            // console.log(url)
            let dataPost = {
              imgUrl: url,
              description: values[`${values.modalCoating}Description`],
              name: data,
            };
            values.material[values.materialSelected].coating_list.push(
              dataPost
            );

            let dataPostNew = {
              material_list: values.material,
            };
            axios
              .put(
                `https://asia-east2-digitalwish-sticker.cloudfunctions.net/productOptions/h03eqnOmkdOFxZqJxRWy`,
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
                setFieldValue("modalCoating", "", false);
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
        description: values[`${values.modalCoating}Description`],
        name: data,
      };
      values.material[values.materialSelected].coating_list.push(dataPost);

      let dataPostNew = {
        material_list: values.material,
      };
      axios
        .put(
          `https://asia-east2-digitalwish-sticker.cloudfunctions.net/productOptions/h03eqnOmkdOFxZqJxRWy`,
          dataPostNew,
          {
            headers: {
              Authorization: "Basic ZGlnaXRhbHdpc2g6SzZDd2N3dkF6QVNDRGZWNg==",
            },
          }
        )
        .then((res) => {
          setFieldValue("fetch", true, false);
          setFieldValue("modalCoating", "", false);
          setFieldValue("loading", false, false);
        })
        .catch(function (err) {
          setFieldValue("loading", false, false);
          console.log("err", err);
        });
    }
  };

  const editOptionCoating = () => {
    setFieldValue("loading", true, false);
    const storageRef = firebaseApp.storage().ref();
    let timeStamp = new Date().toISOString().slice(0, 10);
    // console.log(values[`${values.modalCoating}File`])
    if (values[`${values.modalCoating}File`]) {
      if (typeof values[`${values.modalCoating}File`] !== "object") {
        values.material[values.materialSelected].coating_list[
          values.coatingID
        ].name = values[`${values.modalCoating}Kind`];
        values.material[values.materialSelected].coating_list[
          values.coatingID
        ].description = values[`${values.modalCoating}Description`];
        values.material[values.materialSelected].coating_list[
          values.coatingID
        ].imgUrl = values[`${values.modalCoating}File`];

        let dataPost = {
          material_list: values.material,
        };
        // console.log(dataPost)
        axios
          .put(
            `https://asia-east2-digitalwish-sticker.cloudfunctions.net/productOptions/h03eqnOmkdOFxZqJxRWy`,
            dataPost,
            {
              headers: {
                Authorization: "Basic ZGlnaXRhbHdpc2g6SzZDd2N3dkF6QVNDRGZWNg==",
              },
            }
          )
          .then((res) => {
            setFieldValue("fetch", true, false);
            setFieldValue("modalCoating", "", false);
            setFieldValue("loading", false, false);
          })
          .catch(function (err) {
            console.log("err", err);
            setFieldValue("loading", false, false);
          });
      } else {
        storageRef
          .child(
            `productOptions/${timeStamp}-${
              values[`${values.modalCoating}File`].name
            }`
          )
          .put(values[`${values.modalCoating}File`])
          .then((snapshot) => {
            snapshot.ref.getDownloadURL().then((url) => {
              values.material[values.materialSelected].coating_list[
                values.coatingID
              ].name = values[`${values.modalCoating}Kind`];
              values.material[values.materialSelected].coating_list[
                values.coatingID
              ].description = values[`${values.modalCoating}Description`];
              values.material[values.materialSelected].coating_list[
                values.coatingID
              ].imgUrl = url;

              let dataPost = {
                material_list: values.material,
              };
              // console.log(dataPost)
              axios
                .put(
                  `https://asia-east2-digitalwish-sticker.cloudfunctions.net/productOptions/h03eqnOmkdOFxZqJxRWy`,
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
                  setFieldValue("modalCoating", "", false);
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
      values.material[values.materialSelected].coating_list[
        values.coatingID
      ].name = values[`${values.modalCoating}Kind`];
      values.material[values.materialSelected].coating_list[
        values.coatingID
      ].description = values[`${values.modalCoating}Description`];
      values.material[values.materialSelected].coating_list[
        values.coatingID
      ].imgUrl = "";

      let dataPost = {
        material_list: values.material,
      };
      console.log(dataPost);
      axios
        .put(
          `https://asia-east2-digitalwish-sticker.cloudfunctions.net/productOptions/h03eqnOmkdOFxZqJxRWy`,
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
          setFieldValue("modalCoating", "", false);
        })
        .catch(function (err) {
          setFieldValue("loading", false, false);
          console.log("err", err);
        });
    }
  };

  const removeOptionCoating = () => {
    setFieldValue("loading", true, false);
    values.material[values.materialSelected].coating_list.splice(
      values.coatingID,
      1
    );
    // console.log(values.material)
    let dataPost = {
      material_list: values.material,
    };

    axios
      .put(
        `https://asia-east2-digitalwish-sticker.cloudfunctions.net/productOptions/h03eqnOmkdOFxZqJxRWy`,
        dataPost,
        {
          headers: {
            Authorization: "Basic ZGlnaXRhbHdpc2g6SzZDd2N3dkF6QVNDRGZWNg==",
          },
        }
      )
      .then((res) => {
        setFieldValue("fetch", true, false);
        setFieldValue("modalCoating", "", false);
        setFieldValue("loading", false, false);
      })
      .catch(function (err) {
        setFieldValue("loading", false, false);
        console.log("err", err);
      });
  };

  const handleChangeImgCoating = (event) => {
    if (event.target.files) {
      setFieldValue(`${values.modalCoating}File`, event.target.files[0], false);
    }
  };

  return (
    <div
      className={styles.modal}
      style={{ display: values.modalCoating ? "block" : "none" }}
    >
      <div className={styles.modalContent}>
        <div>
          <span
            className={styles.close}
            onClick={() => {
              setFieldValue("modalCoating", "", false);
              setFieldValue("coatingID", "", false);
            }}
          >
            &times;
          </span>
        </div>
        <div className={styles.rowInModal}>
          <Field
            name={`${values.modalCoating}Kind`}
            className={styles.text}
            placeholder="รูปแบบ"
          />
          <Field
            name={`${values.modalCoating}Description`}
            className={styles.text}
            placeholder="รายละเอียด"
          />
        </div>
        <div className={styles.rowInModal}>
          <input
            type="file"
            id="fileCoating"
            onChange={(e) => handleChangeImgCoating(e)}
          />
          <label
            for="fileCoating"
            className={`${styles.buttonUploadFile} ${styles.label}`}
          >
            อัพโหลดไฟล์
          </label>
        </div>
        <div className={`${styles.floatRight} ${styles.rowInModal}`}>
          {values.coatingID || values.coatingID === 0 ? (
            <button
              type="button"
              className={styles.removeOption}
              onClick={() => removeOptionCoating()}
            >
              ลบ
            </button>
          ) : null}
          <button
            type="button"
            className={styles.addOption}
            onClick={() =>
              values.coatingID || values.coatingID === 0
                ? editOptionCoating()
                : addOptionCoating()
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
