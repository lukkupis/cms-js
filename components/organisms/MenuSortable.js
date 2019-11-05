import uniqueId from 'lodash/uniqueId';
import React from 'react';
import ReactDOM from 'react-dom';
import Sortable from 'react-sortablejs';

import styled from 'styled-components';

const SortableList = styled(Sortable)`
  padding: 0;
  max-width: 360px;
  background-color: #fff;
  border: 1px solid #eee;
  list-style: none;

  &:empty {
    padding: 20px 0;
  }

  & > * {
    padding: 10px 40px;
  }
  & > *:not(:first-child) {
    border-top: 1px solid #eee;
  }
  & > *:not(:last-child) {
    border-bottom: 1px solid #eee;
  }
  & > *:hover {
    cursor: move;
  }
`;

class MenuSortable extends React.Component {
  state = {
    pages: [
      'page 1',
      'page 2',
      'page 3',
      'page 4',
      'page 5',
      'page 6',
      'page 7'
    ],
    menu: []
  };

  render() {
    const pages = this.state.pages.map((val, key) => (
      <li key={uniqueId()} data-id={val}>
        {val}
      </li>
    ));
    const menu = this.state.menu.map((val, key) => (
      <li key={uniqueId()} data-id={val}>
        {val}
      </li>
    ));

    return (
      <div>
        <div className="row">
          <div className="col-sm-6">
            <div className="mb-4">
              <strong>Pages:</strong>
            </div>

            <SortableList
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
            >
              {pages}
            </SortableList>
          </div>
          <div className="col-sm-6">
            <div className="mb-4">
              <strong className="mb-4">Menu:</strong>
            </div>

            <SortableList
              options={{
                animation: 150,
                group: {
                  name: 'clone1',
                  pull: false,
                  put: true
                }
              }}
              tag="ul"
              onChange={items => {
                this.setState({ menu: items });
              }}
            >
              {menu}
            </SortableList>
          </div>
        </div>
      </div>
    );
  }
}

export default MenuSortable;
