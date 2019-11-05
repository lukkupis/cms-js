import uniqueId from 'lodash/uniqueId';
import React from 'react';
import ReactDOM from 'react-dom';
import Sortable from 'react-sortablejs';

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
        <div>
          <div className="title" style={{ marginTop: 50 }}>
            Uncontrolled Component
          </div>
          <h4>Clone items from left to right. DOM elements are duplicated.</h4>
          <div className="row">
            <div className="col-sm-6">
              <Sortable
                options={{
                  animation: 150,
                  sort: false,
                  group: {
                    name: 'clone1',
                    pull: 'clone',
                    put: false
                  }
                }}
                className="block-list"
                tag="ul"
              >
                {pages}
              </Sortable>
            </div>
            <div className="col-sm-6">
              <Sortable
                options={{
                  animation: 150,
                  group: {
                    name: 'clone1',
                    pull: false,
                    put: true
                  }
                }}
                className="block-list"
                tag="ul"
                onChange={items => {
                  this.setState({ menu: items });
                }}
              >
                {menu}
              </Sortable>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MenuSortable;
