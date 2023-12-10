import { add, archive, arrow, article, asc, back, cancel, collection, createList, deletee, desc, detailViewType, discover, edit, favorite, gridViewType, hamburger, hightlight, home, list, listViewType, open, overflow, premium, save, search, tag, video } from "./Constants";
import { Add, Archive, Arrow, Article, Asc, Back, Cancel, Collection, CreateList, Delete, Desc, DetailViewType, Discover, Edit, Favorite, GridViewType, Hamburger, Hightlight, Home, List, ListViewType, Open, OverFlow, Premium, Save, Search, Tag, Video } from "./SvgIcons";


export const getSvgJsx = (svgName) => {
    let svg = '';
    switch (svgName) {
        case hamburger:
            svg = <Hamburger />
            break;
        case search:
            svg = <Search />
            break;
        case add:
            svg = <Add />
            break;
        case edit:
            svg = <Edit />
            break;
        case premium:
            svg = <Premium />
            break;
        case cancel:
            svg = <Cancel />
            break;
        case tag:
            svg = <Tag />
            break;
        case favorite:
            svg = <Favorite />
            break;
        case archive:
            svg = <Archive />
            break;
        case deletee:
            svg = <Delete />
            break;
        case home:
            svg = <Home />
            break;
        case save:
            svg = <Save />
            break;
        case discover:
            svg = <Discover />
            break;
        case collection:
            svg = <Collection />
            break;
        case list:
            svg = <List />
            break;
        case hightlight:
            svg = <Hightlight />
            break;
        case article:
            svg = <Article />
            break;
        case video:
            svg = <Video />
            break;
        case arrow:
            svg = <Arrow />
            break;
        case createList:
            svg = <CreateList />
            break;
        case back:
            svg = <Back />
            break;
        case listViewType:
            svg = <ListViewType />
            break;
        case detailViewType:
            svg = <DetailViewType />
            break;
        case gridViewType:
            svg = <GridViewType />
            break;
        case asc:
            svg = <Asc />
            break;
        case desc:
            svg = <Desc />
            break;
        case overflow:
            svg = <OverFlow />
            break;
        case open:
            svg = <Open />
            break;
        default:
            break;
    }
    return svg;
}

export const getSelectedClass = (href, path) => href === path ? ' selected' : '';

export const getScrollPercent = () => {
    const h = document.documentElement, 
        b = document.body,
        st = 'scrollTop',
        sh = 'scrollHeight';
    return (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100;
}

export const toObject = (arr, key) => {
    const rv = {};
    for (var i = 0; i < arr.length; ++i)
      rv[arr[i][key]] = arr[i];
    return rv;
}