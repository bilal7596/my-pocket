import { useHref } from "react-router-dom";
import { links } from "../../Utilities/Constants";
import { getSelectedClass } from "../../Utilities/Utility";
import CustomLink from "../../Common/CustomLink";



const Links = () => {

    const href = useHref();

    const selectedClass = (path) => getSelectedClass(href, path);

    return <div className='links'>
        <ul>
            { links.map( ({ text, to }, id) => <li key={id}>
                <CustomLink to={to} className={selectedClass(to)}>{text}</CustomLink>
            </li>) }
        </ul>
    </div>
}

export default Links;