import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchData = (url: string, id?: number) => {
  const [users, setUsers] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(false);
        const response = await axios.get(id ? `${url}/${id}` : url);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [url, id]);

  return { users, loading };
};

export default useFetchData;
