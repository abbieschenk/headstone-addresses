import React, { 
    useEffect, 
    useState, 
} from "react";

import { useStaticQuery, graphql } from "gatsby";

import Layout from "../components/Layout";
import AddressGraph from "../components/AddressGraph";

const Index = () => {
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
            {!loading && (
                <AddressGraph 
                    headstones={allHeadstonesCsv.nodes}
                    addresses={allAddressesCsv.nodes}
                />
            )}
        </Layout>
    );
}

export default Index;