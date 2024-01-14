"use client";
import React, { useState } from "react";
import Infos from "./Infos";
import useDeleteData from "@/app/[locale]/hooks/useDeleteData";
import useFetchData from "@/app/[locale]/hooks/useFetchData";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@chakra-ui/react";

// Just Getting props and handling them
export default function Delete({
  params,
  mTranslations,
  dTranslations,
  actionText,
}: {
  params: {
    deleteId: number;
  };
  mTranslations: {
    id: string;
    fullName: string;
    email: string;
  };
  dTranslations: {
    username: string;
    gender: string;
    birthDate: string;
    phoneNumber: string;
    male: string;
    female: string;
    notAssigned: string;
    createdAt: string;
    lastUpdated: string;
    DeleteAUser: string;
    Back: string;
  };
  actionText: string;
}) {
  // I Like to style this way in generale or if im using tailwind, it is cleaner in general
  const styles = {
    container:
      "flex flex-col justify-start h-min-screen max-w-2xl w-11/12 bg-white/50 shadow-2xl dark:bg-black/50 backdrop-blur-lg p-3 rounded-xl gap-y-4",
    header: "text-4xl font-extrabold text-center pt-4 dark:text-white",
    loading: "h-full w-full flex justify-center items-center",
  };

  // Calling the useHooks i made
  const { users, loading } = useFetchData(
    "http://localhost:8000/users",
    params.deleteId
  );
  const { deleteUser } = useDeleteData();

  // Using the useRouter hook to redirect to the relevant page
  const router = useRouter();

  // Button Loading for better user experience
  const [backLoading, setBackLoading] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  return (
    <div className={styles.loading}>
      {loading ? (
        <div className={styles.loading}>
          <Image src="/rocket.gif" alt="rocket" width={300} height={300} />
        </div>
      ) : (
        <div className={`${styles.container}`}>
          <h1 className={`${styles.header}`}>{dTranslations.DeleteAUser}</h1>
          <Infos
            user={users ? users : []}
            mTranslations={mTranslations}
            dTranslations={dTranslations}
          />
          {deleteLoading ? (
            <Button
              isLoading
              variant="outline"
              spinnerPlacement="start"
              loadingText="Deleting..."
              disabled
              colorScheme="red"
              borderRadius={`10px`}
            >
              {actionText}
            </Button>
          ) : (
            <Button
              colorScheme="red"
              borderRadius={`10px`}
              onClick={() => {
                deleteUser(params.deleteId);
                setDeleteLoading(true);
                setTimeout(() => {
                  router.push("/");
                }, 1000);
              }}
            >
              {actionText}
            </Button>
          )}
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
      )}
    </div>
  );
}
