import axios from "axios";
import { useToast } from "@chakra-ui/react";
import useFetchData from "./useFetchData"; // Import the useFetchData hook

const useCreateData = () => {
  // Use Toast for more user-friendly experience
  const toast = useToast();

  // Use FetchData hook to get existing users
  const { users: allUsers, loading: fetchingUsers } = useFetchData("http://localhost:8000/users");

  const createUser = async (data:any) => {
    const { Username, Email } = data;

    // Check if the username or email already exists
    const userExists = allUsers && allUsers.some((user: { Username: any; Email: any; }) => user.Username === Username || user.Email === Email);

    if (userExists) {
      // Displaying a warning in the case if the username or email already exists
      toast({
        title: "User creation failed.",
        description: "Username or email already exists. Please choose a different one.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    try {
      // Creating a user if the username or email doesn't exist
      const response = await axios.post("http://localhost:8000/users", data);
      toast({
        title: "User Created.",
        description: "User has been created successfully.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: "Unable to create user.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      console.error("Error:", error);
    }
  };

  return { createUser, fetchingUsers };
};

export default useCreateData;
