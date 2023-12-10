import { useEffect, useState } from "react";
import ButtonWithImg from "../../Common/ButtonWithImg"
import ButtonWithSvg from "../../Common/ButtonWithSvg"
import { Popover, PopoverContent, PopoverHeading, PopoverDescription, PopoverClose, PopoverTrigger } from "../../Hooks/Popover";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../Hooks/Tooltip";
import { cancel, detailViewType, gridViewType, listViewType, premium } from "../../Utilities/Constants";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTrigger } from "../../Hooks/Dialogs";

const themes = [
    { type: 'light', text: 'Light' },
    { type: 'dark', text: 'Dark' },
    { type: 'sepia', text: 'Sepia' }
];

const Account = () => {

    const [theme, setTheme] = useState('light');
    const [width, setWidth] = useState(window.innerWidth);

    const onThemeChange = e => setTheme(e.target.value);

    const handleResize = () => setWidth(window.innerWidth);

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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
                <div className="list-type-split">
                    <Tooltip>
                        <TooltipTrigger><ButtonWithSvg svgName={listViewType} /></TooltipTrigger>
                        <TooltipContent>Display items as a list</TooltipContent>
                    </Tooltip>
                </div>
                <div className="list-type-split">
                    <Tooltip>
                        <TooltipTrigger><ButtonWithSvg svgName={detailViewType} /></TooltipTrigger>
                        <TooltipContent>Display items in detail</TooltipContent>
                    </Tooltip>
                </div>
                <div className="list-type-split">
                    <Tooltip>
                        <TooltipTrigger><ButtonWithSvg svgName={gridViewType} /></TooltipTrigger>
                        <TooltipContent>Display items as a grid</TooltipContent>
                    </Tooltip>
                </div>
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