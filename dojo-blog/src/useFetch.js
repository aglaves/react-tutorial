import { useState, useEffect } from 'react';

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortController = new AbortController();

        setTimeout(() => {
         fetch(url, { signal: abortController.signal })
             .then((response) => {
                 console.log(response)
                 if (!response.ok)
                     throw Error('Could not feth data for resource.');
                 return response.json();
             })
             .then(data => {
                 console.log(data);
                 setData(data);
                 setIsPending(false);
                 setError(null);
             }).catch((err) => {
                 if (err.name === 'AbortError') {
                    console.log('Fetch aborted.');
                 }
                 setError(err.message);
                 setIsPending(false);
             });
        }, 1000);

        return () => {
            abortController.abort();
        }
     }, [url]);

     return { data, isPending, error }
}

export default useFetch;