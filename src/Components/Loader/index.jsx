import "../../Styles/Loader.css";

const Loader = () => {
    return <div className="loader">
        <div className="loader-wrapper">
            <div className="spin circle">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6 6"><circle cx="3" cy="3" r="3"></circle></svg>
            </div>
            <div className="spin triangle">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M24 22H0L12 2z"></path></svg>
            </div>
            <div className="spin square">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6 6"><path d="M0 0h6v6H0z"></path></svg>
            </div>
        </div>
    </div>
}

export default Loader;