import React from 'react';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3">Categories</h3>
      <div className="space-y-2">
        <button
          className={`block px-3 py-2 rounded-md w-full text-left ${
            selectedCategory === null
              ? 'bg-blue-900 text-white'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
          onClick={() => onCategoryChange(null)}
        >
          All Categories
        </button>
        
        {categories.map((category) => (
          <button
            key={category}
            className={`block px-3 py-2 rounded-md w-full text-left ${
              selectedCategory === category
                ? 'bg-blue-900 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};