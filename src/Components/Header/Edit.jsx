import ButtonWithSvg from "../../Common/ButtonWithSvg";
import ButtonWithTxt from "../../Common/ButtonWithTxt";
import { archive, cancel, deletee, favorite, tag } from "../../Utilities/Constants";

const Edit = ({ onClose }) => {
    return <div className="bulk-edit">
        <div className="bulk-edit-wrapper">
            <div className="bulk-container">
                   <div className="bulk-actions">
                        <ButtonWithSvg svgName={tag} theme='light' toolTip={'Tag'} />
                        <ButtonWithSvg svgName={favorite} theme='light' toolTip={'Favorite'}/>
                        <ButtonWithSvg svgName={archive} theme='light' toolTip={'Archive'}/>
                        <ButtonWithSvg svgName={deletee} theme='light' toolTip={'Delete'}/>
                        <div className="label-text">Select Items</div>
                   </div>
            </div>
            <ButtonWithTxt text="Cancel" />
            <ButtonWithSvg svgName={cancel} onClick={ onClose } />
        </div>
    </div>
}

export default Edit;