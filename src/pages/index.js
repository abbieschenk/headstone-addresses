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
                    CemeteryName
                    LastNameChinese
                    LastNameEnglish
                    FirstNameEnglish
                    BirthYear
                    DeathYear
                    Section
                    Block
                    Plot
                    Note
                    FullNameChinese
                    HeadstoneNotes
                    Province
                    City
                    Town
                    Village
                    Neighbourhood
                    LocX
                    LocY
                }
            }
            allAddressesCsv {
                nodes {
                    NameEnglish
                    NameChinese
                    LocX
                    LocY
                    Color
                }
            }
        }
    `);

    useEffect(() => {
        setLoading(!allHeadstonesCsv);
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