export const articleData = [
    {
        id: Math.random()*100000000000000000,
        title: "Azeem's Picks: The Promise of AI with Fei-Fei Li",
        isArticle: false,
        excerpt: "Can we build beneficial AI through interdisciplinarity?",
        topImageUrl: "https://hbr.org/resources/images/article_assets/2019/04/wide-exponential-view.png",
        domain: "Harvard Business Review"
    },
    {
        id: Math.random()*100000000000000000,
        title: "How to Make Yourself Work When You Just Don’t Want To",
        isArticle: false,
        excerpt: "There’s that project you’ve left on the backburner – the one with the deadline that’s growing uncomfortably near. And there’s the client whose phone call you really should return – the one that does nothing but complain and eat up your valuable time.",
        topImageUrl: "https://hbr.org/resources/images/article_assets/2011/08/dec15-31-155301520.jpg",
        domain: "Harvard Business Review"
    },
    {
        id: Math.random()*100000000000000000,
        title: "Henry Kissinger, secretary of state under Presidents Nixon and Ford, dies at 100",
        isArticle: false,
        excerpt: "Former Secretary of State Henry Kissinger, the diplomat with the thick glasses and gravelly voice who dominated foreign policy as the United States extricated itself from Vietnam and broke down barriers with China, died Wednesday, his consulting firm said. He was 100.",
        topImageUrl: "https://dims.apnews.com/dims4/default/dcac1a4/2147483647/strip/true/crop/700x394+0+28/resize/1440x810!/quality/90/?url=https%3A%2F%2Fassets.apnews.com%2F90%2F29%2F4e3c1cc7446089a9101a7bdff4c8%2Fdefaultshareimage-copy.png",
        domain: "The Associated Press"
    },
    {
        id: Math.random()*100000000000000000,
        title: "What is web design? A comprehensive guide",
        isArticle: false,
        excerpt: "Web design has come a long way since the first site was published in 1991. With over one billion live websites on the internet today, it’s no surprise that this industry is here to stay.",
        topImageUrl: "https://static.wixstatic.com/media/72c0b2_026a78c2a8c841fc95195a13e87081fa~mv2.jpg/v1/fill/w_1000,h_571,al_c,q_85,usm_0.66_1.00_0.01/72c0b2_026a78c2a8c841fc95195a13e87081fa~mv2.jpg",
        domain: "wix.com"
    }
];

export const getArticlesApi = (count, page) => {
    const data = [];
    for (let i=((page-1)*(count)); i<(((page-1)*(count))+count); i++) {
        data.push({
            ...articleData[Math.floor(Math.random() * articleData.length)],
            id: `${i+1}-${Math.random()*100000000000000000}`
        });
    }
    return data;
}