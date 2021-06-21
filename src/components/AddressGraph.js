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
const generatePathData = (origin, target, direction) => {
    const dx = target.LocX - origin.LocX,
          dy = target.LocY - origin.LocY,
          dr = Math.sqrt(dx * dx + dy * dy);

    const dirVal = direction === "left" ? 0 : 1;

    return "M" + origin.LocX + "," + origin.LocY + 
           "A" + dr + "," + dr + " 0 0," + dirVal + 
           " " + target.LocX + "," + target.LocY;
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

    const drawPath = useCallback((path) => {
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
            .on("click", () => {
                setSelected(null);
            });

    }, []);

    useEffect(() => {
        const svg = d3.select(d3ref.current);

        svg.selectAll(".address,.headstone,.connection").remove();

        headstones.forEach((h) => {
            h.AddressObj = addresses.find(a => a.Name === h.Address);
        });

        svg.selectAll(".headstone-to-address")
            .data(headstones)
            .enter().append("path")
                .attr("class", "connection headstone-to-address")
                .style("stroke", (h) => h.AddressObj.Color)
                .style("fill", "none")
                .attr("d", (h) => generatePathData(h, h.AddressObj, "left"))
                .attr("opacity", 0);

        svg.selectAll(".address-to-headstone")
            .data(headstones)
            .enter().append("path")
                .attr("class", "connection address-to-headstone")
                .style("stroke", (h) => h.AddressObj.Color)
                .style("fill", "none")
                .attr("d", (h) => generatePathData(h.AddressObj, h, "right"))
                .attr("opacity", 0);

        const headstoneNodes = svg.selectAll("g")
            .data(headstones)
            .enter().append("g")
            .classed("node headstone", true)
            .attr("transform", function(d){return "translate("+d.LocX+","+ d.LocY + ")"})
            .on("click", (e, h) => setSelected(h));

        headstoneNodes.append("circle")
            .attr("r", 5)
            .style("stroke", (h) => h.AddressObj.Color)
            .style("stroke", (h) => h.AddressObj.Color)
       
        headstoneNodes.append("text")
            .attr("dx", function(d){return -3.75})
            .attr("dy", function(d){return 2.5})
            .text(function(d){return d.LastNameChinese})

        svg.selectAll(".address")
            .data(addresses)
            .enter().append("rect")
                .attr("class", "node address")
                .style("fill", (a) => a.Color)
                .attr("x", (a) => a.LocX - 5)
                .attr("y", (a) => a.LocY - 5)
                .attr("width", 10)
                .attr("height", 10)
                .on("click", (e, a) => setSelected(a));

    }, [addresses, headstones]);

    useEffect(() => {
        const svg = d3.select(d3ref.current);

        svg.selectAll(".address,.headstone").filter((d) => d.Address && isInDateRange(d)).attr("opacity", 1);
        svg.selectAll(".address,.headstone").filter((d) => d.Address && !isInDateRange(d)).attr("opacity", 0);

    }, [isInDateRange]);

    useEffect(() => {
        const svg = d3.select(d3ref.current);

        svg.selectAll(".node")
            .classed("selected", false);

        if(selected) {
            if(selected.Address) {
                if(!isInDateRange(selected)) {
                    setSelected(null);
                } else {
                    d3.selectAll(".headstone")
                        .filter((h) => h === selected)
                        .classed("selected", true);
                }
            } else {
                d3.selectAll(".address")
                    .filter((a) => a === selected)
                    .classed("selected", true);
            }
        } 
    }, [selected, isInDateRange]);

    useEffect(() => {
        const svg = d3.select(d3ref.current);

        if(showAll) {
            svg.selectAll(".address-to-headstone")
                .filter((h) => !isInDateRange(h))
                .attr("opacity", 0);
            
            svg.selectAll(".address-to-headstone")
                .filter((h) => isInDateRange(h))
                .each((d, i, nodes) => drawPath(d3.select(nodes[i])));

        } else if(selected !== null) {
            if(selected.Address) {
                svg.selectAll("path")
                    .filter((h) => selected !== h)
                    .attr("opacity", 0);

                svg.selectAll(".headstone-to-address")
                    .filter((h) => selected === h)
                    .each((d, i, nodes) => drawPath(d3.select(nodes[i])));
            } else {
                svg.selectAll("path")
                    .filter((h) => selected !== h.AddressObj || !isInDateRange(h))
                    .attr("opacity", 0);
                
                svg.selectAll(".address-to-headstone")
                    .filter((h) => ((selected === h.AddressObj) && isInDateRange(h)))
                    .each((d, i, nodes) => drawPath(d3.select(nodes[i])));
                }
        } else {
            svg.selectAll("path").attr("opacity", 0);
        }

    }, [selected, showAll, isInDateRange, drawPath]);

    return (
        <div id="address-graph">
            <div className="center-column">
                <svg 
                    id="d3"
                    ref={d3ref} 
                    viewBox="0 0 500 250"
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
            <InfoPanel
                data={selected}
            />
        </div>
    );
}

/** 
 * 
 * TODO 
 * - D3 responsive https://medium.com/@louisemoxy/a-simple-way-to-make-d3-js-charts-svgs-responsive-7afb04bc2e4b
 * - Animate the time slider?
 * - Check TODOs littered throughout.
 */

export default AddressGraph;