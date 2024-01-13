import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

const useCreateData = () => {
  // Use Toast for more user friendly experience
  const toast = useToast();

  const createUser = async (data: any) => {
    try {
      // Make API request to create user
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
    }
    // Catch and display errors if any 
    catch (error) {
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