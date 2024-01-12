"use client";
import React from "react";
import Infos from "../../../../components/Infos";
import useDeleteData from "@/app/[locale]/hooks/useDeleteData";
import useFetchData from "@/app/[locale]/hooks/useFetchData";
import { useRouter } from "next/navigation";

export default function Delete({
  params,
}: {
  params: {
    deleteId: number;
  };
}) {
  const styles = {
    container:
      "flex flex-col justify-start h-min-screen max-w-2xl w-11/12 bg-white/50 shadow-2xl dark:bg-black/50 backdrop-blur-lg p-3 rounded-xl gap-y-4",
    header: "text-4xl font-extrabold text-center pt-4 dark:text-white",
    deleteButton:
      "h-10 bg-red-500/90 backdrop-blur hover:bg-red-600 text-white rounded-xl font-semibold text-white p-2 hover:bg-red-600 transition duration-300 ease-in-out",
  };

  const { users } = useFetchData(
    "http://localhost:8000/users",
    params.deleteId
  );

  const { deleteUser, loading, actionText } = useDeleteData();
  const router = useRouter();

  return (
    <div className={`${styles.container}`}>
      <h1 className={`${styles.header}`}>Delete a User</h1>
      <Infos user={users ? users : []} />
      <button
        className={styles.deleteButton}
        onClick={() => {
          deleteUser(params.deleteId);
          setTimeout(() => {
            router.push("/");
          }, 1000);
        }}
      >
        {actionText}
      </button>
      <button
        onClick={() => router.push("/")}
        className="bg-orange-500/80 rounded-xl h-10 font-semibold hover:bg-orange-600 transition duration-300 ease-in-out text-white backdrop-blur-lg"
      >
        Back
      </button>
    </div>
  );
}
