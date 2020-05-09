import React from "react";
const FilterCategories = props => {
  const { categ, handleFilter } = props;
  return (
    <div>
      {/* <!-- filter header --> */}
      <h5>Categories</h5>
      {/* <!-- filter list --> */}
      <ul className="list list--vr-separator">
        {categ.map(cat => (
          <li
            onClick={() => handleFilter(cat.id)}
            key={cat.id}
            className="link list__item"
          >
            <i className="link__icon fas fa-angle-right"></i>
            {cat.categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterCategories;
