import { createContext, useState, useContext } from "react";

const LocaleContext = createContext();

export function LocaleProvider({ defaultValue, children }) {
  const [locale, setLocale] = useState(defaultValue);
  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("Cannot find LocaleProvider");
  }
  return context.locale;
}

export function useSetLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("Cannot find LocaleProvider");
  }
  return context.setLocale;
}
