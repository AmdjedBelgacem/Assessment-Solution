"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import UserForm from "../UserForm/page";

export default function MasterView() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            {user.Username} - {user.Email}
          </li>
        ))}
      </ul>
    </div>
  );
}
