import Delete from "@/app/components/Delete";
import { useTranslations } from "next-intl";

export default function Page({
  params,
}: {
  params: {
    deleteId: number;
  };
}) {
  const m = useTranslations("MasterView");
  const mTranslations = {
    id: m("ID"),
    fullName: m("FullName"),
    email: m("Email"),
  };

  const d = useTranslations("DetailedView");
  const dTranslations = {
    createdAt: d("CreatedAt"),
    lastUpdated: d("LastUpdated"),
    DeleteAUser: d("DeleteAUser"),
    Back: d("Back"),
  };
  return <Delete params={params} mTranslations={mTranslations} dTranslations={dTranslations} actionText={d("Delete")}/>;
}
