import React, { 
    useEffect, 
    useState,
    useRef,
    useCallback
} from "react";

import * as d3 from "d3";

import "../styles/AddressGraph.scss";

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
    const [showAll, setShowAll] = useState(false);
    const [showAllButtonText, setShowAllButtonText] = useState("Show All Connections");
    
    const [selected, setSelected] = useState(null);

    const [minYear, setMinYear] = useState(minBirthYear);
    const [maxYear, setMaxYear] = useState(maxBurialYear);

    const d3ref = useRef();
    const timeFilterCheckbox = useRef();

    const isInDateRange = useCallback((headstone) => {
        return !timeFilterEnabled || 
                    ((headstone.BirthYear >= minYear) && (headstone.BurialYear <= maxYear));
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

    const onShowAllClick = useCallback((e) => {
        if(!showAll) {
            setShowAllButtonText("Show Selected Connections");
        } else {
            setShowAllButtonText("Show All Connections");
        }

        setShowAll(!showAll)
    }, [showAll]);


    useEffect(() => {
        const svg = d3.select(d3ref.current);

        svg.append("rect")
            .attr("class", "background")
            .attr("width", "100%")
            .attr("height","100%")
            .on("click", () => {
                setSelected(null);
            });

    }, []);

    useEffect(() => {
        const svg = d3.select(d3ref.current);

        svg.selectAll(".address,.headstone,.connection").remove();

        headstones.forEach((headstone) => {
            const address = addresses.find(a => a.Name === headstone.Address);

            svg.append("path")
                .attr("class", "connection headstone-to-address")
                .datum({
                    origin: headstone,
                    target: address,
                })
                .style("stroke", address.Color)
                .style("fill", "none")
                .attr("d", d => generatePathData(d, "left"))
                .attr("opacity", 0);
            
            svg.append("path")
                .attr("class", "connection address-to-headstone")
                .datum({
                    origin: address,
                    target: headstone,
                })
                .style("stroke", address.Color)
                .style("fill", "none")
                .attr("d", d => generatePathData(d, "right"))
                .attr("opacity", 0);

            svg.append("circle")
                .datum(headstone)
                .attr("class", "node headstone")
                .style("stroke", address.Color)
                .style("fill", "white")
                .attr("cx", headstone.LocX)
                .attr("cy", headstone.LocY)
                .attr("r", 5)
                .on("click", () => {
                    setSelected(headstone);
                    // TODO should change the colour too
                });
        });

        addresses.forEach((address) => {
            svg.append("rect")
                .datum(address)
                .attr("class", "node address")
                .style("fill", address.Color)
                .attr("x", address.LocX - 5)
                .attr("y", address.LocY - 5)
                .attr("width", 10)
                .attr("height", 10)
                .on("click", () => {
                    setSelected(address);
                    // TODO should change colour too
                });
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

        if(selected !== null || showAll) {

            const shouldDraw = (d) => {
                return ((showAll && !d.origin.Address) || (selected === d.origin))
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
        } else {
            svg.selectAll("path").attr("opacity", 0);
        }

    }, [selected, showAll, isInDateRange]);

    return (
        <div style={
            {
                display:"flex",
                flexDirection: "row",
            }
            
        }>
            <div>
                <svg 
                    id="d3"
                    ref={d3ref} 
                    viewBox="0 0 250 250"
                />
            
                <div>
                    <button
                        onClick={(e) => onShowAllClick(e)}
                    >
                        {showAllButtonText}
                    </button>
                </div>

                <div>
                    <input
                        type="checkbox"
                        name="Time Slider"
                        ref={timeFilterCheckbox}
                        onChange={(e) => onTimeFilterCheckboxClick(e)}
                    />
                    <TimeSlider
                        className={timeFilterEnabled ? "active" : "disabled"}
                        min={minBirthYear}
                        max={maxBurialYear}
                        onMinChange={(d) => { onTimeFilterMinChange(d) }}
                        onMaxChange={(d) => { onTimeFilterMaxChange(d) }}
                    />
                </div>
            </div>
            <div style = {{
                width: "250px",
                height: "250px",
                padding: "15px",
                border: "solid 3px black"
            }}>
                <InfoPanel
                    data={selected}
                />
            </div>
        </div>
    );
}

/** 
 * 
 * TODO 
 * - Centered family name in circle 
 * - D3 responsive https://medium.com/@louisemoxy/a-simple-way-to-make-d3-js-charts-svgs-responsive-7afb04bc2e4b
 * - Animate the time slider?
 * - Check TODOs littered throughout.
 */

export default AddressGraph;