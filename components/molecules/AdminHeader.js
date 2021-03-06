import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import { Spinner } from 'reactstrap';

const AdminHeader = ({
  name,
  buttonLabel,
  buttonLink,
  buttonLinkAs,
  startedState
}) => {
  return (
    <>
      <div
        className={`${(name || buttonLabel) &&
          'mt-5'} d-flex align-items-center`}
      >
        {name && <h1 className="my-0">{name}</h1>}
        {buttonLabel && (
          <Link href={buttonLink} as={buttonLinkAs}>
            <button className="btn btn-dark ml-4">{buttonLabel}</button>
          </Link>
        )}
      </div>
      <div style={{ height: 50 }}>
        {startedState && <Spinner color="danger" />}
      </div>
    </>
  );
};

AdminHeader.propTypes = {
  name: PropTypes.string.isRequired,
  buttonLabel: PropTypes.string,
  buttonLink: PropTypes.string,
  startedState: PropTypes.bool
};

export default AdminHeader;
