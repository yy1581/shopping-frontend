import { useState } from "react";
import useTranslate from "../hooks/useTranslate";
import styles from "./SearchForm.module.css";

function SearchForm({ initialValue = "", onSubmit }) {
  const t = useTranslate();
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(value);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        name="search"
        value={value}
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
