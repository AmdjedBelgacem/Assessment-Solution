import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchData = (url: string, id?: number) => {
  // Use State for storing data
  const [users, setUsers] = useState<any>(null);
  // Use State to Check if data is loading or not
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // If data fetched then stop loading 
        setLoading(false);
        // Make API request to fetch data
        const response = await axios.get(id ? `${url}/${id}` : url);
        setUsers(response.data);
      } 
      // Catch and display errors if any
      catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [url, id]);

  return { users, loading };
};

export default useFetchData;
