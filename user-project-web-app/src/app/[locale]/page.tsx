import MasterView from "./master-view/page";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("MasterView");
  const translations = {
    title: t('title'),
    id: t('ID'),
    fullName: t('FullName'),
    email: t('Email'),
    createdAt: t('CreatedAt'),
    updatedAt: t('UpdatedAt'),
    operations: t('Operations'),
    new: t('New'),
    edit: t('Edit'),
    delete: t('Delete'),
  }
  return <MasterView translations={translations}/>;
}
