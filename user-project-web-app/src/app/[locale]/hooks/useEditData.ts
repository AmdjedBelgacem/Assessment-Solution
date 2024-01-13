import { useState } from 'react';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';

const useUpdateData = () => {
  const toast = useToast();

  const updateUser = async (userId: number, formData: any) => {
    try {
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
    }
  };

  return { updateUser };
};

export default useUpdateData;
