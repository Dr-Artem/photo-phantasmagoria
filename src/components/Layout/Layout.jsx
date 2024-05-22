import { Filter } from 'components/Filter/Filter';
import { Hero } from 'components/Hero/Hero';
import { Gallery } from 'components/Gallery/Gallery';
import useImageSearch from 'js/useImageSearch';
import { useCallback, useRef, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Layout = () => {
    const [input, setInput] = useState('');
    const [page, setPage] = useState(1);
    const [category, setCategory] = useState('');

    const handleFormFilter = (input, filter) => {
        setInput(input);
        setPage(1);
        setCategory(filter);
    };

    // eslint-disable-next-line
    const { loading, error, pictures, hasMore } = useImageSearch(
        input,
        page,
        category
    );

    const observer = useRef();
    const lastPictureElementRef = useCallback(
        node => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting && hasMore) {
                    setPage(prevPage => prevPage + 1);
                }
            });
            if (node) observer.current.observe(node);
        },
        [loading, hasMore]
    );

    return (
        <>
            <Hero />
            <Filter settingForm={handleFormFilter} />
            <Gallery
                pictures={pictures}
                lastPictureElementRef={lastPictureElementRef}
            />
            <ToastContainer
                position="top-right"
                hideProgressBar
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={true}
                pauseOnHover
                theme="light"
                autoClose={5000}
            />
        </>
    );
};
