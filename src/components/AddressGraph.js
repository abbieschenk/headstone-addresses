import React, { 
    useEffect, 
    useState,
    useRef,
} from "react";

import * as d3 from "d3";


import InfoPanel from "../components/InfoPanel";

const AddressGraph = ({data}) => {
    const [selected, setSelected] = useState(null);

    const d3ref = useRef();

    useEffect(() => {
        const svg = d3.select(d3ref.current);

        var lineGenerator = d3.line().curve(d3.curveCardinal());


        svg.selectAll('connections')
            .data(data)
            .join("line")
                .style('stroke', 'black')
                .attr('x1', d => d.LocX)
                .attr('y1', d => d.LocY)
                .attr('x2', d => d.EndX)
                .attr('y2', d => d.EndY)
                .attr('curve', d3.curveBasis);

        svg.selectAll("headstone")
            .data(data)
            .join("circle")
                .on("click", (e, d) => setSelected(d))
                .attr("cx", d => d.LocX)
                .attr("cy", d => d.LocY)
                .attr("r", 5);

        svg.selectAll("address")
            .data(data)
            .join("circle")
                .style("fill", "red")
                .attr("cx", d => d.EndX)
                .attr("cy", d => d.EndY)
                .attr("r", 5);

    }, []);

    return (
        <>
            <svg 
                id="d3"
                ref={d3ref} 
                viewBox="0 0 250 250"
            /> 
            <InfoPanel
                data={selected}
            />
        </>
    );
}

export default AddressGraph;