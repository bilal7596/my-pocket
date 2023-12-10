
import React, { useEffect, useState } from "react";
import '../Styles/ButtonWithSvg.css';
import Button from "./Button";
import { hamburger } from "../Utilities/Constants";
import { getSvgJsx } from "../Utilities/Utility";

const ButtonWithSvg = React.forwardRef(({ children, svgName, toolTip, theme = 'dark', buttonClassName = '', svgClassName = '', buttonName = '', ...props }, ref) => {


    const [buttonClass, setButtonClass] = useState(theme === 'light' ? 'svg-button light-icon' : 'svg-button icon');
    const [svgWrapperClass, setSvgWrapperClass] = useState('svg-wrapper');

    useEffect(() => {
        if (buttonClassName)
            setButtonClass(buttonClassName)
    }, [buttonClassName])

    useEffect(() => {
        if (svgClassName)
            setSvgWrapperClass(svgClassName)
    }, [svgClassName])

    useEffect(() => {
        switch (svgName) {
            case hamburger:
                setButtonClass( prev => {
                    prev = prev.concat(' hamburger-icon inline');
                    return prev;
                });
                break;
            default:
                break;
        }
    }, [svgName]);

    const renderHtml = <span className={svgWrapperClass}>
        { getSvgJsx(svgName) }{ buttonName ? ` ${buttonName}` : ''}
        { children }
    </span>

    return <Button ref={ref} {...props} className={buttonClass.concat(props?.className || '')}>{renderHtml}</Button>
});

export default ButtonWithSvg;