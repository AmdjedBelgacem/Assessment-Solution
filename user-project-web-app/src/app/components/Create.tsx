"use client";
import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import useCreateData from "@/app/[locale]/hooks/useCreateData";

interface FormData {
  Username: string;
  FullName: string;
  Email: string;
  Gender: string;
  BirthDate: string;
  PhoneNumber: string;
}
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
    genderContainer: "flex w-full justify-around font-medium",
    genderInnerContainer: "flex gap-x-2 items-center",
  };
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    Username: "",
    FullName: "",
    Email: "",
    Gender: "",
    BirthDate: "",
    PhoneNumber: "",
  });

  const { createUser } = useCreateData();

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
          <div>
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

      <button
        onClick={() => router.push("/")}
        className="bg-orange-500/80 rounded-xl h-10 font-semibold hover:bg-orange-600 transition duration-300 ease-in-out text-white backdrop-blur-lg"
      >
        {dTranslations.Back}
      </button>
    </div>
  );
}

/*
<div className="h-full w-full flex justify-center items-center">
          <Image src="/rocket.gif" alt="rocket" width={400} height={400} />
        </div>
        */
