import { forwardRef } from 'react';

import style from '../Gallery/Gallery.module.css';
import { GalleryItem } from 'components/GalleryItem/GalleryItem';

export const GalleryList = forwardRef(
    ({ pictures, lastPictureElementRef, doFlip }, ref) => {
        return (
            <ul ref={ref} className={style.gallery__list}>
                {pictures.map((picture, index) => {
                    return (
                        <GalleryItem
                            key={picture.id}
                            picture={picture}
                            pictures={pictures}
                            index={index}
                            lastPictureElementRef={lastPictureElementRef}
                            doFlip={doFlip}
                        />
                    );
                })}
            </ul>
        );
    }
);
