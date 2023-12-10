import ButtonWithSvg from "../../Common/ButtonWithSvg";
import { archive, article, back, collection, discover, favorite, hamburger, hightlight, home, list, save, tag, video } from "../../Utilities/Constants";
import { Logo as LogoSvg, LogoMark, Arrow } from "../../Utilities/SvgIcons";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "../../Hooks/Dialogs";
import { Tooltip, TooltipTrigger, TooltipContent } from "../../Hooks/Tooltip";

const menuList = [
    {
        icon: home,
        text: 'Home'
    },
    {
        icon: save,
        text: 'Saves'
    },
    {
        icon: discover,
        text: 'Discover'
    },
    {
        icon: collection,
        text: 'Collections'
    },
    {
        icon: list,
        text: 'All Lists'
    },
    {
        icon: archive,
        text: 'Archive'
    },
    {
        icon: favorite,
        text: 'Favorites'
    },
    {
        icon: hightlight,
        text: 'Hightlights'
    },
    {
        icon: article,
        text: 'Articles'
    },
    {
        icon: video,
        text: 'Video'
    },
    {
        icon: tag,
        text: 'All Tags'
    }
]


const Logo = () => {

    return <div className='site-nav'>
        <Dialog>
            <Tooltip>
                <TooltipTrigger>
                    <DialogTrigger>
                        <ButtonWithSvg svgName={hamburger} onClick={() => console.log("DialogTrigger")}/>
                    </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent>Open</TooltipContent>
            </Tooltip>

            <DialogContent transitionStyles={{
                initial: {
                    width: "0%",
                },
                open: {
                    width: "256px",
                },
                close: {
                    width: "0%",
                },
            }} overLayClassName="dialog-overlay-dark side-menu-overlay" className="side-menu">
                <div className="modal-back">
                    <Tooltip>
                        <TooltipTrigger>
                        <DialogClose>
                            <ButtonWithSvg svgName={back} />
                        </DialogClose>
                        </TooltipTrigger>
                        <TooltipContent className="close">Close</TooltipContent>
                    </Tooltip>
                </div>
                <ul className="menu-list">
                    { menuList.map( (a, key) => <li key={key}>
                        <ButtonWithSvg svgName={a.icon}/>
                        <span>{a.text}</span>
                    </li>) }
                </ul>
            </DialogContent>
        </Dialog>
        <a href='/saves' className='pocket-logo'>
            <div className="logo">
                <LogoSvg />
            </div>
            <div className='logo-mark'>
                <LogoMark />
            </div>
        </a>
    </div>
}

export default Logo;