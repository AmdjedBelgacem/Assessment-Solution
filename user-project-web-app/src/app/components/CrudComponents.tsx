"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

export default function CrudComponents({
  user,
  translations,
}: {
  user: {
    ID: number;
    Username: string;
    Email: string;
  };
  translations: {
    title: string;
    id: string;
    fullName: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    operations: string;
    new: string;
    edit: string;
    delete: string;
  };
}) {
  const styles = {
    li: "w-full flex justify-between",
    dataContainer:
      "flex w-4/5 h-min-screen justify-between gap-x-2 items-center font-semibold",
    data: "bg-white dark:bg-gray-800 p-1 rounded-xl dark:text-gray-200 shadow-2xl overflow-y-auto max-[450px]:text-[8px] max-[700px]:text-[12px] max-[700px]:pt-2 h-full",
    buttonContainer: "flex items-center h-8 w-1/5 pl-1 gap-x-1 font-semibold",
    button: "w-1/2 h-full rounded-lg transition duration-300 ease-in-out",
  };

  const locale = useLocale();
  const router = useRouter();

  return (
    <li className={`${styles.li}`}>
      <div className={`${styles.dataContainer}`}>
        <p className={`${styles.data} w-[10%] text-center`}>{user.ID}</p>
        <p className={`${styles.data} w-[40%] pl-2`}>{user.Username}</p>
        <p className={`${styles.data} w-[50%] pl-2`}>{user.Email}</p>
      </div>
      <div className={`${styles.buttonContainer}`}>
        <button
          onClick={() => router.push(`${locale}/detailed-view/edit/${user.ID}`)}
          className={`${styles.button} bg-yellow-500 hover:bg-yellow-600 text-white`}
        >
          <span className="hidden md:block">{translations.edit}</span>
          <FontAwesomeIcon icon={faPenToSquare} className="md:hidden" />
        </button>
        <button
          onClick={() => router.push(`${locale}/detailed-view/delete/${user.ID}`)}
          className={`${styles.button} bg-red-500 hover:bg-red-600 text-white`}
        >
          <Link href="/DetailView">
            <span className="hidden md:block">{translations.delete}</span>
            <FontAwesomeIcon icon={faTrashCan} className="md:hidden" />
          </Link>
        </button>
      </div>
    </li>
  );
}
