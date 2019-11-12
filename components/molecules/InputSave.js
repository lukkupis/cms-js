import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Form as FormStrap,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Button
} from 'reactstrap';
import { Formik, Form, Field } from 'formik';

const InputSave = ({
  label,
  name,
  placeholder,
  initialValue,
  validate,
  onSubmit
}) => {
  const [isButtonSave, setButtonSave] = useState(false);

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
              onFocus={() => setButtonSave(true)}
              onBlur={() => setButtonSave(false)}
            />
            {isButtonSave && (
              <Button color="link" className="px-0">
                Save
              </Button>
            )}
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
  initialValue: PropTypes.string,
  validate: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default InputSave;
