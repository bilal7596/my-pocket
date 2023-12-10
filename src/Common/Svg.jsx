import { useState } from "react";
import { getSvgJsx } from "../Utilities/Utility";

const Svg = ({ svgName }) => {
    const [svgWrapperClass, setSvgWrapperClass] = useState(['svg-wrapper']);

    return <span className={svgWrapperClass.join(' ')}>
        { getSvgJsx(svgName) }
    </span>
}

export default Svg;