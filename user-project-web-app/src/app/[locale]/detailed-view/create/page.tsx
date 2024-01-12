"use client";
import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import useCreateData from "@/app/[locale]/hooks/useCreateData";

interface FormData {
  Username: string;
  Email: string;
}
export default function Create() {
  const styles = {
    container:
      "flex flex-col justify-start h-min-screen max-w-2xl w-11/12 bg-white/50 shadow-2xl dark:bg-black/50 backdrop-blur-lg p-3 rounded-xl gap-y-4 dark:text-white",
    subContainer: "flex flex-col justify-between h-62",
    header: "text-4xl font-extrabold text-center pt-4",
    form: "flex flex-col justify-between h-full gap-y-4 bg-white/80 shadow-2xl dark:bg-black/50 backdrop-blur-lg rounded-xl p-4",
    label: "block text-sm font-bold mb-2",
    input:
      "bg-gray-200 rounded-xl border-transparent appearance-none border border-gray-300 w-full py-2 pl-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",
    button:
      "bg-blue-500/90 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline",
  };
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    Username: "",
    Email: "",
  });

  const { createUser, actionText, loading } = useCreateData();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createUser(formData);
    setFormData({
      Username: "",
      Email: "",
    });
  };

  return (
    <div className={`${styles.container}`}>
      <h1 className={`${styles.header}`}>Create a User</h1>
      <div className={`${styles.subContainer}`}>
        <form onSubmit={handleSubmit} className={`${styles.form}`}>
          <div>
            <label htmlFor="username" className={`${styles.label}`}>
              Username
            </label>
            <input
              type="text"
              name="Username"
              id="username"
              value={formData.Username}
              onChange={(e) =>
                setFormData({ ...formData, Username: e.target.value })
              }
              className={`${styles.input}`}
              required
            />
          </div>
          <div>
            <label htmlFor="email" className={`${styles.label}`}>
              Email
            </label>
            <input
              type="email"
              name="Email"
              id="email"
              value={formData.Email}
              onChange={(e) =>
                setFormData({ ...formData, Email: e.target.value })
              }
              className={`${styles.input}`}
              required
            />
          </div>
          <button type="submit" className={`${styles.button}`}>
            {actionText}
          </button>
        </form>
      </div>
      <button
        onClick={() => router.push("/")}
        className="bg-orange-500/80 rounded-xl h-10 font-semibold hover:bg-orange-600 transition duration-300 ease-in-out text-white backdrop-blur-lg"
      >
        Back
      </button>
    </div>
  );
}
