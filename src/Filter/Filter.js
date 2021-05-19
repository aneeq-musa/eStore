import React from "react";
import "./Filter.css";

const Filter = (props) => {
  const Options = [
    { key: 1, copy: "Select" },
    { key: 2, copy: "Low to High" },
    { key: 3, copy: "High to Low" }
  ];

  return (
    <div className="select">
      <span>Sort products: </span>
      <select onChange={(event) => props.handleSorting(event.target.value)}>
        {Options.map((option) => {
          return <option key={option.key}> {option.copy}</option>;
        })}
      </select>
    </div>
  );
};

export default Filter;
