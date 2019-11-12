import React from "react";
import InputSave from "components/molecules/InputSave";

import { useSelector } from "react-redux";

import { ListGroupItem, Button } from "reactstrap";

const Menu = () => {
  const cmsMenuStore = useSelector(state => state.cmsMenuStore);

  return cmsMenuStore.menu.map((item, key) => (
    <ListGroupItem key={key} data-id={item.page._id}>
      <div className="mb-3">
        <div>Page:</div>
        <div>
          <strong>{item.title}</strong>
        </div>
      </div>

      <InputSave
        label="Input name:"
        name="inputName"
        placeholder="Enter the input name"
        initialValue={
          cmsMenuStore.menu.find(menuItem => menuItem._id === item._id).title
        }
        validate={values => {
          let errors = {};
          if (!values.linkName) {
            errors.linkName = "Link name is required";
          }
          return errors;
        }}
        onSubmit={() => console.log("submit")}
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
