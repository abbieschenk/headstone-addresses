import React, { 
    useEffect, 
    useState, 
} from "react";

import { useStaticQuery, graphql } from "gatsby";

import Layout from "../components/Layout";
import AddressGraph from "../components/AddressGraph";

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
        <Layout>
            {loading ? (
                <h1>Loading...</h1>
            ) : (
            <>
                <AddressGraph 
                    headstones={allHeadstonesCsv.nodes}
                    addresses={allAddressesCsv.nodes}
                />
            </>
            )}
        </Layout>
    );
}

export default D3Test;