import { useEffect, useState } from 'react';
import axios from 'axios';
import { Flip, toast } from 'react-toastify';

export default function useImageSearch(query, pageNumber, category) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [pictures, setPictures] = useState([]);
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
        setPictures([]);
    }, [query, category]);

    useEffect(() => {
        // if (query === '') return;

        setLoading(true);
        setError(false);
        let cancel;

        axios({
            method: 'GET',
            url: 'https://pixabay.com/api/',
            params: {
                q: query,
                category: category,
                page: pageNumber,
                key: '32580975-99621fb8f6adf27d1590057a5',
                image_type: 'photo',
                orientation: 'horizontal',
                per_page: 30,
            },
            cancelToken: new axios.CancelToken(c => (cancel = c)),
        })
            .then(res => {
                if (res.data.totalHits === 0) {
                    return toast.error('Wrong request! Please try again.', {
                        transition: Flip,
                    });
                }
                setPictures(prevState => {
                    return [...prevState, ...res.data.hits];
                });
                setHasMore(res.data.hits.length > 0);
                if (res.data.hits.length === 0) {
                    return toast.success(
                        'You have reached the end of the gallery.',
                        {
                            transition: Flip,
                        }
                    );
                }
            })
            .catch(e => {
                if (axios.isCancel(e)) return;
                setError(true);
                toast.error('An error occurred. Please try again later.', {
                    transition: Flip,
                });
            })
            .finally(() => {
                setLoading(false);
            });
        return () => cancel();
    }, [query, pageNumber, category]);

    return { loading, error, pictures, hasMore };
}
