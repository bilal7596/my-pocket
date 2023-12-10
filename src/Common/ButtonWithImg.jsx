import React from "react";
import Button from "./Button";
import "../Styles/ButtonWithImg.css";

const ButtonWithImg = React.forwardRef( ({ props }, ref) => {

    const renderHtml = <span className="profile-image-wrapper">
        <img src="https://lh3.googleusercontent.com/a-/AOh14Gh5XPdMcpmv44uiw7koXQZy-zMhj9hjvwDw41TthA=s96-c" className="profile-image"></img>
    </span>

    return <Button {...props} className={props?.className ? props.className.concat("icon") : "icon"} ref={ref}>{renderHtml}</Button>
});

export default ButtonWithImg;