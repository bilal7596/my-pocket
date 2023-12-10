import ButtonWithSvg from "../../Common/ButtonWithSvg";
import ButtonWithTxt from "../../Common/ButtonWithTxt";
import { Add as AddSvg } from "../../Utilities/SvgIcons";

const Add = ({ onClose }) => {
    return <form className="add-form">
        <div className="input-wrapper">
            <span className="input-icon">
                <AddSvg />
            </span>
            <input name="search-input" className="search-input" type="text" placeholder="Save a URL https://..." />
        </div>
        <ButtonWithTxt text={'Add'} />
        <ButtonWithSvg svgName={'cancel'} onClick={ onClose } />
    </form>
}


export default Add;