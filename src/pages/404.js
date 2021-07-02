import React from "react";
import { Link } from "gatsby";

import "../styles/About.scss";

import Layout from "../components/Layout";

const NotFoundPage = () => {
    return (
        <Layout mainClass="not-found">
            <h1>Page not found</h1>
            <p>
                😞 There's nothing here! 
            </p>
            <p>
                <Link to="/" >Take me home</Link>
            </p>
        </Layout>
    )
};

export default NotFoundPage;