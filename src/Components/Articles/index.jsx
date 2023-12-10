import { Fragment, useEffect, useRef, useState } from "react";
import "../../Styles/Articles.css";
import { detailViewType, footerActions, gridViewType, listViewType, open, overflow } from "../../Utilities/Constants";
import ButtonWithSvg from "../../Common/ButtonWithSvg";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../Hooks/Tooltip";
import { Popover, PopoverContent, PopoverDescription, PopoverTrigger } from "../../Hooks/Popover";
import { getScrollPercent, toObject } from "../../Utilities/Utility";
import { useScrollDirection } from "../../Hooks/useScrollDirection";
import { getArticlesApi } from "../../Backend/articles";
import Loader from "../Loader";

const initCount = 30;
let apiProgress = false;

const Articles = () => {

    const elementRef = useRef(null);
    const scrollDirection = useScrollDirection(elementRef);

    const [page, setPage] = useState(1);
    const [viewType, setViewType] = useState(gridViewType);
    const [lists, setLists] = useState({});
    const [activeList, setActiveList] = useState({});
    const [scrollValue, setScrollValue] = useState(window.scrollY);
    const [configuration, setConfiguration] = useState({});
    const [hidedRecords, setHidedRecords] = useState(0);
    const [addedRecords, setAddedRecords] = useState(0);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {

        const headerEl = document.querySelector('header');
        const headerCompStyle = getComputedStyle(headerEl);
        let headerHeight = headerEl.clientHeight;  // height with padding
        headerHeight -= parseFloat(headerCompStyle.paddingTop) + parseFloat(headerCompStyle.paddingBottom);

        const footerEl = document.querySelector('.layout');
        const footerCompStyle = getComputedStyle(footerEl);
        let footerHeight = footerEl.clientHeight;  // height with padding
        footerHeight -= parseFloat(footerCompStyle.paddingTop) + parseFloat(footerCompStyle.paddingBottom);

    }, []);

    useEffect(() => {
        if (page <= 4) {
            apiProgress = true;
            console.log("pagination called");
            setTimeout(() => {
                const { data, position, overAllHeight } = buildArticle(page);
                setLists(prev => ({
                    ...prev,
                    ...data
                }));
                setActiveList( prev => ({
                    ...prev,
                    ...position
                }));
                apiProgress = false;
                doMagic();
            }, 1000);
        }
    }, [page]);

    // console.log(activeList);

    useEffect(() => {
       doMagic();
    }, [scrollValue]);

    const doMagic = (checkThis = false) => {
        const topValue = window.scrollY - ((configuration.height * 2 ) + 100);
        setActiveList( prev => {
            const recordsKey = Object.keys(prev);
            if (recordsKey.length <= 30)
                return prev;
            if (scrollDirection === 'down') {
                let cloneHidedRecords = hidedRecords;
                const viewRecords = Object.values(prev).filter( a => a['hide'] === false );
                for (let i=0; i < recordsKey.length; i++) {
                    if (viewRecords.length >= 30 && prev[recordsKey[i]].hide === false && prev[recordsKey[i]].style.top < topValue) {
                        prev[recordsKey[i]] = {
                            ...prev[recordsKey[i]],
                            hide: true
                        }
                        cloneHidedRecords += 1;
                    }
                }
                if (cloneHidedRecords > 0) {
                    console.log('hide and add', cloneHidedRecords);
                    for (let i=0; i<cloneHidedRecords; i++) {
                        const lastViewableIndex = Object.values(prev).findLastIndex( a => a['hide'] === false );
                        for (let i = lastViewableIndex + 1; i < (lastViewableIndex+1+cloneHidedRecords); i++) {
                            if (prev[recordsKey[i]]) { 
                                prev[recordsKey[i]] = {
                                    ...prev[recordsKey[i]],
                                    hide: false
                                }
                                cloneHidedRecords -= 1;
                            }
                        }
                    }
                    setHidedRecords( cloneHidedRecords );
                }
            } else {
                const firstViewableIndex = Object.values(prev).findIndex( a => a['hide'] === false );
                let newAddedRecords = false;
                let cloneAddedRecords = addedRecords;
                for (let i=firstViewableIndex-1; i >= 0; i--) {
                    if (prev[recordsKey[i]].hide === true && prev[recordsKey[i]].style.top > topValue) {
                        newAddedRecords = true;
                        prev[recordsKey[i]] = {
                            ...prev[recordsKey[i]],
                            hide: false
                        }
                        cloneAddedRecords += 1;
                    }
                }

                if (cloneAddedRecords > 0) {
                    console.log("add and hide");
                    // const viewRecords = Object.values(prev).filter( a => a['hide'] === false );
                    for (let i=0; i<cloneAddedRecords; i++) {
                        const lastViewItemKey = Object.keys(prev);
                        const lastViewableIndex = Object.values(prev).findLastIndex( a => a['hide'] === false );
                        if (lastViewableIndex > -1) {
                            for (let i = lastViewableIndex; i>lastViewableIndex-configuration.splitup; i--) {
                                if (prev[lastViewItemKey[i]]) { 
                                    prev[lastViewItemKey[i]] = {
                                        ...prev[lastViewItemKey[i]],
                                        hide: true
                                    }
                                }
                                cloneAddedRecords -= 1;
                            }
                        }
                    }
                    setAddedRecords( cloneAddedRecords );
                }
            }
            
            return prev;
        })
    }

    const calculation = () => {
        let splitup = 1;
        let width = 100;
        let height = 100;
        switch(viewType) {
            case gridViewType:
                const totalWidth = elementRef.current.offsetWidth;
                splitup = 3;
                width = parseInt((totalWidth - 50) / splitup);
                height = 300;
                console.log("totalWidth", totalWidth);
                if (width < 200) {
                    splitup = 2;
                    width = parseInt((totalWidth - 50) / splitup);
                    if (window.innerWidth < 600 || width < 240) {
                        splitup = 1;
                        height = 174;
                    }
                }
                break;
            case detailViewType:
                height = 174;
                break;
            case listViewType:
                height = 72;
                break;
            default:
                break;
        }
        setConfiguration({
            splitup,
            height,
            width
        })
        return {
            splitup,
            height,
            width
        };
    }

    const handleScroll = event => {
        const scrollPercent = getScrollPercent();
        if (scrollPercent > 60 && apiProgress === false) {
           setPage( prev => prev + 1);
        }
        setScrollValue(window.scrollY);
    };

    const handleResize = () => {
        setPage( prev => {
            let overAllPostition = {};
            let overAllLists = {};
            let finalOverAllHeight = 0;
            for (let i=1; i<=prev; i++) {
                const { data, position, overAllHeight } = buildArticle(i);
                overAllLists = {
                    ...overAllLists,
                    ...data
                }
                overAllPostition = {
                    ...overAllPostition,
                    ...position
                }
                finalOverAllHeight = overAllHeight;
            }
            setLists(overAllLists);
            setActiveList(overAllPostition);
            return prev;
        })
    }

    const buildArticle = (pageNumber) => {
        
        const { splitup, height, width } = calculation();
        const data = toObject(getArticlesApi(initCount, page), 'id');
        const allOverData = {
            ...lists,
            ...data,
        };
        const position = {};
        let overAllHeight = 0;
        const ids = Object.keys(allOverData)
        for (let i=((pageNumber-1)*initCount); i<(pageNumber*initCount); i++) {
            const row = parseInt(i / splitup); // starts from 0
            const column = i % splitup; // position from 0;
            // const id = `${pageNumber}-${i+1}`;
            // data[id] = {
            //     id,
            //     content: `Article ${i+1} ${row} x ${column}`
            // }
            position[ids[i]] = {
                style: {
                    top: (height * row) + (25 * row),
                    left: (width * column) + (25 * (column)),
                    width : splitup === 1 ? "100%" : width,
                    height: `${height}px`
                },
                hide: pageNumber === 1 ? false : true
            }
            overAllHeight = position[ids[i]].style.top + 300;
        }
        return {
            data,
            position,
            overAllHeight
        }
    }

    let domHeight = 0;

    return <div className="article-collections" ref={elementRef} >
        { Object.keys(activeList).length === 0 ? <div>Loading....</div>
        : Object.keys(activeList).map( (id, key) => {
            if (activeList[id].hide)
                return <></>;
            domHeight = activeList[id].style.top + configuration.height + 50;

            return <article className={`article ${viewType.toLowerCase()}`} key={key} id={id} style={activeList[id].style}>
                <span className="media-block">
                    <div className="media">
                        <a href="" className="media-link">
                            <img className="image" 
                            src={`http://localhost:8080/api/image?imageUrl=${encodeURIComponent(lists[id].topImageUrl)}&width=640&height=360`}
                            // src="https://pocket-image-cache.com/640x360/filters:format(jpg):extract_focal()/https%3A%2F%2Fhbr.org%2Fresources%2Fimages%2Farticle_assets%2F2019%2F04%2Fwide-exponential-view.png" 
                            />
                            <span className="view-original">
                                View Original
                                <ButtonWithSvg svgName={open} svgClassName={"svg-wrapper color-white"}/>
                            </span>
                        </a>
                    </div>
                </span>
                <div className="item-links">
                    <a className="content-block" href="">
                        <div>
                            <h2 className="title">{lists[id].title}</h2>
                        </div>
                        <div className="excerpt">
                            <p>{lists[id].excerpt}</p>
                        </div>
                    </a>
                </div>
                <footer className="footer-links">
                    <cite className="footer-details">
                        <a href="" className="publisher">{lists[id].domain}</a>
                    </cite>
                    <div className="footer-actions">
                        <div>
                        { [listViewType, detailViewType].includes(viewType)  && <Fragment>
                            { footerActions.map( ({ icon, text }, key) => <Tooltip key={key}>
                                <TooltipTrigger><ButtonWithSvg buttonClassName={'light-icon'} svgName={icon} /></TooltipTrigger>
                                <TooltipContent>{ text }</TooltipContent>
                            </Tooltip> ) }
                        </Fragment> }
                        <Popover>
                            <PopoverTrigger>
                                <ButtonWithSvg buttonClassName={'light-icon'} svgName={overflow} />
                            </PopoverTrigger>
                            <PopoverContent>
                            <PopoverDescription>
                                { footerActions.reverse().map( ({ icon, text }, key) => <div className="footer-action-popover">
                                    <ButtonWithSvg svgName={icon} theme='light' />
                                    { text }
                                </div>) }
                            </PopoverDescription>
                            </PopoverContent>
                        </Popover>
                        </div>
                    </div>
                </footer>
            </article>
        }) }
        {/* { domHeight > 0 && <div style={{ height: `${domHeight}px`, width:'1px', visibility: 'hidden'}}></div> } */}
        <div style={{ height: `${domHeight || window.innerHeight}px`, width: '1px', visibility: 'hidden' }}></div>
        <Loader />
    </div>
}

export default Articles;