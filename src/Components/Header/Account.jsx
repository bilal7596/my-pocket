import { useEffect, useState } from "react";
import ButtonWithImg from "../../Common/ButtonWithImg"
import ButtonWithSvg from "../../Common/ButtonWithSvg"
import { Popover, PopoverContent, PopoverHeading, PopoverDescription, PopoverClose, PopoverTrigger } from "../../Hooks/Popover";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../Hooks/Tooltip";
import { cancel, detailViewType, gridViewType, listViewType, premium, viewTypes } from "../../Utilities/Constants";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTrigger } from "../../Hooks/Dialogs";
import { useDispatch, useSelector } from "react-redux";
import { setViewTypeReducer, viewTypeSelector } from "../Articles/articleSlice";
import { getSelectedClass } from "../../Utilities/Utility";

const themes = [
    { type: 'light', text: 'Light' },
    { type: 'dark', text: 'Dark' },
    { type: 'sepia', text: 'Sepia' }
];

const Account = () => {

    const dispatch = useDispatch();

    const [theme, setTheme] = useState('light');
    const [width, setWidth] = useState(window.innerWidth);

    const onThemeChange = e => setTheme(e.target.value);

    const handleResize = () => setWidth(window.innerWidth);

    const viewType = useSelector(viewTypeSelector);

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const selectedClass = (type) => getSelectedClass(type, viewType);

    const onChangeViewType = type => dispatch(setViewTypeReducer(type))

    const accountPopupHtml = () => <ul className="account-parent">
        <li className="account-parent-child">
            <ul className="account-child">
                <li className="account-child-child">
                    <a className="account-menu-profile-link">
                        <span>
                            Bilal
                            <span className="label-secondary">
                                View Profile
                            </span>
                        </span>
                    </a>
                </li>
            </ul>
        </li>
        <li className="account-parent">
            <div className="theme-selection">
                { themes.map( ({ type, text }) => <span className="theme-split">
                    <label htmlFor={type}>
                        <input type="radio" value={type} onChange={ onThemeChange } checked={theme === type} />{ text }
                    </label>
                </span> ) }
            </div>
        </li>
        <li className="account-parent-child">
            <div className="flex-space-evenly">
                { viewTypes.map( ({ icon, text }) => <div className="list-type-split">
                    <Tooltip>
                        <TooltipTrigger><ButtonWithSvg svgName={icon} buttonClassName={`svg-button icon${selectedClass(icon)}`} onClick={ () => onChangeViewType(icon)} /></TooltipTrigger>
                        <TooltipContent>{ text }</TooltipContent>
                    </Tooltip>
                </div> ) }
            </div>
        </li>
    </ul>

    const accountHtml = () => <Tooltip>
        <TooltipTrigger>
            <ButtonWithImg />
        </TooltipTrigger>
        <TooltipContent>Account</TooltipContent>
    </Tooltip>

    const popoverAccount = () =>  <Popover>
        <PopoverTrigger className="icon">
            { accountHtml() }
        </PopoverTrigger>
        <PopoverContent>
            {/* <PopoverHeading>My popover heading</PopoverHeading> */}
            <PopoverDescription>
                { accountPopupHtml() }
            </PopoverDescription>
        </PopoverContent>
    </Popover>

    const dialogAccount = () => <Dialog>
        <DialogTrigger>
            { accountHtml() }
        </DialogTrigger>
        <DialogContent transitionStyles={{
                initial: {
                    height: "0%",
                },
                open: {
                    height: "auto",
                },
                close: {
                    height: "0%",
                },
            }} overLayClassName="dialog-overlay-light account-dialog-overlay" className="account-dialog">
                <div className="account-block">
                    <h6 className="account-name">Account</h6>
                    <DialogClose><ButtonWithSvg svgName={cancel} /></DialogClose>
                </div>
                { accountPopupHtml() }
            </DialogContent>
    </Dialog>

    return  <div className='accounts'>
        {/* <a className='upgrade-link'> */}
            <ButtonWithSvg svgName={premium} />
            {/* <span>Upgrade</span> */}
        {/* </a> */}
        <div className="profile">
            { width > 599 ? popoverAccount() : dialogAccount() }
        </div>
    </div>
}

export default Account;