import './Navbar.css'

function Navbar() {


    return (
        <>
            <header>
                <a className="navText" href="/">Task Management App</a>
                <div className="navBtns">
                    <a className="btns" href="/">Add registration</a>
                    <a className="btns" href="/upload">Upload</a>
                </div>
            </header>

        </>
    )
}

export default Navbar
