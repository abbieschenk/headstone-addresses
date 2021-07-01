import React from "react";

/***
 *  TODO show the following info
 * 
 *     allHeadstonesCsv {
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

 */

const InfoPanel = ({data}) => {
    return (
        <div id="info-panel">
            {data ? 
                data.City ? (
                    <div className="info-panel headstone">
                        <div>
                            <strong>{data.FirstNameEnglish} {data.LastNameEnglish} | {data.FullNameChinese}</strong>
                        </div>
                        <div>
                            {data.BirthYear}{data.BirthYear ? "–" : "Buried "}{data.DeathYear}    
                        </div>
                        <div>
                           <strong>Address</strong> 
                        </div>
                        <div>
                            {data.HeadstoneNotes}
                        </div>
                        <div>
                            {data.Province} - {data.City} - {data.Town} - {data.Village} - {data.Neighbourhood}
                        </div>
                        <div>
                            <strong>Cemetery</strong> 
                        </div>
                            {data.CemeteryName} Cemetery
                        <div>
                            {data.Section} {data.Block} {data.Plot}
                        </div>
                        <div>
                            <i>{data.Note}</i>
                        </div>
                    

                        <div>
                            <strong>Debug Info</strong>
                        </div>
                        <div>
                            <strong>LocX: </strong> {data.LocX}
                        </div>
                        <div>
                            <strong>LocY: </strong> {data.LocY}
                        </div>
                        <div>
                            <strong>OriginalLocX: </strong> {data.OriginalLocX}
                        </div>
                        <div>
                            <strong>OriginalLocY: </strong> {data.OriginalLocY}
                        </div>
                    </div>
                ) : ( 
                    <div className="info-panel address">
                        <div>
                            <strong>Name:</strong>  {data.Name}
                        </div>
                    </div>
            ) : (
                <div className="info-panel empty" />
            )}
    
    
        </div>
    );
};

export default InfoPanel;
