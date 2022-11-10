import React from 'react';

export default function CategoryButtons(categoryName, filterFunc) {
  return (
    <div key={ categoryName }>
      <button
        className="categBtn"
        data-testid={ `${categoryName}-category-filter` }
        id={ categoryName }
        type="button"
        onClick={ filterFunc }
      >
        {categoryName}
      </button>
    </div>
  );
}
