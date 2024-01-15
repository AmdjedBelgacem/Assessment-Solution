import { useState } from 'react';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';

const useUpdateData = () => {
  // Use Toast for more user friendly experience
  const toast = useToast();

  const updateUser = async (userId: number, formData: any) => {
    try {
      // Make API request to update user
      const response = await axios.put(`http://localhost:8000/users/${userId}`, formData);
      toast({
        title: 'User Updated.',
        description: 'User has been updated successfully.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      return response.data;
    } 
    // Catch and display errors if any
    catch (error) {
      console.error('Error:', error);
    }
  };

  return { updateUser };
};

export default useUpdateData;
