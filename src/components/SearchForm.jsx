import { useEffect, useState } from "react";
import useTranslate from "../hooks/useTranslate";
import styles from "./SearchForm.module.css";

function SearchForm({ initialValue = "", onSubmit }) {
  const t = useTranslate();
  const [keyword, setKeyword] = useState(initialValue);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSubmit(keyword);
  };

  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

  useEffect(() => {
    setKeyword(initialValue);
  }, [initialValue]);

  return (
    <form className={styles.form} onSubmit={handleSearchSubmit}>
      <input
        name="search"
        value={keyword}
        onChange={handleChange}
        placeholder={t("search placeholder")}
      />
      <button className={styles.searchBtn} type="submit">
        {t("search button")}
      </button>
    </form>
  );
}

export default SearchForm;
