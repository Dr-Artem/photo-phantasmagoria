import { TailSpin } from 'react-loader-spinner';
import style from '../Gallery/Gallery.module.css';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

export const GalleryItem = ({
    picture,
    pictures,
    index,
    lastPictureElementRef,
    doFlip,
}) => {
    const photoRef = useRef(null);
    const srcSet = `${picture.webformatURL.replace('_640', '_480')} 400w,
                            ${picture.webformatURL} 1600w`;

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const photo = photoRef.current;

        if (photo) {
            const animation = gsap.fromTo(
                photo,
                {
                    rotateX: '90deg',
                    opacity: 0,
                },
                {
                    rotateX: '0deg',
                    opacity: 1,
                    scrollTrigger: {
                        trigger: photo,
                        start: 'top 98%',
                        toggleActions: 'play none none none',
                        markers: false,
                    },
                }
            );

            return () => {
                animation.kill();
                ScrollTrigger.getById(photo)?.kill();
            };
        }
    }, []);

    return (
        <li
            data-animate-item="appearance"
            ref={
                pictures.length === index + 1 ? lastPictureElementRef : photoRef
            }
            className={style.gallery__item}
        >
            <img
                onLoad={({ target }) => {
                    if (target.complete) {
                        target.parentNode.classList.add(style.loaded);
                    }
                }}
                className={style.gallery__image}
                loading="lazy"
                src={picture.largeImageURL}
                srcSet={srcSet}
                alt={picture.tags}
                data-flip-id={`image-${picture.id}`}
                onClick={event =>
                    doFlip(event, picture.id, picture.largeImageURL)
                }
            />
            <TailSpin
                visible={true}
                height="80"
                width="80"
                color="#e5dfd3"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperClass={style.gallery__loader}
            />
        </li>
    );
};
