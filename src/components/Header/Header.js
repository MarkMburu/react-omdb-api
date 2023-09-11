import React from "react";
import styles from "./Header.module.css"
const Header =(props) => {
    return (
        <div className={styles.pageTitleContainer}>
            <h1 className={styles.pageTitleText}>{props.heading}</h1>
        </div>
    )
}

export default Header;