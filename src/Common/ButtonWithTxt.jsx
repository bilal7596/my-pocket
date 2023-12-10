
import { useEffect, useState } from "react";

const ButtonWithTxt = ({ text }) => {

    const [buttonClass, setButtonClass] = useState([]);
    
    return <button type="button" className={buttonClass.join(' ')} >
        {text}    
    </button>
}

export default ButtonWithTxt;