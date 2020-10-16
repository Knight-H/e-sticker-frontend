// TEST `MultistepWizard`
// https://github.com/formium/formik/blob/master/examples/MultistepWizard.js
// https://medium.com/javascript-in-plain-english/how-to-create-a-multi-step-form-with-react-hooks-53a85efdff62
import React, { useEffect } from "react";

import Order1ProductConfigComponent from "./../order-1-product-config";
import UploadFileComponent from "./../upload-file";
import axios from "axios";
import { withFormik, useFormikContext } from 'formik';
import auth from '../../firebase/index.js';

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
    axios.get(`https://asia-east2-digitalwish-sticker.cloudfunctions.net/productOptions`)
      .then(res => {
        setFieldValue("checkLoadOption", res.data[0], false);
        setFieldValue("optionShape", res.data[0].shape, false);
        setFieldValue("optionMaterial", res.data[0].material, false);
        setFieldValue("optionCuttingList", res.data[0].cuttingList, false);
        setFieldValue("optionUnitOptions", res.data[0].unitOptions, false);
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
    showImageUrl: '',

    checkLoadOption: false,
    optionShape: [],
    optionMaterial: [],
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

    // Step two
    approvalStricker: 0,
    isCheckUploadFileStricker: 0,
    uploadFileStricker: [],
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
      if (!values.height === "") {
        errors.height = "*กรุณาระบุ"
      }
      if (!values.units) {
        errors.units = "*กรุณาระบุ"
      }
    } else if (values.stepProgress === 1) {
      // Step two
      if (!values.approvalStricker) {
        errors.approvalStricker = "*กรุณาระบุ"
      }
    }

    return errors;
  },
  handleSubmit: (values, { setFieldValue }) => {
    console.log("values", values.stepProgress)
    if (values.stepProgress === 0) {
      setFieldValue("stepProgress", 1, false);
    } else {

      auth.onAuthStateChanged(user => {
        if (user) {
          // User is signed in.
          let data = {
            "customerType": "member",
            "itemsList ": [
              {
                "approveMethod": values.approvalStricker,
                "coat": values.coat,
                "cutting": values.cutting,
                "comment": values.comment,
                "units": values.units,
                "material": values.material,
                "width": values.width,
                "price": values.units,
                "shape": values.shape,
                "height": values.height
              }
            ],
            "customerID": user.uid,
          };

          axios.post(`https://asia-east2-digitalwish-sticker.cloudfunctions.net/cart`, data)
            .then(res => {
              console.log("res", res);
            }).catch(function (err) {
              console.log("err", err)
            })

        } else {
          return;
        }
      });
    }
  }
})(AppComponent);

export default EnhancedAppComponent;