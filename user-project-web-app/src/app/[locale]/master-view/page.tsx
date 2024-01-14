"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import useFetchData from "../hooks/useFetchData";
import { useRouter } from "next/navigation";
import CrudComponents from "../../components/CrudComponents";
import { useLocale } from "next-intl";
import Image from "next/image";


interface MasterViewProps {
  params: {
    translations: {
      title: string;
      id: string;
      fullName: string;
      email: string;
      operations: string;
      new: string;
      edit: string;
      delete: string;
      noUser: string;
    };
  };
}


// Just Getting props and handling them
// This component is the MasterView where the user find all the crud operations
export default function MasterView({
  params
}: MasterViewProps) {
  // I Like to style this way in generale or if im using tailwind, it is cleaner in general
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
    noData:
      "flex flex-col justify-center items-center bg-white/80 dark:bg-gray-800/80 shadow-xl rounded-xl text-center font-semibold text-gray-800 dark:text-gray-200 p-2 h-28",
    loading: "h-full w-full flex justify-center items-center",
  };

  // To Handle the language change
  const locale = useLocale();
  // Calling the useHook i made to fetch the users
  const { users, loading } = useFetchData("http://localhost:8000/users");
  // Using the useRouter hook to redirect to the relevant page
  const router = useRouter();
  // To filter the users based on what had been inputted in the search bar
  const [filterText, setFilterText] = useState("");

  // Event handler function for handling changes in the filter input.
  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Updating the state variable (filterText) with the current value of the filter input.
    setFilterText(event.target.value);
  };

  // Filtering the list of users based on the filterText.
  const filteredUsers = users
    ? users.filter((user: any) =>
        // Using a case-insensitive regular expression to test if the filterText matches the username.
        new RegExp(filterText, "i").test(user.Username)
      )
    : [];

  return (
    <div className={`${styles.container}`}>
      {loading ? (
        <div className={styles.loading}>
          <Image src="/rocket.gif" alt="rocket" width={300} height={300} />
        </div>
      ) : (
        <div className={`${styles.subContainer}`}>
          <h1 className={`${styles.header}`}>{params.translations.title}</h1>
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
              <span className="hidden md:block ">{params.translations.new}</span>
              <FontAwesomeIcon icon={faPlus} className="md:hidden" />
            </button>
          </div>
          <ul className={`${styles.headersContainer}`}>
            <li className={`${styles.headers} w-[10%] text-center`}>
              {params.translations.id}
            </li>
            <li className={`${styles.headers} w-[40%] pl-2 text-start`}>
              {params.translations.fullName}
            </li>
            <li className={`${styles.headers} w-[50%] pl-2 text-start`}>
              {params.translations.email}
            </li>
            <li className={`${styles.headers} w-1/4`}>
              {params.translations.operations}
            </li>
          </ul>
          {filteredUsers.length > 0 ? (
            <ul className={`${styles.ul}`}>
              {filteredUsers.map((user: any) => (
                <CrudComponents
                  key={user.ID}
                  user={user}
                  translations={params.translations}
                />
              ))}
            </ul>
          ) : (
            <div className={styles.noData}>
              <Image
                src="/AnimatedSkating.gif"
                height={100}
                width={100}
                alt="Skating Friend"
              />
              <p className="w-full text-xl font-bold">{params.translations.noUser}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
