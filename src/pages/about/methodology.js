import React from 'react';
import AboutLayout from '../../components/AboutLayout';

const Methodology = () => {
    return (
        <AboutLayout>
            <h1>Methodology</h1>
            <p>
                In compliance with FOIP, we used publicly released data of
                burial dates and death years from 1995 and earlier, as found
                using the{' '}
                <a
                    href="https://www.edmonton.ca/programs_services/municipal_cemeteries/cemetery-search.aspx"
                    target="_blank"
                    rel="noreferrer noopener"
                >
                    City of Edmonton Cemetery Search
                </a>
                .
            </p>
            <p>
                A shortlist of surnames was gathered by the Research Assistant
                from the Cemetery Search database for each of the three selected
                cemeteries. It is noted that some surname and firstname
                discrepancies were found, as well as some birth and death year
                data was inputted incorrectly. All the spelling of names in this
                project reflect the characters and words, as transcribed by hand
                by the Project Lead, directly from on-site visits to the
                headstones.
            </p>
            <p>
                All Chinese words on the headstones were in Traditional Chinese
                characters, accurately reflecting the geography and historical
                connections of these communities in Canada from the 1800s
                onwards. These characters were transcribed as accurately as
                possible by hand, and translated by the Project Lead and
                Research Assistant in context.
            </p>
            <p>
                The Jyut Ping style of romanization into English characters was
                used for this project to best reflect the specific and relevant
                heritage and history represented by the data. Related languages
                of the ethnocultural groups represented by the data include but
                are not limited to: Cantonese, TeowChow, Hokkienese, and
                Toisanese, etc.
            </p>
            <p>
                Mount Pleasant and Edmonton Cemetery had plots scattered in
                various sections around the cemetery. Edmonton Cemetery featured
                a row of neighbouring headstones: all facing east. Beechmount
                Cemetery official map denotes “Chinese Section” and features an
                impressive view of rows and rows of headstones with Chinese
                words. In-person visits to cemeteries are encouraged and
                recommended to best experience the different styles of
                headstones, locations, and to further connect with this project.
            </p>
            <p>
                The geographical location names denoted for 16 cities/towns were
                collected from the Headstone Addresses and used to establish
                clusters. Please note that place-names and village/town or city
                designations may have changed. There may be unintentional
                transcription and translation mistakes to Chinese characters due
                to the erosion of the headstones and font-style of the
                calligraphy words. If you believe we have inaccurately
                represented information about your family or kin, please do not
                hesitate to reach out to the Project Lead.
            </p>
            <p>
                145 complete addresses were gathered from the{' '}
                <a
                    href="https://www.edmonton.ca/programs_services/municipal-cemeteries"
                    target="_blank"
                    rel="noreferrer noopener"
                >
                    3 Historical Cemeteries of Edmonton
                </a>
                , spanning lifetimes from 1872 to 1995. The historical and
                geopolitical ties are framed within understanding Canada’s
                colonial history, global migration patterns, as well as labour
                policies and settlement stories; specifically to Treaty 6 lands
                around the birth and growth of Edmonton from Fort to City.
            </p>
            <ul>
                <li>
                    <strong>Mount Pleasant Cemetery</strong> Shortlisted 66
                    sites, visited 68 sites, and collected 15 complete
                    addresses.
                </li>
                <li>
                    <strong>Edmonton Cemetery</strong> Shortlisted 148 sites,
                    visited 162 sites, and collected 81 complete addresses.
                </li>
                <li>
                    <strong>Beechmount Cemetery</strong> Shortlisted 1796 sites,
                    visited 53 sites, and collected 49 completed addresses.
                </li>
            </ul>
            <p>
                Some sites not yet documented for data collection from
                Beechmount Cemetery in this dataset due to funding constraints.{' '}
                <a href="/about/support">Please consider a donation</a>{' '}
                supporting the continued development of this project and
                completion of this dataset.
            </p>
        </AboutLayout>
    );
};

export default Methodology;
