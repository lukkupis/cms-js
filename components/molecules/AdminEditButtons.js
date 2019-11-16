import React from 'react';
import PropTypes from 'prop-types';

import ButtonDelete from '../atoms/ButtonDelete';
import ButtonEdit from '../atoms/ButtonEdit';

import Link from 'next/link';

const AdminEditButtons = ({ buttons, itemTitle, itemId }) => {
  return (
    <div className="mt-2">
      {buttons(itemId, itemTitle).map((item, index, array) => {
        if (item.action) {
          return (
            <ButtonDelete
              type="button"
              className="btn"
              key={index}
              onClick={() => item.action()}
            >
              {item.label}
            </ButtonDelete>
          );
        } else if (item.link) {
          return (
            <Link key={index} href={item.link} as={item.as}>
              <ButtonEdit className="btn">{item.label}</ButtonEdit>
            </Link>
          );
        }
      })}
    </div>
  );
};

AdminEditButtons.propTypes = {
  buttons: PropTypes.func.isRequired,
  itemTitle: PropTypes.string.isRequired,
  itemId: PropTypes.string.isRequired
};

export default AdminEditButtons;
