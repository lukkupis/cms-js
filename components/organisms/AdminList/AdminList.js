import React from 'react';
import PropTypes from 'prop-types';

import { Table } from 'reactstrap';
import AdminEditButtons from '../../molecules/AdminEditButtons';

const AdminList = ({ list, columns, buttons }) => {
  function fieldType(column, item) {
    switch (column.type) {
      case 'date':
        return new Date(item[column.content]).toLocaleDateString('en-US');
      case 'object':
        let field = item;
        const names = column.content;

        for (var i = 0; i < names.length; i++) {
          field = field[names[i]] = field[names[i]] || {};
        }
        return field;
      default:
        return item[column.content];
    }
  }

  return (
    <Table hover>
      <thead>
        <tr>
          {columns.map((item, index) => (
            <th key={index} className="text-capitalize">
              {item.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {list.length &&
          list.map((item, index) => (
            <tr key={item._id}>
              {columns.map((column, index) => (
                <td key={index}>
                  {fieldType(column, item)}
                  {index === 0 && (
                    <AdminEditButtons
                      buttons={buttons}
                      itemTitle={item.title || item.name}
                      itemId={item._id}
                    />
                  )}
                </td>
              ))}
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

AdminList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  buttons: PropTypes.func
};

AdminList.defaultProps = {
  buttons: []
};

export default AdminList;
