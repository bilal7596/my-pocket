import "../../Styles/Footer.css";

const footerLinks = {
    Products: [
        {
            text: 'Must-read articles',
            link: '/link1'
        },
        {
            text: 'Daily newsletter',
            link: '/link2'
        },
        {
            text: 'Pocket Premium',
            link: '/link3'
        },
        {
            text: 'Save to Pocket extensions',
            link: '/link4'
        }
    ],
    Company: [
        {
            text: 'Must-read articles',
            link: '/link1'
        },
        {
            text: 'Daily newsletter',
            link: '/link2'
        },
        {
            text: 'Pocket Premium',
            link: '/link3'
        },
        {
            text: 'Save to Pocket extensions',
            link: '/link4'
        }
    ],
    Resources: [
        {
            text: 'Must-read articles',
            link: '/link1'
        },
        {
            text: 'Daily newsletter',
            link: '/link2'
        },
        {
            text: 'Pocket Premium',
            link: '/link3'
        },
        {
            text: 'Save to Pocket extensions',
            link: '/link4'
        }
    ],
    Application: [
        {
            text: 'Must-read articles',
            link: '/link1'
        },
        {
            text: 'Daily newsletter',
            link: '/link2'
        },
        {
            text: 'Pocket Premium',
            link: '/link3'
        },
        {
            text: 'Save to Pocket extensions',
            link: '/link4'
        }
    ]
}

const Footer = () => {
    return <footer className="footer">
        <div className="footer-container">
            <div className="footer-wrapper">
                { Object.keys(footerLinks).map( (title, key) => {
                    return <div key={key} className="footer-content">
                        <h6>{ title }</h6>
                        <ul>
                        { footerLinks[title].map( ({ text, link }) => <li><a href={link}>{text}</a></li> ) }
                        </ul>
                    </div>
                }) }
                
            </div>
        </div>
    </footer>
}

export default Footer;