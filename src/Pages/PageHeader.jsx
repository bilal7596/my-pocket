import ButtonWithSvg from "../Common/ButtonWithSvg";
import { asc, createList, desc } from "../Utilities/Constants";
import "../Styles/PageHeader.css";
import { Popover, PopoverContent, PopoverDescription, PopoverTrigger } from "../Hooks/Popover";
import { getSvgJsx } from "../Utilities/Utility";
import Button from "../Common/Button";
import { useState } from "react";
import Svg from "../Common/Svg";

const PageHeader = () => {
    const [selectedSort, setSelectedSort] = useState(asc);

    const buildProps = type => type === selectedSort ? { disabled: true } : {};

    return <header className="page-header">
        <h1>Saves</h1>
        <div className="create-list">
            <ButtonWithSvg svgName={createList} buttonClassName="tiny" buttonName="Create List" />
        </div>
        <div>
            <Popover>
                <PopoverTrigger className="icon">
                    <ButtonWithSvg svgName={selectedSort} />
                </PopoverTrigger>
                <PopoverContent>
                    <PopoverDescription>
                        <ul className="sort-actions">
                            <li><Button className="icon svg-button" {...buildProps(desc)} onClick={() => setSelectedSort(desc)}><Svg svgName={desc} /><span>Oldest First</span></Button></li>
                            <li><Button className="icon svg-button" {...buildProps(asc)} onClick={() => setSelectedSort(asc)}><Svg svgName={asc} /><span>Newest First</span></Button></li>
                        </ul>
                    </PopoverDescription>
                </PopoverContent>
            </Popover>
            {/* <ButtonWithSvg svgName={asc} /> */}
            {/* <ButtonWithSvg svgName={desc} /> */}
        </div>
    </header>
}

export default PageHeader;