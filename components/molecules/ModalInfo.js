import React from 'react';
import PropTypes from 'prop-types';

import { Modal, ModalHeader, ModalBody } from 'reactstrap';

const ModalInfo = ({ className, toggle, message }) => {
  return (
    <Modal
      isOpen={message ? true : false}
      toggle={toggle}
      centered={true}
      className={className}
    >
      <ModalHeader toggle={toggle}>Message</ModalHeader>
      <ModalBody>{message}</ModalBody>
    </Modal>
  );
};

ModalInfo.propTypes = {
  className: PropTypes.string,
  toggle: PropTypes.func.isRequired,
  message: PropTypes.string
};

export default ModalInfo;
