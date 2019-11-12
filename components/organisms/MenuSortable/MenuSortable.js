import React from "react";
import { useSelector, useDispatch } from "react-redux";

import SortablePagesList from "components/organisms/MenuSortable/SortablePagesList";
import SortableMenuList from "components/organisms/MenuSortable/SortableMenuList";

function MenuSortable(props) {
  const cmsMenuStore = useSelector(state => state.cmsMenuStore);
  const dispatch = useDispatch();

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

          {cmsMenuStore.menu.length > 0 ? (
            <SortableMenuList />
          ) : (
            <SortableMenuList />
          )}
        </div>
      </div>
    </div>
  );
}

export default MenuSortable;
