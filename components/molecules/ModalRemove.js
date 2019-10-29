import React from 'react';
import PropTypes from 'prop-types';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ModalRemove = ({ className, isOpen, toggle, action, itemTitle }) => {
  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      centered={true}
      className={className}
    >
      <ModalHeader toggle={toggle}>Delete</ModalHeader>
      <ModalBody>Are you sure you want to delete: {itemTitle}?</ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={action}>
          Delete
        </Button>{' '}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

ModalRemove.propTypes = {
  className: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  action: PropTypes.func.isRequired,
  itemTitle: PropTypes.string.isRequired
};

export default ModalRemove;
