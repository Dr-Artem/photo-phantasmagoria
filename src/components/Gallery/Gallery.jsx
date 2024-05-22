import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import gsap from 'gsap';
import { Flip } from 'gsap/Flip';

import style from './Gallery.module.css';
import { GalleryList } from 'components/GalleryList/GalleryList';
import { GalleryModal } from 'components/GalleryModal/GalleryModal';

export const Gallery = ({ pictures, lastPictureElementRef }) => {
    const listWrapper = useRef();
    const modal = useRef();
    const galleryConatiner = useRef();

    const [activeImage, setActiveImage] = useState();

    useEffect(() => {
        gsap.registerPlugin(Flip);
    }, []);

    const doFlip = (event, index, src) => {
        const modalImage = modal.current.children[0];
        const state = Flip.getState([event.target, modalImage]);
        event.target.classList.add(style.loading);

        loadImage(src)
            .then(() => {
                modalImage.setAttribute('data-flip-id', `image-${index}`);
                modalImage.setAttribute('src', src);
                event.target.classList.remove(style.loading);
                modalImage.classList.add(style.active);
                event.target.classList.add(style.active);
                document.body.classList.add('no-scroll');

                Flip.from(state, {
                    duration: 1,
                    fade: true,
                    absolute: true,
                    toggleClass: style.flipping,
                    ease: 'power1.inOut',
                    zIndex: 10,
                    objectFit: 'cover',
                    objectPosition: 'center',
                });
                setActiveImage(event.target);
            })
            .catch(err => {
                toast.error(err.message, {
                    transition: Flip,
                });
                console.log(err.message);
            });
    };

    const loadImage = src => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = () => reject(new Error('Failed to load image.'));
            img.src = src;
        });
    };

    const doFlipClose = event => {
        const modalImage = event.currentTarget.children[0];
        const state = Flip.getState([activeImage, modalImage]);
        modalImage.classList.remove(style.active);
        activeImage.classList.remove(style.active);
        document.body.classList.remove('no-scroll');

        Flip.from(state, {
            duration: 1,
            fade: true,
            absolute: true,
            toggleClass: style.flipping,
            ease: 'power1.inOut',
            objectFit: 'cover',
            objectPosition: 'center',
            onComplete: () => {
                if (!modalImage.classList.contains(style.active)) {
                    modalImage.setAttribute('src', '');
                }
            },
        });
    };

    return (
        <section className={style.gallery}>
            <div className={style.gallery__container} ref={galleryConatiner}>
                <GalleryList
                    ref={listWrapper}
                    pictures={pictures}
                    lastPictureElementRef={lastPictureElementRef}
                    doFlip={doFlip}
                />

                <GalleryModal doFlipClose={doFlipClose} ref={modal} />
            </div>
        </section>
    );
};
