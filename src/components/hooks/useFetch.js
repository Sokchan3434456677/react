import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        setData(result);
        setError(null); // Clear error if data fetch is successful
      } catch (error) {
        if (error.name === 'TypeError') {
          // Network error, likely no internet connection
          setError('No internet connection. Please check your network.');
        } else {
          // General error
          setError('Error fetching products. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, error, loading };
};

export default useFetch;
