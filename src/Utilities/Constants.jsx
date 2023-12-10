export const search = 'SEARCH';
export const add = 'ADD';
export const edit = 'EDIT';
export const hamburger = 'HAMBURGER';
export const favorite = 'FAVORITE';
export const archive = 'ARCHIVE';
export const deletee = 'DELETE';
export const home = 'HOME';
export const save = 'SAVE';
export const discover = 'DISCOVER';
export const collection = 'COLLECTION';
export const list = 'LIST';
export const article = 'ARTICLE';
export const video = 'VIDEO';
export const tag = 'TAG';
export const hightlight = 'HIGHLIGHT';
export const premium = 'PREMIUM';
export const cancel = 'CANCEL';
export const arrow = 'ARROW';
export const createList = 'CREATELIST';
export const back = 'BACK';
export const asc = 'ASC';
export const desc = 'DESC';
export const overflow = 'OVERFLOW';
export const open = 'OPEN';

export const links = [
    {
        text: 'Home',
        icon: home,
        to: '/home'
    },
    {
        text: 'Saves',
        icon: save,
        to: '/saves'
    },
    {
        text: 'Discover',
        icon: discover,
        to: '/discover'
    },
    {
        text: 'Collections',
        icon: collection,
        to: '/collection'
    }
];

export const filters = [
    {
        to: "/saves/archive",
        icon: archive,
        text: 'Archive'
    },
    {
        to: "/saves/favorite",
        icon: favorite,
        text: 'Favorite'
    },
    {
        to: "/saves/highlights",
        icon: hightlight,
        text: 'Highlights'
    },
    {
        to: "/saves/articles",
        icon: article,
        text: 'Articles'
    },
    {
        to: "/saves/videos",
        icon: video,
        text: 'Videos'
    }
];

export const listViewType = 'LIST';
export const detailViewType = 'DETAIL';
export const gridViewType = 'GRID';

export const footerActions = [
    {
        icon: createList,
        text: 'Add to List'
    },
    {
        icon: favorite,
        text: 'Favorite'
    },
    {
        icon: archive,
        text: 'Archive'
    },
    {
        icon: tag,
        text: 'Tag'
    },
    {
        icon: deletee,
        text: 'Delete'
    }
];