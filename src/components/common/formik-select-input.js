import React from 'react';
// import { useField } from 'formik';

const SelectInput = ({ ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  //     props.name
  // const [field, meta] = useField(props);
  return (
    <>
      {/* <select className="edit-select" {...field} {...props}>
        {props.children}
      </select> */}
      <select className="edit-select">
        {props.children}
      </select>
      {/* {meta.touched && meta.error ? (
          <div className="error">
            <span className="tooltiptext" style={props.cssStyle}>{meta.error}</span>
          </div>
        ) : null
      } */}
    </>
  );
};
export default SelectInput;