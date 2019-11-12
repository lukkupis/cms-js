import React from "react";
import PropTypes from "prop-types";

import {
  Form as FormStrap,
  FormGroup,
  Label,
  Input,
  FormFeedback
} from "reactstrap";
import { Formik, Form, Field } from "formik";

const InputSave = ({
  label,
  name,
  placeholder,
  initialValue,
  validate,
  onSubmit
}) => {
  return (
    <Formik
      initialValues={{
        [name]: initialValue
      }}
      enableReinitialize={true}
      validate={validate}
      onSubmit={onSubmit}
    >
      {({ errors, touched }) => (
        <FormStrap tag={Form}>
          <FormGroup>
            <Label for="title">{label}</Label>
            <Input
              tag={Field}
              type="text"
              id={name}
              name={name}
              placeholder={placeholder}
              invalid={errors.linkName && touched.linkName}
            />
            <FormFeedback>{errors.linkName}</FormFeedback>
          </FormGroup>
        </FormStrap>
      )}
    </Formik>
  );
};

InputSave.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  initialValue: PropTypes.string.isRequired,
  validate: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default InputSave;
