"use client";
import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import useCreateData from "../hooks/useCreateData";
import { Button } from "@chakra-ui/react";

// Interface to handle the types of data im using in the formData that im posting
interface FormData {
  Username: string;
  FullName: string;
  Email: string;
  Gender: string;
  BirthDate: string;
  PhoneNumber: string;
}
// Just Getting props and handling them
export default function Create({
  mTranslations,
  dTranslations,
  actionText,
}: {
  mTranslations: {
    id: string;
    fullName: string;
    email: string;
  };
  dTranslations: {
    createAUser: string;
    Back: string;
    username: string;
    gender: string;
    birthDate: string;
    phoneNumber: string;
    male: string;
    female: string;
    notAssigned: string;
  };
  actionText: string;
}) {
  // I Like to style this way in generale or if im using tailwind, it is cleaner in general
  const styles = {
    container:
      "flex flex-col justify-start h-min-screen max-w-2xl w-full bg-white/50 shadow-2xl dark:bg-black/50 backdrop-blur-lg p-2 md:p-3 rounded-xl gap-y-4 dark:text-white",
    subContainer: "flex flex-col justify-between h-62",
    header: "text-4xl font-extrabold text-center pt-4",
    form: "flex flex-col justify-between h-full gap-y-4 bg-white/80 shadow-2xl dark:bg-black/50 backdrop-blur-lg rounded-xl p-4",
    label: "block text-sm font-bold mb-2",
    input:
      "bg-gray-200 rounded-xl border-transparent appearance-none border border-gray-300 w-full py-2 pl-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",
    button:
      "bg-blue-500/90 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline",
    genderContainer: "flex flex-col md:flex-row w-full justify-around font-medium",
    genderInnerContainer: "flex gap-x-2 items-center",
    inputContainer:
      "w-full flex md:flex-col gap-x-6 items-center md:items-start",
  };
  // Using the useRouter hook to redirect to the relevant page
  const router = useRouter();
  // State variable to track the form data
  const [formData, setFormData] = useState<FormData>({
    Username: "",
    FullName: "",
    Email: "",
    Gender: "",
    BirthDate: "",
    PhoneNumber: "",
  });

  // Calling the useHook i made
  const { createUser } = useCreateData();

  // Button Loading for better user experience
  const [backLoading, setBackLoading] = useState<boolean>(false);

  // Handling form Submitting to database
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createUser(formData);
    setFormData({
      Username: "",
      FullName: "",
      Email: "",
      Gender: "",
      BirthDate: "",
      PhoneNumber: "",
    });
  };

  return (
    <div className={`${styles.container}`}>
      <h1 className={`${styles.header}`}>{dTranslations.createAUser}</h1>
      <div className={`${styles.subContainer}`}>
        <form onSubmit={handleSubmit} className={`${styles.form}`}>
          <div>
            <label htmlFor="username" className={`${styles.label}`}>
              {dTranslations.username}
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
              placeholder="JohnDoe123"
              required
            />
          </div>
          <div>
            <label htmlFor="FullName" className={`${styles.label}`}>
              {mTranslations.fullName}
            </label>
            <input
              type="text"
              name="FullName"
              id="FullName"
              value={formData.FullName}
              onChange={(e) =>
                setFormData({ ...formData, FullName: e.target.value })
              }
              className={`${styles.input}`}
              placeholder="John Doe"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className={`${styles.label}`}>
              {mTranslations.email}
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
              placeholder="example@gmail.com"
              required
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="gender" className={styles.label}>
              {dTranslations.gender}
            </label>
            <div id="gender" className={styles.genderContainer}>
              <div className={styles.genderInnerContainer}>
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  onChange={(e) =>
                    setFormData({ ...formData, Gender: e.target.value })
                  }
                />
                <label htmlFor="male">{dTranslations.male}</label>
              </div>
              <div className={styles.genderInnerContainer}>
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  onChange={(e) =>
                    setFormData({ ...formData, Gender: e.target.value })
                  }
                />
                <label htmlFor="female">{dTranslations.female}</label>
              </div>
              <div className={styles.genderInnerContainer}>
                <input
                  type="radio"
                  id="notAssigned"
                  name="gender"
                  value="notAssigned"
                  onChange={(e) =>
                    setFormData({ ...formData, Gender: e.target.value })
                  }
                />
                <label htmlFor="notAssigned">{dTranslations.notAssigned}</label>
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="BirthDate" className={`${styles.label}`}>
              {dTranslations.birthDate}
            </label>
            <input
              type="date"
              name="BirthDate"
              id="BirthDate"
              value={formData.BirthDate}
              onChange={(e) =>
                setFormData({ ...formData, BirthDate: e.target.value })
              }
              className={`${styles.input}`}
              required
            />
          </div>
          <div>
            <label htmlFor="PhoneNumber" className={`${styles.label}`}>
              {dTranslations.phoneNumber}
            </label>
            <input
              type="text"
              name="PhoneNumber"
              id="PhoneNumber"
              value={formData.PhoneNumber}
              onChange={(e) =>
                setFormData({ ...formData, PhoneNumber: e.target.value })
              }
              className={`${styles.input}`}
              placeholder="+90 123 456 7890"
              required
            />
          </div>

          <button type="submit" className={`${styles.button}`}>
            {actionText}
          </button>
        </form>
      </div>
      {backLoading ? (
        <Button
          isLoading
          variant="outline"
          spinnerPlacement="start"
          loadingText="Redirecting"
          disabled
          colorScheme="orange"
          borderRadius={`10px`}
          onClick={() => router.push("/")}
        >
          {dTranslations.Back}
        </Button>
      ) : (
        <Button
          colorScheme="orange"
          borderRadius={`10px`}
          onClick={() => {
            setBackLoading(true);
            router.push("/");
          }}
        >
          {dTranslations.Back}
        </Button>
      )}
    </div>
  );
}
