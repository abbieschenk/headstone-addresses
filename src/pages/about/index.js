import React from "react";
import AboutLayout from "../../components/AboutLayout";
import { Image, Transformation } from 'cloudinary-react';

const About = () => {
    return (
        <AboutLayout>
            <h1>About</h1>
            <p>Headstone Addresses is a community project from the 2020 Digital Heritage Experiences grants stream. This project is supported by the Edmonton Heritage Council and the City of Edmonton.</p>
            <p className="logo-image">
                <Image cloudName="headstone-addresses" dpr="auto" responsive width="auto" crop="scale" publicId="ehc_logo.png" />
            </p>
            <p>
                During two festivals in Chinese culture, 清明 in the Spring and 重陽 in the Fall, various folk traditions honouring ancestors have been celebrated around the world for generations. These are times to reconnect, celebrate memories, as well as build kinship and community relationships.
            </p>
            <p>
                Cemeteries are community spaces like parks and natural areas, a feature of urban and suburban settlements. These are places which can also allow visitors to connect and learn about the land, the people, and heritage history. Whether that knowledge is hidden in a place name, on monument markers and plaques on buildings, or in the rows of headstones. Headstones can be used to mark, hold space, share, commemorate, and remember: their messages are from those who have come before so those who come after may learn about connections to the land then and now. 
            </p>
            <p>
                As communities shift and change, as people move and grow, the oral histories for cultural knowledge and grave-sweeping practices are being lost. Especially where language or cultural ties have been frayed by migration, severed or broken by distance.
            </p>
            <p>
                In this project, we examine cultural ways and knowledge which have begun to be lost. We explore practices which have evolved and changed through the translation of time. We begin to decipher what has been preserved in the hieroglyphs of over hundreds of headstones by documenting global migration history, found across 3 municipal historic cemeteries, dating from ____ to 1995 . In this process, we hope that these threads of intangible cultural heritage, history, and knowledge will continue to be preserved and celebrated by future generations of diverse peoples. 
            </p>
            <p>
                For over six generations of Chinese-Canadians, headstones list the addresses of ancestral villages and towns, which have connected people and knowledge from across the oceans. The stories in these addresses are not only linked to global cultural changes, to Canadian immigration and labour history, but also the racial discrimination in colonialization of the lands around Treaty 6. 
            </p>
            <p>
                So, who were the generations of Chinese-Canadians here, in the Treaty 6 lands around Edmonton? Click through the map to find their connected stories!
            </p>
        </AboutLayout>
    );
}

export default About;