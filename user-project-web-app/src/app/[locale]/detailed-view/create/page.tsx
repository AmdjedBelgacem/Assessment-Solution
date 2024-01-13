import Create from "@/app/components/Create";
import { useTranslations } from "next-intl";

export default function Page() {
  const m = useTranslations("MasterView");
  const mTranslations = {
    id: m("ID"),
    fullName: m("FullName"),
    email: m("Email"),
  };

  const d = useTranslations("DetailedView");
  const dTranslations = {
    createAUser: d("CreateAUser"),
    Back: d("Back"),
  };
  return <Create mTranslations={mTranslations} dTranslations={dTranslations} actionText={d("Create")}/>;
}
