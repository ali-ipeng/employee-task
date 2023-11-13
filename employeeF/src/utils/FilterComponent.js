import React from "react";

const FilterComponent = ({ filterText, onFilter }) => (
  <>
    <div className="flex w-full">
      <input
        id="search"
        type="text"
        className="form-control max-width-input"
        placeholder="Search here..."
        aria-label="Search Input"
        value={filterText}
        onChange={onFilter}
      />
    </div>
  </>
);

export default FilterComponent;
