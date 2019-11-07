import React from 'react';
import PropTypes from 'prop-types';

import {
  Form as FormStrap,
  FormGroup,
  Label,
  Input,
  FormFeedback
} from 'reactstrap';
import { Formik, Form, Field } from 'formik';

const InputAutoSave = ({
  label,
  name,
  placeholder,
  initialValue,
  validate,
  onInput
}) => {
  let timer;

  return (
    <Formik
      initialValues={{
        [name]: initialValue
      }}
      enableReinitialize={true}
      validate={validate}
      onSubmit={() => {}}
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
              onInput={() => {
                function changeLinkName() {
                  onInput();
                }

                if (timer) {
                  clearTimeout(timer);
                }
                timer = setTimeout(changeLinkName, 1000);
              }}
            />
            <FormFeedback>{errors.linkName}</FormFeedback>
          </FormGroup>
        </FormStrap>
      )}
    </Formik>
  );
};

InputAutoSave.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  initialValue: PropTypes.string.isRequired,
  validate: PropTypes.func.isRequired,
  onInput: PropTypes.func.isRequired
};

export default InputAutoSave;
