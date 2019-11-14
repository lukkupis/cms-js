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
        dispatch(cmsMenuActions.REFRESH_MENU(items));
        dispatch(cmsMenuActions.SET_MENU(items));
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
