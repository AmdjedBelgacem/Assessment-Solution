"use client";
import React, { useState } from "react";
import Infos from "@/app/components/Infos";
import useUpdateData from "@/app/[locale]/hooks/useEditData";
import useFetchData from "@/app/[locale]/hooks/useFetchData";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface FormData {
  Username: string;
  Email: string;
}

export default function Edit({
  params,
  mTranslations,
  dTranslations,
  actionText,
}: {
  params: { editId: number };
  mTranslations: {
    id: string;
    fullName: string;
    email: string;
  };
  dTranslations: {
    createdAt: string;
    lastUpdated: string;
    EditAUser: string;
    Back: string;
  };
  actionText: string;
}) {
  const { updateUser } = useUpdateData();
  const router = useRouter();
  const { users, loading } = useFetchData(
    "http://localhost:8000/users",
    params.editId
  );
  const [formData, setFormData] = useState<FormData>({
    Username: "",
    Email: "",
  });

  const styles = {
    container:
      "flex flex-col justify-start h-min-screen max-w-2xl w-11/12 bg-white/50 shadow-2xl dark:bg-black/50 backdrop-blur-lg p-3 rounded-xl gap-y-4 text-gray-800 dark:text-gray-200",
    header: "text-4xl font-extrabold text-center pt-4 dark:text-white",
    form: "flex flex-col w-full h-min-screen justify-between bg-white/50 shadow-2xl dark:bg-black/50 backdrop-blur-lg rounded-xl p-2 gap-y-2",
    inputContainer:
      "w-full flex bg-white/80 shadow-2xl dark:bg-gray-600/80 backdrop-blur-lg p-2 rounded-xl items-center",
    label: "w-2/5 min-[485px]:w-1/5 font-bold",
    input: "w-3/5 min-[485px]:w-4/5 pl-2 rounded-md py-1",
    button:
      "bg-green-500/90 p-2 rounded-xl font-semibold hover:bg-green-600 transition duration-300 ease-in-out text-white backdrop-blur-lg",
    loading: "h-full w-full flex justify-center items-center",
  };

  return (
    <div className={styles.loading}>
      {loading ? (
        <div className={styles.loading}>
          <Image src="/rocket.gif" alt="rocket" width={300} height={300} />
        </div>
      ) : (
        <div className={styles.container}>
          <h1 className={`${styles.header}`}>{dTranslations.EditAUser}</h1>
          <Infos
            user={users ? users : []}
            mTranslations={mTranslations}
            dTranslations={dTranslations}
          />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateUser(params.editId, formData);
              setTimeout(() => {
                router.push("/");
              }, 1000);
            }}
            className={styles.form}
          >
            <div className={`${styles.inputContainer}`}>
              <label htmlFor="email" className={styles.label}>
                {mTranslations.fullName}
              </label>
              <input
                type="text"
                name="Username"
                placeholder="Username"
                id="email"
                className={`${styles.input}`}
                onChange={(e) =>
                  setFormData({ ...formData, Username: e.target.value })
                }
                required
              />
            </div>
            <div className={`${styles.inputContainer}`}>
              <label htmlFor="email" className={styles.label}>
                {mTranslations.email}
              </label>
              <input
                type="email"
                name="Email"
                id="email"
                placeholder="Email"
                className={`${styles.input}`}
                onChange={(e) =>
                  setFormData({ ...formData, Email: e.target.value })
                }
                required
              />
            </div>
            <button type="submit" className={styles.button}>
              {actionText}
            </button>
          </form>
          <button
            onClick={() => router.push("/")}
            className="bg-orange-500/80 rounded-xl h-10 font-semibold hover:bg-orange-600 transition duration-300 ease-in-out text-white backdrop-blur-lg"
          >
            {dTranslations.Back}
          </button>
        </div>
      )}
    </div>
  );
}
