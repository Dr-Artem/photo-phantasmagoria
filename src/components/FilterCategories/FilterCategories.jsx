import { forwardRef } from 'react';
import style from './FilterCategories.module.css';

export const FilterCategories = forwardRef(
    ({ handleFilter, activeCategory }, ref) => {
        const categories = [
            'animals',
            'backgrounds',
            'buildings',
            'business',
            'computer',
            'education',
            'fashion',
            'feelings',
            'food',
            'health',
            'industry',
            'music',
            'nature',
            'science',
            'people',
            'places',
            'religion',
            'sports',
            'transportation',
            'travel',
        ];

        return (
            <ul ref={ref} className={style.list}>
                {categories.map(category => {
                    const className = `${style.filter__button} ${
                        activeCategory === category
                            ? style.filter__button_active
                            : ''
                    }`;
                    return (
                        <li
                            key={category}
                            className={style.item}
                            data-filter-animate="appearance"
                        >
                            <button
                                onClick={() => handleFilter(category)}
                                className={className}
                            >
                                {category}
                            </button>
                        </li>
                    );
                })}
            </ul>
        );
    }
);
