import React from "react";
import AboutLayout from "../../components/AboutLayout";
import { Image, Transformation } from 'cloudinary-react';

const About = () => {
    return (
        <AboutLayout>
            <h1>About</h1>
            <p>Headstone Addresses is a community project from the 2020 Digital Heritage Experiences grants stream. This project is supported by the Edmonton Heritage Council and the City of Edmonton.</p>
            <p className="image logo">
                <Image cloudName="headstone-addresses" dpr="auto" responsive width="auto" crop="scale" publicId="ehc_logo.png" secure="true"/>
            </p>
            <p>
                Headstone Addresses is a digital visualization map made in the context of grave/tomb-sweeping traditions to celebrate the history of over six generations of Asian-Canadians and Chinese diaspora in Edmonton.
            </p>
            <p>
                Archival research combined with cemetery site documentation examines Canada’s colonial history, global migration patterns, as well as labour policies and settlement stories on the Treaty 6 lands around Edmonton.
            </p>
            <p>
                300 sites were visited and 145 complete ancestral hometown addresses were successfully collected by hand from the 3 Historical Cemeteries of Edmonton. The birthdate and burial dates spanned lifetimes between 1872 to 1995. 
            </p>
            <p>
                Headstone Addresses reconsiders the framing of stories around labour history (CPR & NPR), the Klondike Gold Rush era, as well as the settlement frame for city development from Fort Edmonton to Gateway to the North.
            </p>
            <p>
                The data matches with stories from communities directly impacted by Federal Head Tax (1885), racial immigration ban of Canada’s Chinese Immigration Act (1923-1947), etc.
            </p>
            <p>
                Headstone Addresses highlights the roots and origin stories of Chinatown communities in Canada since the early 1800s and provides representation for ethnocultural groups such as the Cantonese, Toisanese, Hokkienese, TeowChoew and many others.
            </p>
            <h2>Tomb-Sweeping</h2>
            <p>
                During the two tomb/grave-sweeping festivals 清明 (Cing Ming) in the Spring and 重陽 (Cung Joeng) in the Fall, people around the world participate in folk traditions to honour ancestors. This is a time for families to reconnect and communities to build relationships. Many practices are shared through oral histories for cultural knowledge and are slowly being lost by next generations of Canadians of diverse Chinese heritage.
            </p>
            <p>
                Cemeteries can be community spaces not unlike parks and natural areas. These are places that allow us to gather, connect, and learn about culture, people, and our shared histories on the land. Whether these stories are hidden in the place names or street names, on monument markers or plaques on buildings, or on crypts and headstones, these stories remind us to pause and reflect on the cycle of life and the lives we live.
            </p>
            <p>
                For over six generations of Chinese-Canadians, headstones list the addresses of ancestral villages and towns, which have connected people and knowledge from across the oceans. This project captured a snapshot of fading knowledge around headstone addresses, tomb-sweeping and burial practices, folk traditions, community kin-ship, and the diversity in the history of Chinese-Canadians.
            </p>
            <p>
                <strong>
                    So, who were the generations of Chinese-Canadians here, in the Treaty 6 lands around Edmonton and what do these headstone addresses tell us?
                </strong>
            </p>
            <p>
                Stories of social practices, traditional knowledge, ethnolinguistic diversity, geopolitics,  history of Chinatown roots, global migration patterns, as well as colonial labour history in Canada.
            </p>
            <h2>Logo</h2>
            <p>
                The mission behind our visual identity extends far beyond just a logo. Our objective is to visually represent Chinese-Canadian history and its importance of our heritage history through the development of digital resources such as Headstone Addresses.
            </p>
            <p>
                Inspired by Chinese tradition, our brand identity follows a visual motif supported by the Chinese character, “祀” meaning worship. The visual motif visually represents an individual bowing/worshipping as seen in the brown tone with a calligraphic style. Our visual identity is rooted in a traditional style with a focus on cultural sensitivity, nuance, and representation.
            </p>
            <p>
                The colour palette was chosen to complement themes of death, celebration, and mourning. The mixture of brown and grey shades reflects humbleness, while the cool, green tone depicts mourning in Chinese culture; a complimentary pair.
            </p>
            <p className="image case-study">
                <Image cloudName="headstone-addresses" dpr="auto" responsive width="auto" crop="scale" publicId="logo_case_study_drawings.webp" secure="true" />
            </p>
            <p className="image case-study">
                <Image cloudName="headstone-addresses" dpr="auto" responsive width="auto" crop="scale" publicId="logo_case_study.webp" secure="true" />
            </p>
            <p>
                The logo was designed by <a href="https://adelinacreative.com" target="_blank" rel="noreferrer noopener">Adelina Creative</a>.
            </p>
            <h2>Website</h2>
            <p>
                This website was built with <a href="https://www.gatsbyjs.com/" target="_blank" rel="noreferrer noopener">Gatsby</a>. The data visualization was built with <a href="https://d3js.org/" target="_blank" rel="noreferrer noopener">D3.js</a>. The full source code is available on <a href="https://github.com/abbieschenk/headstone-addresses" target="_blank" rel="noreferrer noopener">GitHub</a> under the AGPLv3 license. The website was built and desigend by <a href="https://abbieschenk.com" target="_blank" rel="noreferrer noopener">Abbie Schenk</a>.
            </p>
        </AboutLayout>
    );
}

export default About;