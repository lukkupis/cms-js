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

  const handleInputOnBlur = ({ target: { value } }, prevValue) => {
    setTimeout(() => {
      if (value === prevValue) setButtonSave(false);
    }, 100);
  };

  return (
    <Formik
      initialValues={{
        [name]: initialValue
      }}
      enableReinitialize={true}
      validate={validate}
      onSubmit={onSubmit}
    >
      {({ errors, touched, initialValues }) => (
        <FormStrap tag={Form}>
          <FormGroup>
            <Label for="title">{label}</Label>
            <div className="row">
              <div className="col-md-8">
                <Input
                  tag={Field}
                  type="text"
                  id={name}
                  name={name}
                  placeholder={placeholder}
                  invalid={errors.linkName && touched.linkName}
                  onFocus={() => setButtonSave(true)}
                  onBlur={e => handleInputOnBlur(e, initialValues.linkName)}
                />
              </div>
              <div className="col-md-4">
                {isButtonSave && (
                  <Button type="submit" color="primary">
                    Save
                  </Button>
                )}
              </div>
            </div>
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
