import React from "react";
import AboutLayout from "../../components/AboutLayout";

const Support = () => {
    return (
        <AboutLayout> 
            <h1>Support</h1>
            <p>Please consider supporting the project at our <a href="https://www.gofundme.com/headstoneaddresses" target="_blank" rel="noreferrer noopener">GoFundMe</a>.</p>
            <p>
                Funds to be used for:
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
            <p>
                For each milestone of $5000 funding reached, we anticipate processing another 150-200 sites for the Beechmount Cemetery location. This is specifically due to the proximity of the sites to each other in the designated “Chinese Section” of the cemetery, and that a version of the shortlisted names and site locations list is readily prepared.    
            </p>            
            <p>
                If you would like to consider a version of this project to be completed for any cemetery in Canada (or globally), please reach out and start a conversation with us.
            </p>
        </AboutLayout>
    );
}

export default Support;