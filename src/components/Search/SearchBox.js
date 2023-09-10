import React from "react";
import styles from "./SearchBox.module.css"

const SearchBox = (props) =>{
    return(
        <div className={styles.inputContainer}>
            <input
            className={styles.searchInput} 
            value={props.value}
            onChange={(event)=> {
                props.setSearchValue(event.target.value)
            }}
            placeholder={props.placeholder}>
            </input>
        </div>
    )
}
export default SearchBox;