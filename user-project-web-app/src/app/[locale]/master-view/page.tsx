"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import useFetchData from "../hooks/useFetchData";
import { useRouter } from "next/navigation";
import CrudComponents from "../../components/CrudComponents";
import { useLocale } from "next-intl";

export default function MasterView({
  translations,
}: {
  translations: {
    title: string,
    id: string,
    fullName: string,
    email: string,
    createdAt: string,
    updatedAt: string,
    operations: string,
    new: string,
    edit: string,
    delete: string,
  };
}) {
  const styles = {
    container: "flex flex-col justify-around w-full max-w-2xl h-min-screen",
    header: "text-4xl font-extrabold text-center pt-4 dark:text-white",
    subContainer:
      "flex flex-col justify-start w-min-screen h-min-screen bg-white/50 shadow-2xl dark:bg-black/50 backdrop-blur-lg p-2 rounded-xl gap-y-4",
    filter:
      "bg-white rounded-xl border-transparent appearance-none border border-gray-300 w-11/12 py-2 pl-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",
    ul: "w-full flex flex-col gap-y-2",
    headersContainer: "flex gap-x-2",
    headers:
      "bg-black dark:bg-white dark:text-gray-800 text-gray-200 rounded-xl text-center font-semibold max-[450px]:text-[8px] max-[700px]:text-[12px] py-1",
    containerHeader: "flex gap-x-1",
    button:
      "w-1/12 bg-blue-400 rounded-lg text-center hover:bg-blue-500 transition duration-300 ease-in-out font-semibold text-white",
  };

  const locale = useLocale();
  const { users } = useFetchData("http://localhost:8000/users");
  const router = useRouter();
  const [filterText, setFilterText] = useState("");

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value);
  };

  const filteredUsers = users
    ? users.filter((user: any) =>
        new RegExp(filterText, "i").test(user.Username)
      )
    : [];

  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.subContainer}`}>
        <h1 className={`${styles.header}`}>{translations.title}</h1>
        <div className={`${styles.containerHeader}`}>
          <input
            type="text"
            value={filterText}
            onChange={handleFilterChange}
            placeholder="Filter by username"
            className={`${styles.filter}`}
          />
          <button
            onClick={() => router.push(`${locale}/detailed-view/create`)}
            className={styles.button}
          >
            <span className="hidden md:block ">{translations.new}</span>
            <FontAwesomeIcon icon={faPlus} className="md:hidden" />
          </button>
        </div>
        <ul className={`${styles.headersContainer}`}>
          <li className={`${styles.headers} w-[10%] text-center`}>
            {translations.id}
          </li>
          <li className={`${styles.headers} w-[40%] pl-2 text-start`}>
            {translations.fullName}
          </li>
          <li className={`${styles.headers} w-[50%] pl-2 text-start`}>
            {translations.email}
          </li>
          <li className={`${styles.headers} w-1/4`}>
            {translations.operations}
          </li>
        </ul>
        <ul className={`${styles.ul}`}>
          {filteredUsers.map((user: any) => (
            <CrudComponents
              key={user.ID}
              user={user}
              translations={translations}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
