import React from "react";

import SortablePagesList from "components/organisms/MenuSortable/SortablePagesList";
import SortableMenuList from "components/organisms/MenuSortable/SortableMenuList";

function MenuSortable(props) {
  return (
    <div>
      <div className="row">
        <div className="col-sm-6">
          <div className="mb-4">
            <strong>Pages:</strong>
          </div>

          <SortablePagesList />
        </div>
        <div className="col-sm-6">
          <div className="mb-4">
            <strong className="mb-4">Menu:</strong>
          </div>

          <SortableMenuList />
        </div>
      </div>
    </div>
  );
}

export default MenuSortable;
