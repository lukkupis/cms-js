import React from 'react';

import SortablePagesContainer from '../../organisms/MenuSortable/SortablePagesContainer';
import SortableMenuContainer from '../../organisms/MenuSortable/SortableMenuContainer';

function MenuSortableWrapper(props) {
  return (
    <div>
      <div className="row">
        <div className="col-sm-6">
          <div className="mb-4">
            <strong>Pages:</strong>
          </div>

          <SortablePagesContainer />
        </div>
        <div className="col-sm-6">
          <div className="mb-4">
            <strong className="mb-4">Menu:</strong>
          </div>

          <SortableMenuContainer />
        </div>
      </div>
    </div>
  );
}

export default MenuSortableWrapper;
