import Button from "../../Common/Button";
import ButtonWithSvg from "../../Common/ButtonWithSvg";
import { Tooltip, TooltipTrigger, TooltipContent } from "../../Hooks/Tooltip";
import { add, edit, search } from "../../Utilities/Constants";

const actions = [
    {
        toolTip: 'Search',
        type: search
    },
    {
        toolTip: 'Save a URL',
        type: add
    },
    {
        toolTip: 'Bulk Edit',
        type: edit
    },
]

const Actions = ({ onOpen }) => {
    return <div className='actions'>
        <ul>
            { actions.map( ({ toolTip, type }, id) => <li key={id}>
                <Tooltip>
                    <TooltipTrigger>
                        <ButtonWithSvg svgName={type} onClick={ () => onOpen(type)} />
                    </TooltipTrigger>
                    <TooltipContent>{toolTip}</TooltipContent>
                </Tooltip>
            </li>) }
        </ul>
    </div>
}

export default Actions;