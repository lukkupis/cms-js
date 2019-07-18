import React from 'react';
import PropTypes from 'prop-types';

import { Spinner } from 'reactstrap';

const AdminHeader = ({ name, buttonLabel, buttonAction, startedState }) => {
  return (
    <>
      <div className="mt-5 d-flex align-items-center">
        <h1 className="my-0">{name}</h1>
        <a href="#" className="btn btn-dark ml-4">
          {buttonLabel}
        </a>
      </div>
      <div style={{ height: 50 }}>
        {startedState && <Spinner color="danger" />}
      </div>
    </>
  );
};

AdminHeader.propTypes = {
  name: PropTypes.string.isRequired,
  buttonLabel: PropTypes.string.isRequired,
  buttonAction: PropTypes.func,
  startedState: PropTypes.bool.isRequired
};

export default AdminHeader;
