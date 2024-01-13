import NotFound from "../not-found";
import { useTranslations } from "next-intl";
 
export default function CatchAllPage() {
    const t = useTranslations("NotFound");
  return <div><NotFound notFound={t("NotFound")} redirect={t("Redirect")}/></div>
}