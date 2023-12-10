import { useHref } from "react-router-dom";
import { arrow, filters, links, list, tag } from "../../Utilities/Constants";
import "../../Styles/SideNav.css"
import Svg from "../../Common/Svg";
import { getSelectedClass } from "../../Utilities/Utility";
import ButtonWithSvg from "../../Common/ButtonWithSvg";
import CustomLink from "../../Common/CustomLink";

const SideNav = () => {
    const href = useHref();

    const selectedClass = (path) => getSelectedClass(href, path);

    return <div className="side-nav">
        <nav>
            { links.map( ({ to, icon, text }, key) => <CustomLink key={key} to={to} className={`side-nav-list${selectedClass(to)}`}>
                <Svg svgName={icon} />
                <span>{text}</span>
            </CustomLink> ) }

            <h4 className="side-nav-title">Lists</h4>
            <CustomLink to={'/saves/lists'} className={`side-nav-list${selectedClass('/saves/lists')}`}>
                <Svg svgName={list} />
                <span>All Lists</span>
            </CustomLink>


            <h4 className="side-nav-title">Filters</h4>
            { filters.map( ({ to, icon, text }, key) => <CustomLink key={key} to={to} className={`side-nav-list${selectedClass(to)}`}>
                <Svg svgName={icon} />
                <span>{text}</span>
            </CustomLink> ) }

            <h4 className="side-nav-title">Tags</h4>
            <CustomLink to={'/saves/tags'} className={`side-nav-list${selectedClass('/saves/tags')}`}>
                <Svg svgName={tag} />
                <span>All Tags</span>
            </CustomLink>
            
        </nav>
        <div className="bottom-nav">
            <ButtonWithSvg svgName={arrow} />
        </div>
    </div>
}

export default SideNav;