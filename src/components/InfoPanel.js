import React from "react";


const InfoPanel = ({data}) => {


    return (
        <>
            {data ? 
                data.Address ? (
                    <div className="info-panel headstone">
                        <div>
                            <strong>Name:</strong> {data.FirstName} {data.LastName}
                        </div>
                        <div>
                            <strong>Address: </strong> {data.Address}
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
    
    
        </>
    );
};

export default InfoPanel;
