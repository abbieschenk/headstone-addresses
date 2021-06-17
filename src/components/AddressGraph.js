import React, { 
    useEffect, 
    useState,
    useRef,
    useCallback
} from "react";

import * as d3 from "d3";

import InfoPanel from "./InfoPanel";
import TimeSlider from "./TimeSlider";
import { svg } from "d3";

// As per https://stackoverflow.com/questions/17156283/d3-js-drawing-arcs-between-two-points-on-map-from-file
const generatePathData = (headstone, address, direction) => {
    const dx = headstone.LocX - address.LocX,
          dy = headstone.LocY - address.LocY,
          dr = Math.sqrt(dx * dx + dy * dy);

    const dirVal = direction === "left" ? 0 : 1;

    return "M" + address.LocX + "," + address.LocY + 
           "A" + dr + "," + dr + " 0 0," + dirVal + 
           " " + headstone.LocX + "," + headstone.LocY;
};

const drawPath = (svg, origin, target, direction) => {
    const path = svg.append("path")
                    .datum({
                        origin: origin,
                        target: target,
                    })
                    .style("stroke", "black")
                    .style("fill", "none")
                    .attr("d", d => generatePathData(d.origin, d.target, direction))
                    .attr("opacity", 1)
                    .lower();

    const totalLength = path.node().getTotalLength();

    path.attr("stroke-dasharray", totalLength + " " + totalLength)
        .attr("stroke-dashoffset", totalLength)
        .transition()
            .duration(300)
            .ease(d3.easeLinear)
            .attr("stroke-dashoffset", 0);
            
    return path;
}



const AddressGraph = ({headstones, addresses}) => {
    const [selected, setSelected] = useState(null);
    
    const [minYear, setMinYear] = useState(null);
    const [maxYear, setMaxYear] = useState(null);

    const d3ref = useRef();

    const isInDateRange = useCallback((headstone) => {
        return (!minYear || headstone.BirthYear >= minYear) && (!maxYear || headstone.BurialYear <= maxYear);
    }, [minYear, maxYear]);

    useEffect(() => {
        const svg = d3.select(d3ref.current);

        svg.selectAll("circle").remove();

        addresses.forEach((address) => {
            svg.append("circle")
                .datum(address)
                .style("fill", "red")
                .attr("cx", address.LocX)
                .attr("cy", address.LocY)
                .attr("r", 5)
                .on("click", () => {
                    setSelected(address);
                    // TODO should change the colour too
                });
        });


        headstones.forEach((headstone) => {
            svg.append("circle")
                .datum(headstone)
                .attr("cx", headstone.LocX)
                .attr("cy", headstone.LocY)
                .attr("r", 5)
                .on("click", () => {
                    setSelected(headstone);
                    // TODO should change the colour too
                });


            // const address = addresses.find(a => a.Name === headstone.Address);

            // drawPath(svg, address, selected, "left");

            
            // } else {
            //     headstones.filter(h => h.Address === selected.Name).forEach((headstone) => {
            //         drawPath(svg, headstone, selected, "right");
            //     });
            // }
            
        });


    }, [addresses, headstones]);

    useEffect(() => {
        const svg = d3.select(d3ref.current);

        svg.selectAll("circle").filter((d) => d.Address && isInDateRange(d)).attr("opacity", 1);
        svg.selectAll("circle").filter((d) => d.Address && !isInDateRange(d)).attr("opacity", 0);

    }, [minYear, maxYear]);

    useEffect(() => {
        if(selected && selected.Address && !isInDateRange(selected)) {
            setSelected(null);
        }
    }, [selected, minYear, maxYear]);

    useEffect(() => {
        const svg = d3.select(d3ref.current);


        /**
         * TODO Need to overhaul this
         * 
         * Draw all paths at start and set opacity to 0.
         * This means paths in both directions.
         * 
         * Whenever opacity is set to 1, the draw animation should play.
         * 
         * When anything is selected, we find the paths by d.origin selected and set opacity to 1
         * 
         * When we filter by date:
         *      If a Headstone is selected, set opacity to 0 for all paths with origin of the headstone.
         *      If an Address is selected, set opacity to 0 for all paths with target of headstones that are filtered out.
         * 
         */

        if(selected === null) {
            svg.selectAll("path").remove();
        } else if (svg.selectAll("path").filter((d) => {
                        return d === selected || d === selected.Address
                    }).empty()) {

            svg.selectAll("path").remove();

            if (selected.Address) {
                const address = addresses.find(a => a.Name === selected.Address);
    
                drawPath(svg, address, selected, "left");
            } else {
                headstones.filter(h => h.Address === selected.Name).forEach((headstone) => {
                    drawPath(svg, headstone, selected, "right");
                });
            }
        } else {
            svg.selectAll("path").filter((d) => {
                return !d.Address || !isInDateRange(d);
            });
            // Check birthyear / burialyear probably
        }

    }, [selected, maxYear, minYear, addresses, headstones]);

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
            <TimeSlider
                min={1900}
                max={2005}
                onMinChange={(d) => {setMinYear(d)}}
                onMaxChange={(d) => {setMaxYear(d)}}
            />
        </>
    );
}

/** 
 * 
 * TODO 
 * 
 * Need some sort of timeline-selector component
 * 
 * This will need to send the times selected back to this component,
 * which will re-render (and deselect if node no longer visible) the components.
 * 
 * 
 * */

export default AddressGraph;