import React from 'react';
import PropTypes from 'prop-types';

import ButtonDelete from 'components/atoms/ButtonDelete';
import ButtonEdit from 'components/atoms/ButtonDelete';

const AdminEditButtons = ({ buttons, itemTitle, itemId }) => {
  return (
    <div className="mt-2">
      {buttons(itemId).map((item, index, array) => {
        if (item.action) {
          return (
            <ButtonDelete
              type="button"
              className="btn"
              key={index}
              onClick={() => item.action(itemTitle, itemId)}
            >
              {item.label}
            </ButtonDelete>
          );
        } else if (item.link) {
          return (
            <ButtonEdit className="btn" key={index} href={item.link}>
              {item.label}
            </ButtonEdit>
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
