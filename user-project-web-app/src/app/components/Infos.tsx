import React from "react";

export default function Infos({
  user,
  mTranslations,
  dTranslations,
}: {
  user: {
    ID: number;
    Username: string;
    Email: string;
    CreatedAt?: string;
    UpdatedAt?: string;
  };
  mTranslations: {
    id: string;
    fullName: string;
    email: string;
  };
  dTranslations: {
    createdAt: string;
    lastUpdated: string;
    Back: string;
  };
}) {
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
          <p className={`${styles.p}`}>{user.ID}</p>
        </li>
        <li className={`${styles.li} font-semibold`}>
          <p className={`${styles.p} font-bold`}>{mTranslations.fullName} </p>
          <p className={`${styles.p}`}>{user.Username}</p>
        </li>
        <li className={`${styles.li} font-semibold`}>
          <p className={`${styles.p} font-bold`}>{mTranslations.email} </p>
          <p className={`${styles.p}`}>{user.Email}</p>
        </li>
        <li className={`${styles.li}`}>
          <p className={`${styles.p} font-bold`}>{dTranslations.createdAt}</p>
          <p className={`${styles.p} font-semibold`}>
            {user.CreatedAt?.slice(0, 10)} {user.CreatedAt?.slice(11, 18)}
          </p>
        </li>
        <li className={`${styles.li}`}>
          <p className={`${styles.p} font-bold`}>{dTranslations.lastUpdated}</p>
          <p className={`${styles.p} font-semibold`}>
            {user.UpdatedAt?.slice(0, 10)} {user.UpdatedAt?.slice(11, 18)}
          </p>
        </li>
      </ul>
    </div>
  );
}
