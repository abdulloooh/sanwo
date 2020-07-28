import React from "react";
import { Dropdown, DropdownButton, Col } from "react-bootstrap";
/*
Interface:
    IN: active item, Object order [
        {label:'',value:''}
    ]
    title, isActive, onClick
*/
const Filter = ({ data, activeItem, onClick }) => {
  const variant = "primary";
  return (
    <DropdownButton
      as={Col}
      id={`dropdown-variants-${variant}`}
      variant={variant.toLowerCase()}
      title={getTitle(data, activeItem)}
    >
      {data.map((d) => (
        <Dropdown.Item
          key={d.value}
          eventKey={d.value}
          onClick={() => onClick(d)}
        >
          {d.label}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
};

function getTitle(data, activeItem) {
  let activeLabel = "";
  data.forEach((element) => {
    if (element.value === activeItem) {
      activeLabel = element.label;
    }
  });
  return activeLabel;
}

export default Filter;
