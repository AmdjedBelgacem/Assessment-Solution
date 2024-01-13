import NotFound from "../not-found";
import { useTranslations } from "next-intl";
 
// This component is to handle 404 pages even with language prefix
export default function CatchAllPage() {
    const t = useTranslations("NotFound");
  return <div><NotFound notFound={t("NotFound")} redirect={t("Redirect")}/></div>
}