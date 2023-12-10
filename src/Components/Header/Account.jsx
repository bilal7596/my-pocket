import { useState } from "react";
import ButtonWithImg from "../../Common/ButtonWithImg"
import ButtonWithSvg from "../../Common/ButtonWithSvg"
import { Popover, PopoverContent, PopoverHeading, PopoverDescription, PopoverClose, PopoverTrigger } from "../../Hooks/Popover";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../Hooks/Tooltip";
import { detailViewType, gridViewType, listViewType, premium } from "../../Utilities/Constants";

const themes = [
    { type: 'light', text: 'Light' },
    { type: 'dark', text: 'Dark' },
    { type: 'sepia', text: 'Sepia' }
];

const Account = () => {

    const [theme, setTheme] = useState('light');

    const onThemeChange = e => setTheme(e.target.value);

    return  <div className='accounts'>
        {/* <a className='upgrade-link'> */}
            <ButtonWithSvg svgName={premium} />
            {/* <span>Upgrade</span> */}
        {/* </a> */}
        <div className="profile">
        <Popover>
            <PopoverTrigger className="icon">
                <Tooltip>
                    <TooltipTrigger>
                        <ButtonWithImg />
                    </TooltipTrigger>
                    <TooltipContent>Account</TooltipContent>
                </Tooltip>
            </PopoverTrigger>
            <PopoverContent>
                {/* <PopoverHeading>My popover heading</PopoverHeading> */}
                <PopoverDescription>
                    <ul className="account-parent">
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
                </PopoverDescription>
            </PopoverContent>
        </Popover>
        </div>
    </div>
}

export default Account;