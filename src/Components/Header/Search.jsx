import ButtonWithSvg from "../../Common/ButtonWithSvg";
import ButtonWithTxt from "../../Common/ButtonWithTxt";
import { cancel } from "../../Utilities/Constants";
import { Search as SearchSvg } from "../../Utilities/SvgIcons";

const Search = ({ onClose}) => {
    return <form className="search-form">
        <div className="input-wrapper">
            <span className="input-icon">
                <SearchSvg />
            </span>
            <input name="search-input" className="search-input" type="text" placeholder="Search for topics and interests" />
        </div>
        <ButtonWithTxt text={'Search'} />
        <ButtonWithSvg svgName={cancel} onClick={ onClose } />
    </form>
}


export default Search;