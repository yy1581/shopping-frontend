import { useState, createContext, useContext } from "react";

const LocaleContext = createContext();

export function LocaleProvider({ defaultValue = "ko", children }) {
  const [locale, setLocale] = useState(defaultValue);

  return (
    <LocaleContext value={{ locale, setLocale }}>{children}</LocaleContext>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale은 LocaleProvider 안에서 사용해야 합니다");
  }
  return context.locale;
}

export function useSetLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useSetLocale은 LocaleProvider 안에서 사용해야 합니다");
  }
  return context.setLocale;
}
