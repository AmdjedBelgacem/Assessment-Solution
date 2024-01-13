import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

const useDeleteData = () => {
  const toast = useToast();

  const deleteUser = async (userId: number) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/users/${userId}`
      );
      toast({
        title: "User Deleted.",
        description: "User has been deleted successfully.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: "Unable to delete user.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      console.error("Error:", error);
    } 
  };

  return { deleteUser,  };
};

export default useDeleteData;
