import React from 'react';

export default function CategoryButtons(categoryName, filterFunc) {
  return (
    <div>
      <button
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
