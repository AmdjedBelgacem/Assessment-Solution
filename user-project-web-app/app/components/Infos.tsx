import React from "react";

// Just Getting props and handling them
export default function Infos({
  user,
  mTranslations,
  dTranslations,
}: {
  user: {
    id: number;
    username: string;
    fullName: string;
    email: string;
    gender: string;
    birthDate: string;
    phoneNumber: string;
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
    Back: string;
  };
}) {
  // I Like to style this way in generale or if im using tailwind, it is cleaner in general
  const styles = {
    innerContainer:
      "flex flex-col justify-between w-full bg-white/50 shadow-2xl dark:bg-black/50 backdrop-blur-lg h-full rounded-xl p-2 gap-y-2 h-68 text-gray-800 dark:text-gray-200",
    li: "w-full flex bg-white/80 shadow-2xl dark:bg-gray-600/80 p-2 rounded-xl",
    p: "w-1/2 h-6 overflow-auto",
  };
  return (
    <div>
      <ul className={`${styles.innerContainer}`}>
        <li className={`${styles.li} font-semibold`}>
          <p className={`${styles.p} font-bold`}>{mTranslations.id} </p>
          <p className={`${styles.p}`}>{user.id}</p>
        </li>
        <li className={`${styles.li} font-semibold`}>
          <p className={`${styles.p} font-bold`}>{dTranslations.username} </p>
          <p className={`${styles.p}`}>{user.username}</p>
        </li>
        <li className={`${styles.li} font-semibold`}>
          <p className={`${styles.p} font-bold`}>{mTranslations.fullName} </p>
          <p className={`${styles.p}`}>{user.fullName}</p>
        </li>
        <li className={`${styles.li} font-semibold`}>
          <p className={`${styles.p} font-bold`}>{mTranslations.email} </p>
          <p className={`${styles.p}`}>{user.email}</p>
        </li>
        <li className={`${styles.li} font-semibold`}>
          <p className={`${styles.p} font-bold`}>{dTranslations.gender} </p>
          <p className={`${styles.p}`}>{user.gender}</p>
        </li>
        <li className={`${styles.li} font-semibold`}>
          <p className={`${styles.p} font-bold`}>{dTranslations.birthDate} </p>
          <p className={`${styles.p}`}>{user.birthDate}</p>
        </li>
        <li className={`${styles.li} font-semibold`}>
          <p className={`${styles.p} font-bold`}>
            {dTranslations.phoneNumber}{" "}
          </p>
          <p className={`${styles.p}`}>{user.phoneNumber}</p>
        </li>
      </ul>
    </div>
  );
}
