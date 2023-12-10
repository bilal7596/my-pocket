import { Link, useHref } from "react-router-dom";
import { arrow, filters, links, list, tag } from "../../Utilities/Constants";
import "../../Styles/SideNav.css"
import Svg from "../../Common/Svg";
import { getSelectedClass } from "../../Utilities/Utility";
import ButtonWithSvg from "../../Common/ButtonWithSvg";

const SideNav = () => {
    const href = useHref();

    const selectedClass = (path) => getSelectedClass(href, path);

    return <div className="side-nav">
        <nav>
            { links.map( ({ to, icon, text }, key) => <Link key={key} to={to} className={`side-nav-list${selectedClass(to)}`}>
                <Svg svgName={icon} />
                <span>{text}</span>
            </Link> ) }

            <h4 className="side-nav-title">Lists</h4>
            <Link to={'/saves/lists'} className={`side-nav-list${selectedClass('/saves/lists')}`}>
                <Svg svgName={list} />
                <span>All Lists</span>
            </Link>


            <h4 className="side-nav-title">Filters</h4>
            { filters.map( ({ to, icon, text }, key) => <Link key={key} to={to} className={`side-nav-list${selectedClass(to)}`}>
                <Svg svgName={icon} />
                <span>{text}</span>
            </Link> ) }

            <h4 className="side-nav-title">Tags</h4>
            <Link to={'/saves/tags'} className={`side-nav-list${selectedClass('/saves/tags')}`}>
                <Svg svgName={tag} />
                <span>All Tags</span>
            </Link>
            
        </nav>
        <div className="bottom-nav">
            <ButtonWithSvg svgName={arrow} />
        </div>
    </div>
}

export default SideNav;