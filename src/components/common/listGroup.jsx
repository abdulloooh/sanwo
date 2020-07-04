import React from "react";
import PropTypes from "prop-types";

const ListGroup = (props) => {
  const {
    items,
    onItemSelect,
    selectedItem,
    keyProperty,
    valueProperty,
  } = props;
  return (
    <ul className="list-group py-5">
      {items.map((item) => {
        return (
          <li
            key={item[keyProperty]}
            style={{ cursor: "pointer" }}
            className={
              item === selectedItem
                ? "list-group-item active p-3 text-center"
                : "list-group-item p-3 text-center"
            }
            onClick={() => onItemSelect(item)}
          >
            {item[valueProperty]}
          </li>
        );
      })}
    </ul>
  );
};

ListGroup.defaultProps = {
  keyProperty: "_id",
  valueProperty: "name",
};

ListGroup.propTypes = {
  items: PropTypes.array,
  onItemSelect: PropTypes.func,
  selectedItem: PropTypes.object,
};
export default ListGroup;

/*
Make common completely dynamic...for ListGrp=>textPpt,valuePpt
Make all props name a genric name for reusability
camelCase for naming files
naming consistency back and forth within prop and prop-parent
while returning sth to the parent, return the whole stuff not some part of it,
//let parent decides what is needed eg item instead of item.name

In other words, interface should be flexible
*/
