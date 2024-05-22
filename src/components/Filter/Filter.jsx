import { useRef, useState } from 'react';
import style from './Filter.module.css';
import gsap from 'gsap';
import { Flip, toast } from 'react-toastify';
import { FilterSearch } from 'components/FilterSearch/FilterSearch';
import { FilterCategories } from 'components/FilterCategories/FilterCategories';

export const Filter = ({ settingForm }) => {
    const [expand, setExpand] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [filter, setFilter] = useState('');
    const [activeCategory, setActiveCategory] = useState('');
    const filterListWrapper = useRef();

    const expandList = () => {
        let ctx = gsap.context(() => {
            gsap.timeline({
                onComplete: setExpand(!expand),
                repeat: 0,
            })
                .to(filterListWrapper.current, {
                    maxHeight: expand ? 0 : 355,
                    duration: 1.5,
                    delay: expand ? 0.5 : 0,
                })
                .to(
                    "[data-filter-animate='appearance']",
                    {
                        x: expand ? -100 : 0,
                        opacity: expand ? 0 : 1,
                        pointerEvents: expand ? 'none' : 'all',
                        duration: 1,
                        stagger: {
                            amount: 0.9,
                            from: expand ? 'end' : 'start',
                        },
                    },
                    expand ? 0 : '<'
                );
        });

        return () => ctx.revert();
    };

    const handleInputChange = event => {
        const inValue = event.currentTarget.value.toLowerCase();
        setInputValue(inValue);
    };

    const handleSubmit = event => {
        event.preventDefault();

        if (inputValue.trim() === '') {
            toast.warn('Please, enter something', {
                transition: Flip,
            });
            return;
        }
        settingForm(inputValue, filter);
    };

    const handleFilter = category => {
        setActiveCategory(category);
        setFilter(category);
        expandList();
        settingForm(inputValue, category);
    };

    return (
        <section className={style.filter}>
            <div className={style.filter__container}>
                <FilterSearch
                    handleInputChange={handleInputChange}
                    handleSubmit={handleSubmit}
                />
                <div className={style.filter__wrapper}>
                    <button
                        className={style.filter__mainButton}
                        onClick={() => expandList()}
                    >
                        Categories
                    </button>
                    <FilterCategories
                        ref={filterListWrapper}
                        handleFilter={handleFilter}
                        activeCategory={activeCategory}
                    />
                </div>
            </div>
        </section>
    );
};
