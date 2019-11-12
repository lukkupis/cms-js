import React from "react";
import Sortable from "react-sortablejs";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import * as cmsMenuActions from "actions/cmsMenuActions";

import Menu from "components/organisms/MenuSortable/Menu";

const SortableMenu = styled(Sortable)`
  max-height: 495px;
  overflow: auto;
  padding-bottom: 50px;

  li {
    cursor: move;
  }

  &:empty {
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-radius: 0.25rem;
  }
`;

const SortableMenuList = () => {
  const cmsMenuStore = useSelector(state => state.cmsMenuStore);
  const dispatch = useDispatch();

  return (
    <SortableMenu
      options={{
        animation: 150,
        group: {
          name: "clone1",
          pull: false,
          put: true
        }
      }}
      tag="ul"
      className="list-group"
      onChange={items => {
        const itemsMenu = items
          .map((item, key) => {
            const page = cmsMenuStore.pages.find(
              page => String(page._id) === item
            );

            if (page) {
              return {
                title: page.title,
                order: key,
                page: page._id
              };
            }
          })
          .filter(item => item !== undefined);

        dispatch(cmsMenuActions.REFRESH_MENU(itemsMenu));
        dispatch(cmsMenuActions.SET_MENU(items));
      }}
    >
      {<Menu />}
    </SortableMenu>
  );
};

export default SortableMenuList;
