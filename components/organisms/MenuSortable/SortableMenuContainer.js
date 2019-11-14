import React from 'react';
import Sortable from 'react-sortablejs';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import * as cmsMenuActions from 'actions/cmsMenuActions';

import MenuItems from 'components/organisms/MenuSortable/MenuItems';

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

function generateMenu(state, items) {
  return items
    .map((item, key) => {
      const page = state.pages.find(page => String(page._id) === item);
      const menuItem = state.menu.find(
        prevItem => String(prevItem._id) === item
      );

      if (page) {
        return {
          title: page.title,
          linkName: page.title,
          order: key,
          page: page._id
        };
      } else if (menuItem) {
        return {
          title: menuItem.title,
          linkName: menuItem.linkName,
          order: key,
          page: menuItem.page._id
        };
      }
    })
    .filter(item => item !== undefined);
}

const SortableMenuContainer = () => {
  const cmsMenuStore = useSelector(state => state.cmsMenuStore);
  const dispatch = useDispatch();

  const SortableMenuItems = () => (
    <SortableMenu
      options={{
        animation: 150,
        group: {
          name: 'clone1',
          pull: false,
          put: true
        }
      }}
      tag="ul"
      className="list-group"
      onChange={items => {
        const menu = generateMenu(cmsMenuStore, items);

        dispatch(cmsMenuActions.REFRESH_MENU(menu));
        dispatch(cmsMenuActions.SET_MENU(menu));
      }}
    >
      {<MenuItems />}
    </SortableMenu>
  );

  return (
    <>
      {cmsMenuStore.menu.length > 0 ? (
        <SortableMenuItems />
      ) : (
        <SortableMenuItems />
      )}
    </>
  );
};

export default SortableMenuContainer;
