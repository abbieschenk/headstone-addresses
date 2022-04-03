import React from "react";
import AboutLayout from "../../components/AboutLayout";

const Contributors = () => {
    return (
        <AboutLayout> 
            <h1>Contributors</h1>
            <h2>Elaine Yip</h2>
            <p>
                Project Lead
            </p>
            <p>
                <a href="/about/support">Consider supporting the project!</a>
            </p>
            <h2>Abbie Schenk</h2>
            <p>
                Web Design & Developer
            </p>
            <p>
                <a href="https://abbieschenk.com" target="_blank" rel="noreferrer noopener">Website</a>
            </p>
            <h2>Melva Chen</h2>
            <p>
                Research Assistant & Linguistic Consultant
            </p>
            <h2>Adelina Creative</h2>
            <p>
                Brand Identity & Logo Design
            </p>
            <p>
                <a href="https://adelinacreative.com" target="_blank" rel="noreferrer noopener">Website</a>
            </p>
        </AboutLayout>
    );
}

export default Contributors;