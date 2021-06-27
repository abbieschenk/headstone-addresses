import React from "react";
import { Link } from "gatsby";

import "../styles/About.scss";

import Layout from "../components/Layout";

const AboutLayout = ({ children }) => {
    return (
        <Layout mainClass="about">
            <div className="about-menu">
                <Link to="/about" className="about-link" activeClassName="active">
                        About
                </Link>
                <Link to="/about/methodology" className="about-link" activeClassName="active">
                        Methodology
                </Link>
            </div>
            <div className="about-background">
                <div className="about-content fade-in" >
                    {children}
                </div>
            </div>
        </Layout>
    )
};

export default AboutLayout;