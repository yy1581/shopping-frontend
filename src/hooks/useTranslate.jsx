import { useLocale } from "../contexts/LocaleContext";
import ko from "../../public/locale/ko.json";
import en from "../../public/locale/en.json";

const dict = { ko, en };

function useTranslate() {
  const locale = useLocale();
  // 현재 locale에 번역이 없으면 영어(en)로, 영어에도 없으면 key 자체를 반환합니다.
  const translate = (key) => dict[locale]?.[key] || dict.en[key] || key;
  return translate;
}

export default useTranslate;
