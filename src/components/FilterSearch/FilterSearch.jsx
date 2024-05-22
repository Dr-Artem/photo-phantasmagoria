import style from './FilterSearch.module.css';

export const FilterSearch = ({ handleSubmit, handleInputChange }) => {
    return (
        <form className={style.form} onSubmit={handleSubmit}>
            <input
                className={style.form__input}
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
                onChange={handleInputChange}
            />
            <button type="submit" className={style.form__submit}>
                <i className="bx bx-search"></i>
            </button>
        </form>
    );
};
