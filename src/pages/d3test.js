import React, { 
    useEffect, 
    useState, 
    useRef} from "react";

import { useStaticQuery, graphql } from "gatsby";


import AddressGraph from "../components/AddressGraph.js";

const D3Test = () => {
    const [loading, setLoading] = useState(true);

    const {allHeadstonesCsv} = useStaticQuery(graphql `
        query AllHeadstones {
            allHeadstonesCsv {
                nodes {
                    FirstName
                    LastName
                    EndX
                    EndY
                    LocX
                    LocY
                }
            }
        }
    `);

    useEffect(() => {
        if(allHeadstonesCsv) {
            setLoading(false);
        }
    
    }, [allHeadstonesCsv]);

    return (
        <main>
            {loading ? (
                <h1>Loading</h1>
            ) : (
                <>
                <h1>Headstone Addresses</h1>
                <AddressGraph 
                    data={allHeadstonesCsv.nodes}
                />
                </>
            )}
        </main>
    );
}

export default D3Test;