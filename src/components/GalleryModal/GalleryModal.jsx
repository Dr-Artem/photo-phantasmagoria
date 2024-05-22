import { forwardRef } from 'react';
import style from '../Gallery/Gallery.module.css';

export const GalleryModal = forwardRef(({ doFlipClose }, ref) => {
    return (
        <div
            ref={ref}
            className={style.modal}
            onClick={event => doFlipClose(event)}
        >
            <img className={style.modal__image} alt="" />
        </div>
    );
});
