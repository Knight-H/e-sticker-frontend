// TEST `MultistepWizard`
// https://github.com/formium/formik/blob/master/examples/MultistepWizard.js
// https://medium.com/javascript-in-plain-english/how-to-create-a-multi-step-form-with-react-hooks-53a85efdff62
import React, { useEffect } from "react";

import Order1ProductConfigComponent from "./../order-1-product-config";
import UploadFileComponent from "./../upload-file";
import axios from "axios";
import { withFormik, useFormikContext } from 'formik';
import { auth } from '../../firebase/index.js';
import firebaseApp from '../../firebase/index.js';

// Wizard is a single Formik instance whose children are each page of the
// multi-step form. The form is submitted on each forward transition (can only
// progress with valid input), whereas a backwards step is allowed with
// incomplete data. A snapshot of form state is used as initialValues after each
// transition. Each page has an optional submit handler, and the top-level
// submit is called when the final page is submitted.
const Wizard = ({ children, initialValues, onSubmit }) => {
  const { values, setFieldValue } = useFormikContext();

  const steps = React.Children.toArray(children);
  const step = steps[values.stepProgress];

  useEffect(() => {
    axios.get(`https://asia-east2-digitalwish-sticker.cloudfunctions.net/productOptions/HOnTVwWrX27N7tql4WQE`)
      .then(res => {
        // console.log("res.data[0]", res.data.shape_list)
        setFieldValue("checkLoadOption", true, false);
        setFieldValue("optionShape", res.data.shape_list, false);
        // setFieldValue("optionMaterial", res.data[0].material, false);
        // setFieldValue("optionCuttingList", res.data[0].cuttingList, false);
        // setFieldValue("optionUnitOptions", res.data[0].unitOptions, false);

        // setFieldValue("heightMax", res.data[0].heightMax, false);
        // setFieldValue("heightMin", res.data[0].heightMin, false);
        // setFieldValue("widthMax", res.data[0].widthMax, false);
        // setFieldValue("widthMin", res.data[0].widthMin, false);
      }).catch(function (err) {
        console.log("err", err)
      })
    axios.get(`https://asia-east2-digitalwish-sticker.cloudfunctions.net/productOptions/h03eqnOmkdOFxZqJxRWy`)
      .then(res => {
        // console.log("res.data[0]", res.data)
        setFieldValue("optionMaterial", res.data.material_list, false);
      }).catch(function (err) {
        console.log("err", err)
      })
  }, []);

  return (
    <>
      {step}
    </>
  );
};

const WizardStep = ({ children }) => children;

const AppComponent = () => {
  return (
    <Wizard>
      <WizardStep>
        <Order1ProductConfigComponent />
      </WizardStep>
      <WizardStep>
        <UploadFileComponent />
      </WizardStep>
    </Wizard>
  );
};

const EnhancedAppComponent = withFormik({
  mapPropsToValues: (props) => ({
    showImageUrl: 'https://firebasestorage.googleapis.com/v0/b/digitalwish-sticker.appspot.com/o/original.png?alt=media&token=05a8becb-86a4-4f0c-bd71-d57bb9a82c2b',

    checkLoadOption: false,
    optionShape: [],
    optionMaterial: [],
    optionCoat: [],
    optionCuttingList: [],
    optionUnitOptions: [],

    stepProgress: 0,
    // Step one
    shape: 0,
    material: 0,
    coat: 0,
    cutting: 0,
    width: '',
    height: '',
    units: 0,
    price: 0,

    // Step two
    approvalStricker: 0,
    isCheckUploadFileStricker: 0,
    uploadFileStricker: '',
    uploadFileStrickerForFirebase: [],
    comment: '',
  }),
  validate: values => {
    const errors = {};

    // Step 1
    if (values.stepProgress === 0) {
      if (!values.shape) {
        errors.shape = "*กรุณาระบุ"
      }
      if (!values.material) {
        errors.material = "*กรุณาระบุ"
      }
      if (!values.coat) {
        errors.coat = "*กรุณาระบุ"
      }
      if (!values.cutting) {
        errors.cutting = "*กรุณาระบุ"
      }
      if (!values.width === "") {
        errors.width = "*กรุณาระบุ"
      }
      if (values.width > values.widthMax) {
        errors.width = "*ขนาดใหญ่เกิน"
      }
      if (values.width < values.widthMin) {
        errors.width = "*ขนาดเล็กเกิน"
      }
      if (!values.height === "") {
        errors.height = "*กรุณาระบุ"
      }
      if (values.height > values.heightMax) {
        errors.height = "*ขนาดใหญ่เกิน"
      }
      if (values.height < values.heightMin) {
        errors.height = "*ขนาดเล็กเกิน"
      }
      if (!values.units) {
        errors.units = "*กรุณาระบุ"
      }
    } else if (values.stepProgress === 1) {
      // Step two
      if (!values.approvalStricker) {
        errors.approvalStricker = "*กรุณาระบุ"
      }
      if (!values.uploadFileStricker) {
        errors.uploadFileStricker = "*กรุณาระบุ"
      }
    }

    return errors;
  },
  handleSubmit: (values, { setFieldValue, props }) => {
    if (values.stepProgress === 0) {
      setFieldValue("stepProgress", 1, false);
    } else {
      const storageRef = firebaseApp.storage().ref();
      let timeStamp = new Date().toISOString().slice(0, 10)

      auth.onAuthStateChanged(user => {
        if (user) {// User is signed in.

          // FETCH CART CHECK ITEM
          axios.get(`https://asia-east2-digitalwish-sticker.cloudfunctions.net/cart?customerID=${user.uid}`)
            .then(res => {
              console.log("res.data[0].myID", res.data[0]);

              // API PUT IF HAVE ORDER IN
              if (res.data.length) {
                console.log("have item");

                storageRef.child(`${user.uid}/${timeStamp}-${values.uploadFileStrickerForFirebase.name}`).put(values.uploadFileStrickerForFirebase)
                  .then((snapshot) => {
                    snapshot.ref.getDownloadURL().then((url) => {
                      let data = {
                        "approveMethod": values.approvalStricker,
                        "coat": values.coat,
                        "cutting": values.cutting,
                        "comment": values.comment,
                        "units": values.units,
                        "material": values.material,
                        "width": values.width,
                        "price": values.price,
                        "shape": values.shape,
                        "height": values.height,

                        "messages": [
                          {
                            "type": "file",
                            "content": `${url}`,
                            "info": `${values.uploadFileStrickerForFirebase.name}`,
                            "by": "customer"
                          }
                        ]
                      };
                      res.data[0].itemsList.push(data);

                      let cloneRes = { ...res.data[0] }
                      delete cloneRes.myID;

                      console.log('res.data[0]', res.data[0])

                      axios.put(`https://asia-east2-digitalwish-sticker.cloudfunctions.net/cart/${res.data[0].myID}`, cloneRes)
                        .then(res => {
                          console.log("res", res);
                          props.history.push("/checkout")
                        }).catch(function (err) {
                          console.log("err", err.response)
                        })
                    });
                  }
                  );

              } else {
                console.log("not have item");
                // API POST IF NOT HAVE ITEM IN CART

                storageRef.child(`${user.uid}/${timeStamp}-${values.uploadFileStrickerForFirebase.name}`).put(values.uploadFileStrickerForFirebase)
                  .then((snapshot) => {
                    snapshot.ref.getDownloadURL().then((url) => {
                      let data = {

                        "itemsList": [
                          {
                            "approveMethod": values.approvalStricker,
                            "coat": values.coat,
                            "cutting": values.cutting,
                            "comment": values.comment,
                            "units": values.units,
                            "material": values.material,
                            "width": values.width,
                            "price": values.price,
                            "shape": values.shape,
                            "height": values.height,

                            "messages": [
                              {
                                "type": "file",
                                "content": `${url}`,
                                "info": `${values.uploadFileStrickerForFirebase.name}`,
                                "by": "customer"
                              }
                            ]

                          }
                        ],
                        "customerID": user.uid,
                      };

                      console.log("data", data)
                      axios.post(`https://asia-east2-digitalwish-sticker.cloudfunctions.net/cart`, data)
                        .then(res => {
                          console.log("res", res);
                          props.history.push("/checkout")
                        }).catch(function (err) {
                          console.log("err", err)
                        })
                    });
                  }
                  );

              }
            }).catch(function (err) {
              console.log("err", err)
            })
        } else {
          console.log("mode guest");
          var cartLocal = JSON.parse(localStorage.getItem("cart"));
          console.log("cartLocal", cartLocal)
          if (cartLocal) {
            console.log("have item");
            storageRef.child(`guest/${timeStamp}-${values.uploadFileStrickerForFirebase.name}`).put(values.uploadFileStrickerForFirebase)
              .then((snapshot) => {
                snapshot.ref.getDownloadURL().then((url) => {
                  let data = {
                    "approveMethod": values.approvalStricker,
                    "coat": values.coat,
                    "cutting": values.cutting,
                    "comment": values.comment,
                    "units": values.units,
                    "material": values.material,
                    "width": values.width,
                    "price": values.price,
                    "shape": values.shape,
                    "height": values.height,

                    "messages": [
                      {
                        "type": "file",
                        "content": `${url}`,
                        "info": `${values.uploadFileStrickerForFirebase.name}`,
                        "by": "customer"
                      }
                    ]
                  };
                  cartLocal.itemsList.push(data);
                  console.log('cartLocal', cartLocal)
                  localStorage.setItem("cart", JSON.stringify(cartLocal));
                  props.history.push("/checkout")
                });
              }
              );

          } else {
            console.log("not have item");
            storageRef.child(`guest/${timeStamp}-${values.uploadFileStrickerForFirebase.name}`).put(values.uploadFileStrickerForFirebase)
              .then((snapshot) => {
                console.log(">>>>")
                snapshot.ref.getDownloadURL().then((url) => {
                  console.log(">>>>>2")
                  let data = {

                    "itemsList": [
                      {
                        "approveMethod": values.approvalStricker,
                        "coat": values.coat,
                        "cutting": values.cutting,
                        "comment": values.comment,
                        "units": values.units,
                        "material": values.material,
                        "width": values.width,
                        "price": values.price,
                        "shape": values.shape,
                        "height": values.height,

                        "messages": [
                          {
                            "type": "file",
                            "content": `${url}`,
                            "info": `${values.uploadFileStrickerForFirebase.name}`,
                            "by": "customer"
                          }
                        ]

                      }
                    ],
                    "customerID": "guest",
                  };
                  localStorage.setItem("cart", JSON.stringify(data));
                  console.log("localStorage.getItem(cart)", JSON.parse(localStorage.getItem("cart")))
                  props.history.push("/checkout")
                })
              })
              .catch(function (err) {
                console.log("err", err)
              })
          }
          return;
        }
      });
    }
  }
})(AppComponent);

export default EnhancedAppComponent;