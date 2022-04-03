import React from "react";
import AboutLayout from "../../components/AboutLayout";

const Support = () => {
    return (
        <AboutLayout> 
            <h1>Support</h1>
            <p>If you are interested in supporting this project or the creation of a similar project, please reach out via email to <a href="mailto:elaine.yip@ualberta.ca">Elaine Yip</a>.</p>
            <p>
                Funds would be used for:
            </p> 
            <ul>
                <li>
                    <p>The purchase of flowers of on-site offerings.</p>
                    <p>One stem of Chrysanthemum flowers is placed per site and purchased from local florist 藝濃軒 <a href="http://ArtsandFlorist.com" target="_blank" rel="noreferrer noopener">(Arts & Florist)</a>, a respectful gesture of greeting at each headstone visited, prior to touching or brushing off dirt from the headstones, and doing a transcription of information by hand.</p>
                </li>    
                <li>
                    Digital transcription and analysis (paid per hour of work)
                </li>
                <li>
                    Data processing to update the website (paid per hour of work).
                </li>
            </ul>
        </AboutLayout>
    );
}

export default Support;