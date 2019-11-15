import React from 'react';
import Sortable from 'react-sortablejs';
import styled from 'styled-components';

import { useSelector } from 'react-redux';

import Pages from '../../organisms/MenuSortable/Pages';

const SortablePages = styled(Sortable)`
  height: 495px;
  overflow: auto;

  li {
    cursor: move;
  }
`;

const SortablePagesContainer = () => {
  const cmsMenuStore = useSelector(state => state.cmsMenuStore);

  return (
    cmsMenuStore.pages.length > 0 && (
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
    )
  );
};

export default SortablePagesContainer;
