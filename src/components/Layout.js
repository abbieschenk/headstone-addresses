import React from "react";
import { Link } from "gatsby";

import Logo from "../images/logo.svg";

import "../styles/styles.scss";
import {
    Instagram
} from "react-feather";

const Layout = ({ children }) => {
    return (
        <>
            <header>
                <nav>
                    <Link id="home" to="/">
                        <div id="site-logo">
                            <Logo/>
                        </div>
                        <div>
                            Headstone Addresses
                        </div>
                    </Link>                
                    <div id="menu">
                        <Link to="/about" className="nav-link">
                            About
                        </Link>
                        <a
                            className="social" 
                            href="https://instagram.com/headstoneaddresses" 
                            target="_blank" 
                            rel="noreferrer noopener"
                        >
                            <Instagram />
                        </a>
                    </div>
                </nav>
            </header>
            <main>
                {children}
            </main>
            <footer>
                Copyright information
            </footer>
        </>
    )
};

export default Layout;