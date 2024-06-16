import React from "react";

import styles from "./Button.module.scss";
type Button = {
  label: string;
  onClick?: () => void;
};
export const Button = ({ label, onClick }: Button) => {
  return (
    <button onClick={onClick} className={styles.container}>
      {label}
    </button>
  );
};
