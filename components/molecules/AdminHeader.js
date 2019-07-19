import React from 'react';
import PropTypes from 'prop-types';

import { Spinner } from 'reactstrap';

const AdminHeader = ({ name, buttonLabel, buttonAction, startedState }) => {
  return (
    <>
      <div
        className={`${(name || buttonLabel) &&
          'mt-5'} d-flex align-items-center`}
      >
        {name && <h1 className="my-0">{name}</h1>}
        {buttonLabel && (
          <a href="#" className="btn btn-dark ml-4">
            {buttonLabel}
          </a>
        )}
      </div>
      <div style={{ height: 50 }}>
        {startedState && <Spinner color="danger" />}
      </div>
    </>
  );
};

AdminHeader.propTypes = {
  name: PropTypes.string,
  buttonLabel: PropTypes.string,
  buttonAction: PropTypes.func,
  startedState: PropTypes.bool
};

export default AdminHeader;
