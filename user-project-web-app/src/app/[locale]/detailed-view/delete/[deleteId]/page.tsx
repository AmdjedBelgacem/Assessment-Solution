import Delete from "@/app/components/Delete";
import { useTranslations } from "next-intl";

// The idea from params is to extract the id from the url
// This component is the DetailedView where the user find all the infos about a specific user and Delete it if needed.
export default function Page({
  params,
}: {
  params: {
    deleteId: number;
  };
}) {
  // Calling the useTranslations, to control language change within the page
  const m = useTranslations("MasterView");
  const mTranslations = {
    id: m("ID"),
    fullName: m("FullName"),
    email: m("Email"),
  };

  const d = useTranslations("DetailedView");
  const dTranslations = {
    username: d("Username"),
    gender: d("Gender"),
    birthDate: d("BirthDate"),
    phoneNumber: d("PhoneNumber"),
    male: d("Male"),
    female: d("Female"),
    notAssigned: d("NotAssigned"),
    createdAt: d("CreatedAt"),
    lastUpdated: d("LastUpdated"),
    DeleteAUser: d("DeleteAUser"),
    Back: d("Back"),
  };
  return (
    <Delete
      params={params}
      mTranslations={mTranslations}
      dTranslations={dTranslations}
      actionText={d("Delete")}
    />
  );
}
