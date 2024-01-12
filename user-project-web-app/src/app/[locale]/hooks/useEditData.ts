import { useState } from 'react';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';

const useUpdateData = () => {
  const [loading, setLoading] = useState(false);
  const [actionText, setActionText]= useState<string>("Save")
  const toast = useToast();

  const updateUser = async (userId: number, formData: any) => {
    try {
      setLoading(true);
      const response = await axios.put(`http://localhost:8000/users/${userId}`, formData);
      toast({
        title: 'User Updated.',
        description: 'User has been updated successfully.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      return response.data;
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return { updateUser, loading, actionText };
};

export default useUpdateData;
