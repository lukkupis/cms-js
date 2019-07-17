import React from 'react';
import PropTypes from 'prop-types';

import { Table } from 'reactstrap';
import AdminEditButtons from 'components/molecules/AdminEditButtons';

const AdminList = ({ list, columns }) => {
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
                      buttons={[
                        { label: 'Edit', action: () => {} },
                        { label: 'Delete', action: () => {} }
                      ]}
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
  columns: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default AdminList;
