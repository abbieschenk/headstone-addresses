import React from "react";
import { Link } from "gatsby";

import "../styles/InfoPanel.scss";

const InfoPanel = ({data}) => {
    const { headstone, address } = data;
    
    const {
        FullNameChinese,
        FirstNameEnglish,
        LastNameEnglish,
        BirthYear,
        DeathYear,
        HeadstoneNotes,
        Province,
        City,
        Town,
        Village,
        Neighbourhood,
        CemeteryName,
        Section,
        Block,
        Plot,
        Note,
    } = headstone || {};

    const { NameChinese, NameEnglish } = address || {};

    return (
        <div className="info-panel">
            { (() => {
                if(headstone) {
                    return (
                        <div className="info headstone">
                            <div className="section">
                                <div>
                                    <strong>{FullNameChinese}</strong> {FirstNameEnglish} {LastNameEnglish}
                                </div>
                                <div>
                                    {BirthYear}{BirthYear ? "–" : "Buried "}{DeathYear}    
                                </div>
                            </div>
                            <div className="section">
                                <div>
                                    <strong>Address</strong> 
                                </div>
                                <div>
                                    {HeadstoneNotes}
                                </div>
                                <div>
                                    {Province && `${Province}, `}{City}{Town && `, ${Town}`}{Village && `, ${Village}`}{Neighbourhood && `, ${Neighbourhood}`}
                                </div>
                            </div>
                            <div className="section">
                                <div>
                                    <strong>Cemetery</strong> 
                                </div>
                                    {CemeteryName} Cemetery
                                <div>
                                    {Section} {Block} {Plot}
                                </div>
                            </div>
                        {Note && (
                            <div className="section">
                                <i>{Note}</i>
                            </div>
                        )}
                    </div>
                    )
                } else if (address) {
                    return (
                        <div className="info address">
                            <div>
                                <strong>{NameChinese}</strong> {NameEnglish}
                            </div>
                        </div>
                    )
                } else {
                    return (
                        <div className="info empty">
                            <div className="section">
                                Chinese headstones often document ancestral hometown addresses. This visualization links headstones to their addresses.
                            </div>
                            <div className="section">
                                Select a headstone on the right or hometown on the left to see their links. Zoom by scrolling and pan by dragging.
                            </div>
                            <div className="section">
                                Drag the slider to filter by birth date and burial date. Headstones without birth dates will be hidden.
                            </div>
                            <div className="section">
                                Best viewed on a larger screen. See <Link to="/about">About</Link> for more information.
                            </div>
                        </div>
                    )
                }
            })()
            }
        </div>
    );
};

export default InfoPanel;