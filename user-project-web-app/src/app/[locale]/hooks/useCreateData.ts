import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

const useCreateData = () => {
  const toast = useToast();

  const createUser = async (data: any) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/users",
        data
      );
      toast({
        title: "User Created.",
        description: "User has been Created successfully.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: "Unable to Create user.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      console.error("Error:", error);
    } 
  };
  
  return {createUser}
};

export default useCreateData