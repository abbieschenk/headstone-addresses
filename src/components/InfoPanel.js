import React from "react";
import { Link } from "gatsby";

import "../styles/InfoPanel.scss";

const InfoPanel = ({data}) => {
    return (
        <div className="info-panel">
            {data ? 
                data.City ? (
                    <div className="info headstone">
                        <div className="section">
                            <div>
                                <strong>{data.FullNameChinese}</strong> {data.FirstNameEnglish} {data.LastNameEnglish}
                            </div>
                            <div>
                                {data.BirthYear}{data.BirthYear ? "–" : "Buried "}{data.DeathYear}    
                            </div>
                        </div>
                        <div className="section">
                            <div>
                                <strong>Address</strong> 
                            </div>
                            <div>
                                {data.HeadstoneNotes}
                            </div>
                            <div>
                                {data.Province}{data.City && ", "}{data.City}{data.Town && ", "}{data.Town}{data.Village && ", "}{data.Village}{data.Neighbourhood && ", "}{data.Neighbourhood}
                            </div>
                        </div>
                        <div className="section">
                            <div>
                                <strong>Cemetery</strong> 
                            </div>
                                {data.CemeteryName} Cemetery
                            <div>
                                {data.Section} {data.Block} {data.Plot}
                            </div>
                        </div>
                        {data.Note && (
                        <div className="section">
                            <i>{data.Note}</i>
                        </div>
                        )}
                    </div>
                ) : ( 
                    <div className="info address">
                        <div>
                            <strong>{data.NameChinese}</strong> {data.NameEnglish}
                        </div>
                    </div>
            ) : (
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
            )}
        </div>
    );
};

export default InfoPanel;
