import { Link, useHref } from "react-router-dom";
import { links } from "../../Utilities/Constants";
import { getSelectedClass } from "../../Utilities/Utility";



const Links = () => {

    const href = useHref();

    const selectedClass = (path) => getSelectedClass(href, path);

    return <div className='links'>
        <ul>
            { links.map( ({ text, to }, id) => <li key={id}>
                <Link to={to} className={selectedClass(to)}>{text}</Link>
            </li>) }
        </ul>
    </div>
}

export default Links;