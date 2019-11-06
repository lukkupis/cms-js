import React, { useEffect } from 'react';
import Sortable from 'react-sortablejs';
import { useSelector, useDispatch } from 'react-redux';

import * as cmsPageActions from 'actions/cmsPageActions';
import * as cmsMenuActions from 'actions/cmsMenuActions';

import styled from 'styled-components';
import { ListGroupItem } from 'reactstrap';

const SortablePages = styled(Sortable)`
  height: 495px;
  overflow: auto;

  li {
    cursor: move;
  }
`;

const SortableMenu = styled(Sortable)`
  max-height: 495px;
  overflow: auto;
  padding-bottom: 50px;

  &:empty {
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-radius: 0.25rem;
  }
`;

function MenuSortable(props) {
  const cmsPageStore = useSelector(state => state.cmsPageStore);
  const cmsMenuStore = useSelector(state => state.cmsMenuStore);
  const dispatch = useDispatch();

  const Pages = () =>
    cmsPageStore.pages.map(item => (
      <ListGroupItem key={item._id} data-id={item._id}>
        {item.title}
      </ListGroupItem>
    ));

  const Menu = () =>
    cmsMenuStore.menu.map(item => (
      <ListGroupItem key={item._id} data-id={item._id}>
        {item.title}
      </ListGroupItem>
    ));

  const SortableMenuList = () => (
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
        dispatch(cmsMenuActions.SET_MENU(items));
      }}
    >
      {<Menu />}
    </SortableMenu>
  );

  return (
    <div>
      <div className="row">
        <div className="col-sm-6">
          <div className="mb-4">
            <strong>Pages:</strong>
          </div>

          {cmsPageStore.pages.length > 0 && (
            <SortablePages
              options={{
                animation: 150,
                sort: false,
                group: {
                  name: 'clone1',
                  pull: 'clone',
                  put: false
                }
              }}
              tag="ul"
              className="list-group"
            >
              {<Pages />}
            </SortablePages>
          )}
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
