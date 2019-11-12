import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as cmsMenuActions from 'actions/cmsMenuActions';

import { ListGroupItem, Button } from 'reactstrap';
import InputSave from 'components/molecules/InputSave';

const Menu = () => {
  const cmsMenuStore = useSelector(state => state.cmsMenuStore);
  const dispatch = useDispatch();

  return cmsMenuStore.menu.map((item, key) => (
    <ListGroupItem key={key} data-id={item.page._id}>
      <div className="mb-3">
        <div>Page:</div>
        <div>
          <strong>{item.title}</strong>
        </div>
      </div>

      <InputSave
        label="Link name:"
        name="linkName"
        placeholder="Enter the link name"
        initialValue={item.name}
        validate={values => {
          let errors = {};
          if (!values.linkName) {
            errors.linkName = 'Link name is required';
          }
          return errors;
        }}
        onSubmit={() => console.log('submit')}
      />
      <Button
        color="link"
        className="p-0 text-danger"
        disabled={cmsMenuStore.REMOVE_MENU_STARTED}
        onClick={() => dispatch(cmsMenuActions.REMOVE_MENU(item._id))}
      >
        Remove
      </Button>
    </ListGroupItem>
  ));
};

export default Menu;
