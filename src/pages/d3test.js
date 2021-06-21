import React, { 
    useEffect, 
    useState, 
} from "react";

import { useStaticQuery, graphql } from "gatsby";


import AddressGraph from "../components/AddressGraph.js";

const D3Test = () => {
    const [loading, setLoading] = useState(true);

    const {allHeadstonesCsv, allAddressesCsv} = useStaticQuery(graphql `
        query  {
            allHeadstonesCsv {
                nodes {
                    FirstName
                    LastName
                    LastNameChinese
                    LocX
                    LocY
                    Address
                    BirthYear
                    BurialYear
                }
            }
            allAddressesCsv {
                nodes {
                  Name
                  LocX
                  LocY
                  Color
                }
            }
        }
    `);

    useEffect(() => {
        if(allHeadstonesCsv) {
            setLoading(false);
        } else {
            setLoading(true);
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
                    headstones={allHeadstonesCsv.nodes}
                    addresses={allAddressesCsv.nodes}
                />
                </>
            )}
        </main>
    );
}

export default D3Test;