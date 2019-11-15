import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as cmsMenuActions from '../../../actions/cmsMenuActions';

import { ListGroupItem, Button } from 'reactstrap';
import InputSave from '../../molecules/InputSave';

const MenuItems = () => {
  const cmsMenuStore = useSelector(state => state.cmsMenuStore);
  const dispatch = useDispatch();

  return cmsMenuStore.menu.map((item, key) => {
    if (item.page) {
      return (
        <ListGroupItem key={key} data-id={item._id}>
          <div className="mb-3">
            <div>Page:</div>
            <div>
              <strong>{item.page.title || item.title}</strong>
            </div>
          </div>

          <InputSave
            label="Link name:"
            name="linkName"
            placeholder="Enter the link name"
            initialValue={item.linkName}
            validate={values => {
              let errors = {};
              if (!values.linkName) {
                errors.linkName = 'Link name is required';
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting, setFieldValue }) => {
              setSubmitting(false);

              const newLinkName = {
                id: item._id,
                linkName: values.linkName
              };

              dispatch(cmsMenuActions.REFRESH_LINK_NAME(newLinkName));
              dispatch(cmsMenuActions.UPDATE_LINK_NAME(newLinkName));
            }}
          />
          <Button
            color="link"
            className="p-0 text-danger"
            disabled={cmsMenuStore.REMOVE_MENU_STARTED}
            onClick={() => {
              dispatch(cmsMenuActions.REMOVE_MENU(item._id));
            }}
          >
            Remove
          </Button>
        </ListGroupItem>
      );
    }
  });
};

export default MenuItems;
