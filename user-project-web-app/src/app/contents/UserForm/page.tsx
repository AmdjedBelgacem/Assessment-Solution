"use client";
import React, { useState } from "react";
import axios from "axios";

interface UserFormProps {
  onSubmit: (formData: FormData) => void;
  onCancel: () => void;
  actionText: string;
}

interface FormData {
  Username: string;
  Email: string;
}

const UserForm: React.FC<UserFormProps> = ({ onCancel, actionText }) => {
  const onSubmit = async (formData: FormData) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/users",
        formData
      );
      console.log("Server response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const [formData, setFormData] = useState<FormData>({
    Username: "",
    Email: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="text-blue-500">
        <h1>Users</h1>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="Username"
          value={formData.Username}
          onChange={handleInputChange}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="Email"
          value={formData.Email}
          onChange={handleInputChange}
        />
        <button type="submit">submit</button>
      </form>

      <form onSubmit={(e) => e.preventDefault()} className="text-red-500">
        <h1>Delete User</h1>
        <label htmlFor="userId">User ID</label>
        <input
          type="number"
          id="userId"
          name="userId"
          value={formData.userId}
          onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
        />
        <button
          type="button"
          onClick={() => {
            const userId = parseInt(formData.userId);
            axios.delete(`http://localhost:8000/users/${userId}`)
              .then(response => {
                console.log("Server response:", response.data);
              })
              .catch(error => {
                console.error("Error:", error);
              });
          }}
        >
          Delete User
        </button>
      </form>
    </div>
  );
};

export default UserForm;
