import React from "react";
import "./List.scss";

const List = (props) => {
  return (
    <div className="list">
      {props.copy !== "" && <p>{props.copy}</p>}
      <ul>
        {props.list.map((a) => (
          <li>{a}</li>
        ))}
      </ul>
    </div>
  );
};

export default List;
