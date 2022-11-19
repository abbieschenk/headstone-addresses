import React from 'react';
import { Link } from 'gatsby';
import { Instagram } from 'react-feather';

import Logo from '../images/logo.svg';

import '../styles/styles.scss';

export function Head() {
    const url = 'https://headstoneaddresses.com';
    const title = 'Headstone Addresses';
    const description =
        'Chinese headstones often document ancestral hometown addresses. This visualization links headstones to their addresses.';
    const image =
        'https://res.cloudinary.com/headstone-addresses/image/upload/v1625192021/screenshot.png';

    return (
        <React.Fragment>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta property="og:url" content={url} />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:site_name" content={title} />
            <meta property="og:locale" content="en_CA" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={url} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta property="og:image" content={image} />
            <meta name="twitter:image" content={image} />
        </React.Fragment>
    );
}

const Layout = ({ children, mainClass }) => {
    return (
        <>
            <header>
                <nav>
                    <Link id="home" to="/">
                        <div id="site-logo">
                            <Logo />
                        </div>
                        <div>Headstone Addresses</div>
                    </Link>
                    <div id="menu">
                        <Link to="/about" className="nav-link">
                            About
                        </Link>
                        <Link to="/about/support" className="nav-link">
                            Support
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
            <main className={mainClass}>{children}</main>
            <footer>
                © Elaine Yip 2021. Supported by the Edmonton Heritage Council
                and the City of Edmonton.
            </footer>
        </>
    );
};

export default Layout;
