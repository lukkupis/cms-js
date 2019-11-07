import React from 'react';
import Sortable from 'react-sortablejs';
import { useSelector, useDispatch } from 'react-redux';

import * as cmsMenuActions from 'actions/cmsMenuActions';

import styled from 'styled-components';
import { ListGroupItem, Button } from 'reactstrap';

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

  li {
    cursor: move;
  }

  &:empty {
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-radius: 0.25rem;
  }
`;

function MenuSortable(props) {
  const cmsMenuStore = useSelector(state => state.cmsMenuStore);
  const dispatch = useDispatch();

  const Pages = () =>
    cmsMenuStore.pages.map((item, key) => (
      <ListGroupItem key={key} data-id={item._id}>
        {item.title}
      </ListGroupItem>
    ));

  const Menu = () =>
    cmsMenuStore.menu.map((item, key) => (
      <ListGroupItem key={key} data-id={item.page._id}>
        {item.title}
        <div>
          <Button
            color="link"
            className="p-0 mt-3 text-danger"
            disabled={cmsMenuStore.REMOVE_MENU_STARTED}
            onClick={() => dispatch(cmsMenuActions.REMOVE_MENU(item._id))}
          >
            Remove
          </Button>
        </div>
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

  return (
    <div>
      <div className="row">
        <div className="col-sm-6">
          <div className="mb-4">
            <strong>Pages:</strong>
          </div>

          {cmsMenuStore.pages.length > 0 && (
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
