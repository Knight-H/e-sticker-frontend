// TEST `MultistepWizard`
// https://github.com/formium/formik/blob/master/examples/MultistepWizard.js
// https://medium.com/javascript-in-plain-english/how-to-create-a-multi-step-form-with-react-hooks-53a85efdff62
import React, { useEffect } from "react";

import Order1ShapeConfigComponent from "./../order-1-shape-config";
import Order1MaterialConfigComponent from "./../order-1-material-config";
import Order1CoatConfigComponent from "./../order-1-coat-config";
import Order1AmountConfigComponent from "./../order-1-amount-config";
import Order2UploadFileConfigComponent from "./../order-2-upload-file-config";
// import UploadFileComponent from "./../upload-file";
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
    setFieldValue("loading", true, false);
    axios.get(`https://asia-east2-digitalwish-sticker.cloudfunctions.net/productOptions/HOnTVwWrX27N7tql4WQE`,{
      headers: {
        Authorization:  'Basic ZGlnaXRhbHdpc2g6SzZDd2N3dkF6QVNDRGZWNg=='
      }
     })
      .then(res => {
        setFieldValue("checkLoadOption", true, false);
        setFieldValue("optionShape", res.data.shape_list, false);

        axios.get(`https://asia-east2-digitalwish-sticker.cloudfunctions.net/productOptions/h03eqnOmkdOFxZqJxRWy`,{
          headers: {
            Authorization:  'Basic ZGlnaXRhbHdpc2g6SzZDd2N3dkF6QVNDRGZWNg=='
          }
         })
          .then(res => {
            // console.log("res.data[0]", res.data)
            setFieldValue("optionMaterial", res.data.material_list, false);

            axios.get(`https://asia-east2-digitalwish-sticker.cloudfunctions.net/productOptions/Rf8b0x8ktshu0y0VGzyV`, {
              headers: {
                Authorization:  'Basic ZGlnaXRhbHdpc2g6SzZDd2N3dkF6QVNDRGZWNg=='
              }
             })
              .then(res => {
                // console.log("res.data[0]", res.data.count_list)
                setFieldValue("optionUnitOptions", res.data.count_list, false);
                setFieldValue("loading", false, false);
              }).catch(function (err) {
                console.log("err", err)
                setFieldValue("loading", false, false);

              })
          }).catch(function (err) {
            console.log("err", err)
            setFieldValue("loading", false, false);

          })

      }).catch(function (err) {
        console.log("err", err)
        setFieldValue("loading", false, false);

      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (values.material === "กระดาษอาร์ท") {
      setFieldValue("stepProgress", 3, true);
      setFieldValue("coat", "ไม่เคลือบ", true);
      setFieldValue("index_2", "0", true);

      setFieldValue("fixed_cost", values.optionMaterial[values.material_index].coating_list[0].price.fixed_cost, true);
      setFieldValue("variable_cost_1", values.optionMaterial[values.material_index].coating_list[0].price.variable_cost_1, true);
      setFieldValue("variable_cost_2", values.optionMaterial[values.material_index].coating_list[0].price.variable_cost_2, true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.material]);

  return (
    <>
      {step}
    </>
  );
};

const WizardStep = ({ children }) => children;

const AppComponent = () => {
  const { values } = useFormikContext();
  return (
    <>
    <div class={`loader loader-default ${values.loading ? 'is-active' : ''}`}></div>
    <Wizard>
      <WizardStep>
        <Order1ShapeConfigComponent />
      </WizardStep>
      <WizardStep>
        <Order1MaterialConfigComponent />
      </WizardStep>
      <WizardStep>
        <Order1CoatConfigComponent />
      </WizardStep>
      <WizardStep>
        <Order1AmountConfigComponent />
      </WizardStep>
      <WizardStep>
        <Order2UploadFileConfigComponent />
      </WizardStep>
    </Wizard>
    </>
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
    shape_index: 0,
    material_index: 0,
    coat_index: 0,
    cutting: 0,
    width: '',
    height: '',
    units: 0,
    price: 0,

    fixed_cost: 0,
    variable_cost_1: 0,
    variable_cost_2: 0,

    // Step two
    approvalStricker: "รออนุมัติแบบ",
    isCheckUploadFileStricker: 0,
    uploadFileStricker: '',
    uploadFileStrickerForFirebase: [],
    comment: '',
    loading: false
  }),
  validate: (values, { setFieldValue }) => {
    const errors = {};

    // Step 1
    if (values.stepProgress === 0) {
      if (!values.shape) {
        errors.shape = "*กรุณาระบุ"
      }
    }
    // Step 2
    if (values.stepProgress === 1) {
      if (!values.material) {
        errors.material = "*กรุณาระบุ"
      }
    }
    // Step 3
    if (values.stepProgress === 2) {
      if (!values.coat) {
        errors.coat = "*กรุณาระบุ"
      }
    }
    // Step 4
    if (values.stepProgress === 3) {
      if (!values.width) {
        errors.width = "*กรุณาระบุ"
      }
      if (!values.height) {
        errors.height = "*กรุณาระบุ"
      }
      if (!values.units) {
        errors.units = "*กรุณาระบุ"
      }
    }
    // Step 5
    if (values.stepProgress === 4) {
      if (!values.uploadFileStricker) {
        errors.uploadFileStricker = "*กรุณาระบุ"
      }
    }

    return errors;
  },
  handleSubmit: (values, { setFieldValue, props }) => {
    if (values.stepProgress === 0) {
      setFieldValue("stepProgress", 1, false);
    } else if (values.stepProgress === 1) {
      setFieldValue("stepProgress", 2, false);
    } else if (values.stepProgress === 2) {
      setFieldValue("stepProgress", 3, false);
    } else if (values.stepProgress === 3) {
      setFieldValue("stepProgress", 4, false);
    } else {
      const storageRef = firebaseApp.storage().ref();
      let timeStamp = new Date().toISOString().slice(0, 10)
      setFieldValue("loading", true, false);
      auth.onAuthStateChanged(user => {
        if (user) {// User is signed in.

          // FETCH CART CHECK ITEM
          axios.get(`https://asia-east2-digitalwish-sticker.cloudfunctions.net/cart?customerID=${user.uid}`, {
            headers: {
              Authorization:  'Basic ZGlnaXRhbHdpc2g6SzZDd2N3dkF6QVNDRGZWNg=='
            }
           })
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
                        "shape": values.shape,
                        "coat": values.coat,
                        "material": values.material,
                        "shape_index": values.shape_index,
                        "index_2": values.coat_index,
                        "index_1": values.material_index,
                        "count": values.units,

                        "comment": values.comment,
                        "units": values.units,

                        "width": values.width,
                        "price": values.price,
                        "height": values.height,
                        "status": "รออนุมัติแบบ",

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

                      axios.put(`https://asia-east2-digitalwish-sticker.cloudfunctions.net/cart/${res.data[0].myID}`, cloneRes, {
                        headers: {
                          Authorization:  'Basic ZGlnaXRhbHdpc2g6SzZDd2N3dkF6QVNDRGZWNg=='
                        }
                       })
                        .then(res => {
                          console.log("res", res);
                          props.history.push("/cart")
                          setFieldValue("loading", false, false);
                        }).catch(function (err) {
                          console.log("err", err.response)
                          setFieldValue("loading", false, false);
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
                            "shape_index": values.shape_index,
                            "index_2": values.coat_index,
                            "index_1": values.material_index,
                            "count": values.units,
                            "coat": values.coat,
                            "cutting": values.cutting,
                            "comment": values.comment,
                            "units": values.units,
                            "material": values.material,
                            "width": values.width,
                            "price": values.price,
                            "shape": values.shape,
                            "height": values.height,
                            "status": "รออนุมัติแบบ",

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
                      axios.post(`https://asia-east2-digitalwish-sticker.cloudfunctions.net/cart`, data, {
                        headers: {
                          Authorization:  'Basic ZGlnaXRhbHdpc2g6SzZDd2N3dkF6QVNDRGZWNg=='
                        }
                       })
                        .then(res => {
                          console.log("res", res);
                          setFieldValue("loading", false, false);
                          props.history.push("/cart")
                        }).catch(function (err) {
                          console.log("err", err)
                          setFieldValue("loading", false, false);
                        })
                    });
                  }
                  );

              }
            }).catch(function (err) {
              console.log("err", err)
              setFieldValue("loading", false, false);
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
                    "shape_index": values.shape_index,
                    "index_2": values.coat_index,
                    "index_1": values.material_index,
                    "coat": values.coat,
                    "cutting": values.cutting,
                    "comment": values.comment,
                    "count": values.units,
                    "units": values.units,
                    "material": values.material,
                    "width": values.width,
                    "price": values.price,
                    "shape": values.shape,
                    "height": values.height,
                    "status": "รออนุมัติแบบ",

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
                  setFieldValue("loading", false, false);
                  props.history.push("/cart")
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
                        "shape_index": values.shape_index,
                        "index_2": values.coat_index,
                        "index_1": values.material_index,
                        "coat": values.coat,
                        "cutting": values.cutting,
                        "comment": values.comment,
                        "count": values.units,
                        "units": values.units,
                        "material": values.material,
                        "width": values.width,
                        "price": values.price,
                        "shape": values.shape,
                        "height": values.height,
                        "status": "รออนุมัติแบบ",

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
                  setFieldValue("loading", false, false);
                  props.history.push("/cart")
                })
              })
              .catch(function (err) {
                console.log("err", err)
                setFieldValue("loading", false, false);
              })
          }
          return;
        }
      });
    }
  }
})(AppComponent);

export default EnhancedAppComponent;