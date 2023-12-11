import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import "../../Styles/Articles.css";
import { detailViewType, footerActions, gridViewType, listViewType, open, overflow } from "../../Utilities/Constants";
import ButtonWithSvg from "../../Common/ButtonWithSvg";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../Hooks/Tooltip";
import { Popover, PopoverContent, PopoverDescription, PopoverTrigger } from "../../Hooks/Popover";
import { getScrollPercent } from "../../Utilities/Utility";
import { useScrollDirection } from "../../Hooks/useScrollDirection";
import Loader from "../Loader";
import { useDispatch, useSelector } from "react-redux";
import { getArticlesApiThunk, listsSelector, loaderSelector, pageSelector, setPageReducer, sizeSelector, viewTypeSelector } from "./articleSlice";

const maxPage = 5;
let hidedRecords = 0;
let addedRecords = 0;

let activeList = {};

let defaultHeight = 0;

const Articles = () => {

    const lists = useSelector(listsSelector);
    const page = useSelector(pageSelector);
    const apiProgress = useSelector(loaderSelector);
    const size = useSelector(sizeSelector);
    const viewType = useSelector(viewTypeSelector);

    const elementRef = useRef(null);
    const scrollDirection = useScrollDirection(elementRef);

    const [scrollValue, setScrollValue] = useState(window.scrollY);
    const [configuration, setConfiguration] = useState({});

    const dispatch = useDispatch();

    useEffect(() => {
        const headerEl = document.querySelectorAll('header');
        const headerCompStyle1 = getComputedStyle(headerEl[0]);
        let headerHeight1 = headerEl[0].clientHeight;  // height with padding
        headerHeight1 -= parseFloat(headerCompStyle1.paddingTop) + parseFloat(headerCompStyle1.paddingBottom);

        const headerCompStyle2 = getComputedStyle(headerEl[1]);
        let headerHeight2 = headerEl[1].clientHeight;  // height with padding
        headerHeight2 -= parseFloat(headerCompStyle2.paddingTop) + parseFloat(headerCompStyle2.paddingBottom);

        const footerEl = document.querySelector('.layout');
        const footerCompStyle = getComputedStyle(footerEl);
        let footerHeight = footerEl.clientHeight;  // height with padding
        footerHeight -= parseFloat(footerCompStyle.paddingTop) + parseFloat(footerCompStyle.paddingBottom);

        defaultHeight = window.innerHeight - headerHeight1 - headerHeight2 - 120;

    }, []);

    useEffect(() => {
        if (page <= maxPage) {
            dispatch(getArticlesApiThunk({ size, page }));
        }
    }, [page]);

    useEffect(() => {
        if (window.innerWidth < 599 && ((window.innerHeight + Math.round(window.scrollY)) >= document.body.offsetHeight)) {
            const lastTop = document.querySelectorAll('article')[document.querySelectorAll('article').length - 1].style.top;
            window.scrollTo(0, parseInt(lastTop));
        }
        const allLists = Object.values(lists);
        const lastAdded = allLists.slice(allLists.length - size);
        buildArticle(lastAdded, page);
        doMagic();
        doMagicForAdd();
        doMagicForDelete();
    }, [lists]);


    useEffect(() => {
       doMagic();
    }, [scrollValue]);

    const doMagic = () => {
        const topValue = window.scrollY - ((configuration.height * 2 ) + 100);
        const prev = activeList;
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
            hidedRecords = cloneHidedRecords;
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
            addedRecords = cloneAddedRecords;
        }
        
        activeList = prev;
    }

    const doMagicForAdd = (hidedRec) => {
        let cloneHidedRecords = hidedRec || hidedRecords;
        if (cloneHidedRecords > 0) {
            const prev = activeList;
            const recordsKey = Object.keys(activeList);
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
            activeList = prev;
            hidedRecords = cloneHidedRecords;
        }
    }

    const doMagicForDelete = (addedRec) => {
        let cloneAddedRecords = addedRec || addedRecords;
        if (cloneAddedRecords > 0) {
            const prev = activeList;
            const recordsKey = Object.keys(activeList);
            console.log("add and hide");
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
            activeList = prev;
            addedRecords = cloneAddedRecords
        }
    }

    useEffect(() => {
        doMagicForDelete();
    }, [activeList, addedRecords]);

    useEffect(() => {
        doMagicForAdd();
    }, [activeList, hidedRecords]);

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
                height = window.innerWidth < 479 ? 130 : 72;
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

    const handleScroll = useCallback(event => {
        const scrollPercent = getScrollPercent();
        if (scrollPercent > 60 && apiProgress === false) {
            const records = Object.values(activeList);
            const viewingLastArticleIndex = records.findLastIndex( a => a.hide === false);
            if (viewingLastArticleIndex > -1 && page < maxPage && activeList[records[viewingLastArticleIndex].id].page === page)
                dispatch(setPageReducer(page+1));
        }
        setScrollValue(window.scrollY);
    }, [page]);

    const handleResize = () => {
        const prev = activeList;
        const data = Object.values(prev);
        for (let page=1; page<=Math.floor(data.length / size); page++)
            buildArticle(data.slice(size*(page-1), size*page), page, true);
    }

    const buildArticle = (data, pageNumber, fromResize) => {
        const { splitup, height, width } = calculation();
        const position = {};
        let overAllHeight = 0;
        for (let i=0; i<data.length; i++) {
            const seq = pageNumber === 0 ? (i + 1) : (i + (size * (pageNumber -1)));
            const row = parseInt(seq / splitup); // starts from 0
            const column = seq % splitup; // position from 0;
            position[data[i].id] = {
                id: data[i].id,
                page: pageNumber,
                style: {
                    top: (height * row) + (25 * row),
                    left: (width * column) + (25 * (column)),
                    width : splitup === 1 ? "100%" : width,
                    height: `${height}px`
                },
            }
            if (!fromResize) {
                position[data[i].id] = {
                    ...position[data[i].id],
                    hide: pageNumber === 1 ? false : true
                }
            } else {
                position[data[i].id] = {
                    ...position[data[i].id],
                    hide: data[i].hide
                }
            }
                
            overAllHeight = position[data[i].id].style.top + 300;
        }
        activeList = {
            ...activeList,
            ...position
        }
        return {
            position,
            overAllHeight
        }
    }

    useEffect(() => {
        handleResize();
    }, [viewType]);

    console.log(apiProgress);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, [handleScroll, handleResize]);

    let domHeight = 0;

    return <div className="article-collections" ref={elementRef} >
        { Object.keys(activeList).map( (id, key) => {
            if (activeList[id].hide)
                return <></>;
            domHeight = activeList[id].style.top + configuration.height + 150;

            return <article className={`article ${viewType.toLowerCase()}`} key={key} id={id} style={activeList[id].style}>
                <span className="media-block">
                    <div className="media">
                        <a href="" className="media-link">
                            <img className="image" 
                            src={`https://scrapper-wfeh.onrender.com/api/image?imageUrl=${encodeURIComponent(lists[id].topImageUrl)}&width=640&height=360`}
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
                            <h2 className="title">{page} {lists[id].title}</h2>
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
        <div style={{ height: `${domHeight || defaultHeight}px`, width: '1px', visibility: 'hidden' }}></div>
        { apiProgress  ? <Loader className={Object.keys(activeList).length === 0 ? 'top-0' : 'bottom-0'} /> : null }
    </div>
}

export default Articles;