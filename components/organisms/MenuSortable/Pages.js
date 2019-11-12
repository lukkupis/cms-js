import React from "react";
import { useSelector } from "react-redux";

import { ListGroupItem } from "reactstrap";

const Pages = () => {
  const cmsMenuStore = useSelector(state => state.cmsMenuStore);

  return cmsMenuStore.pages.map((item, key) => (
    <ListGroupItem key={key} data-id={item._id}>
      {item.title}
    </ListGroupItem>
  ));
};

export default Pages;
