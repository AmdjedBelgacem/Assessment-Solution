import Edit from "@/app/components/Edit";
import { useTranslations } from "next-intl";

export default function Page({
  params,
}: {
  params: {
    editId: number;
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
    EditAUser: d("EditAUser"),
    Back: d("Back"),
  };
  return <Edit params={params} mTranslations={mTranslations} dTranslations={dTranslations} actionText={d("Save")}/>;
}
