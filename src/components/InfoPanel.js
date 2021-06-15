import React from "react";


const InfoPanel = ({data}) => {




    return (
        <div id="info-panel">
            {data && (
                <div>
                    <strong>First Name:</strong> {data.FirstName}
                </div>
            )}
    
    
        </div>
    );
};

export default InfoPanel;
