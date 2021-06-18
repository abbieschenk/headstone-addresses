import React, { 
    useEffect, 
    useState,
    useRef,
    useCallback
} from "react";

import * as d3 from "d3";

import InfoPanel from "./InfoPanel";
import TimeSlider from "./TimeSlider";

// As per https://stackoverflow.com/questions/17156283/d3-js-drawing-arcs-between-two-points-on-map-from-file
const generatePathData = (data, direction) => {
    const dx = data.target.LocX - data.origin.LocX,
          dy = data.target.LocY - data.origin.LocY,
          dr = Math.sqrt(dx * dx + dy * dy);

    const dirVal = direction === "left" ? 0 : 1;

    return "M" + data.origin.LocX + "," + data.origin.LocY + 
           "A" + dr + "," + dr + " 0 0," + dirVal + 
           " " + data.target.LocX + "," + data.target.LocY;
};

const AddressGraph = ({headstones, addresses}) => {
    const minBirthYear = Math.min.apply(Math, headstones.map((h) => { return h.BirthYear ? h.BirthYear : Number.MAX_VALUE } ));
    const maxBurialYear = Math.max.apply(Math, headstones.map((h) => { return h.BurialYear ? h.BurialYear : Number.MIN_VALUE } ));


    const [timeFilterEnabled, setTimeFilterEnabled] = useState(false);
    
    const [selected, setSelected] = useState(null);

    const [minYear, setMinYear] = useState(null);
    const [maxYear, setMaxYear] = useState(null);

    const d3ref = useRef();
    const timeFilterCheckbox = useRef();

    const isInDateRange = useCallback((headstone) => {
        return !timeFilterEnabled || 
                    ((!minYear || (headstone.BirthYear >= minYear)) && 
                        (!maxYear || (headstone.BurialYear <= maxYear)));
    }, [minYear, maxYear, timeFilterEnabled]);

    const onTimeFilterCheckboxClick = useCallback((e) => {
        setTimeFilterEnabled(e.target.checked);
    }, []);

    const onTimeFilterMinChange = useCallback((min) => {
        setMinYear(min);
        timeFilterCheckbox.current.checked = true;
        setTimeFilterEnabled(true);
    }, []);

    const onTimeFilterMaxChange = useCallback((max) => {
        setMaxYear(max);
        timeFilterCheckbox.current.checked = true;
        setTimeFilterEnabled(true);
    }, []);

    useEffect(() => {
        const svg = d3.select(d3ref.current);

        svg.selectAll("circle").remove();

        addresses.forEach((address) => {
            svg.append("circle")
                .datum(address)
                .attr("class", "address")
                .style("fill", "red")
                .attr("cx", address.LocX)
                .attr("cy", address.LocY)
                .attr("r", 5)
                .on("click", () => {
                    setSelected(address);
                    // TODO should change colour too
                });
        });


        headstones.forEach((headstone) => {
            svg.append("circle")
                .datum(headstone)
                .attr("class", "headstone")
                .attr("cx", headstone.LocX)
                .attr("cy", headstone.LocY)
                .attr("r", 5)
                .on("click", () => {
                    setSelected(headstone);
                    // TODO should change the colour too
                });

            const address = addresses.find(a => a.Name === headstone.Address);

            svg.append("path")
                .datum({
                    origin: headstone,
                    target: address,
                })
                .style("stroke", "black")
                .style("fill", "none")
                .attr("d", d => generatePathData(d, "left"))
                .attr("opacity", 0)
                .lower();
            
            svg.append("path")
                .datum({
                    origin: address,
                    target: headstone,
                })
                .style("stroke", "black")
                .style("fill", "none")
                .attr("d", d => generatePathData(d, "right"))
                .attr("opacity", 0)
                .lower();
        });


    }, [addresses, headstones]);

    useEffect(() => {
        const svg = d3.select(d3ref.current);

        svg.selectAll(".address,.headstone").filter((d) => d.Address && isInDateRange(d)).attr("opacity", 1);
        svg.selectAll(".address,.headstone").filter((d) => d.Address && !isInDateRange(d)).attr("opacity", 0);

    }, [isInDateRange]);

    useEffect(() => {
        if(selected && selected.Address && !isInDateRange(selected)) {
            setSelected(null);
        } else {
            // TODO change the colour of all selected things
        }

    }, [selected, isInDateRange]);

    useEffect(() => {
        const svg = d3.select(d3ref.current);

        if(selected === null) {
            svg.selectAll("path").attr("opacity", 0);
        } else {

            const shouldDraw = (d) => {
                return selected === d.origin
                    && ((d.origin.Address && isInDateRange(d.origin)) || isInDateRange(d.target))
            };

            svg.selectAll("path")
                .filter((d) => !shouldDraw(d))
                .attr("opacity", 0);

            svg.selectAll("path")
                    .filter((d) => shouldDraw(d))
                    .each((d, i, nodes) => {
                        
                        const path = d3.select(nodes[i]);
                        
                        if(path.attr("opacity") === "0") {

                            const totalLength = path.node().getTotalLength();

                            path.attr("stroke-dasharray", totalLength + " " + totalLength)
                                .attr("stroke-dashoffset", totalLength)
                                .attr("opacity", 1)
                                .transition()
                                    .duration(300)
                                    .ease(d3.easeLinear)
                                    .attr("stroke-dashoffset", 0);
                        }
                    });
        }

    }, [selected, isInDateRange]);

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
            <input
                type="checkbox"
                name="Time Slider"
                ref={timeFilterCheckbox}
                onChange={(e) => onTimeFilterCheckboxClick(e)}
            >
            </input>
            
            <TimeSlider
                className={timeFilterEnabled ? "active" : "disabled"}
                min={minBirthYear}
                max={maxBurialYear}
                onMinChange={(d) => { onTimeFilterMinChange(d) }}
                onMaxChange={(d) => { onTimeFilterMaxChange(d) }}
            />
        </>
    );
}

/** 
 * 
 * TODO 
 * 
 * - Min / max year based on min birth / max burial dates
 * - Handle null values for birth / burial dates -> they disappear on "min" but not on max, and do not reappear. Do this after toggle.
 * - D3 responsive https://medium.com/@louisemoxy/a-simple-way-to-make-d3-js-charts-svgs-responsive-7afb04bc2e4b
 * - Animate the time slider?
 * - Paths should have colours based on the address. See how many addresses there are first.
 * - Check TODOs littered throughout.
 * 
 * */

export default AddressGraph;