import React from 'react';
import PropTypes from 'prop-types';

import ButtonLink from 'components/atoms/ButtonLink';

const AdminEditButtons = ({ buttons, itemTitle }) => {
  return (
    <div className="mt-2">
      {buttons.map((item, index, array) => (
        <ButtonLink
          type="button"
          className="btn"
          key={index}
          onClick={() => item.action(itemTitle)}
        >
          {item.label}
        </ButtonLink>
      ))}
    </div>
  );
};

AdminEditButtons.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default AdminEditButtons;
