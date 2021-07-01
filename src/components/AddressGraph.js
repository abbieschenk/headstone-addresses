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

// Adapted from https://stackoverflow.com/questions/17156283/d3-js-drawing-arcs-between-two-points-on-map-from-file
const generatePathData = (origin, target, transform) => {
    const left = 0;
    const right = 1;
    const dirVal = origin.AddressObj ? left : right;
    
    const targetX = parseInt(target.LocX)
                        * (dirVal === right && transform && transform.k ? transform.k : 1)
                        + (dirVal === right && transform && transform.x ? transform.x : 0);

    const targetY = parseInt(target.LocY) 
                        * (dirVal === right && transform && transform.k ? transform.k : 1)
                        + (dirVal === right && transform && transform.y ? transform.y : 0);

    const originX = parseInt(origin.LocX)
                        * (dirVal === left && transform && transform.k ? transform.k : 1)
                        + (dirVal === left && transform && transform.x ? transform.x : 0);

    const originY = parseInt(origin.LocY) 
                        * (dirVal === left && transform && transform.k ? transform.k : 1)
                        + (dirVal === left && transform && transform.y ? transform.y : 0);

    const dx = targetX - originX,
          dy = targetY - originY,
          dr = Math.sqrt(dx * dx + dy * dy);

    return "M" + originX + "," + originY + 
           "A" + dr + "," + dr + " 0 0," + dirVal + 
           " " + targetX + "," + targetY;
};

const HEIGHT = 250;
const WIDTH = 500;

const AddressGraph = ({headstones, addresses}) => {
    const minBirthYear = Math.min.apply(Math, headstones.map((h) => { return h.BirthYear ? h.BirthYear : Number.MAX_VALUE } ));
    const maxDeathYear = Math.max.apply(Math, headstones.map((h) => { return h.DeathYear ? h.DeathYear : Number.MIN_VALUE } ));

    const [timeFilterEnabled, setTimeFilterEnabled] = useState(false);

    const [showAll, setShowAll] = useState(false);
    
    const [selected, setSelected] = useState(null);

    const [minYear, setMinYear] = useState(minBirthYear);
    const [maxYear, setMaxYear] = useState(maxDeathYear);

    const d3ref = useRef();
    const timeToggle = useRef();

    const isInDateRange = useCallback((headstone) => {
        return !timeFilterEnabled || 
                    ((headstone.BirthYear >= minYear) && (headstone.DeathYear <= maxYear));
    }, [minYear, maxYear, timeFilterEnabled]);

    const onTimeToggle = useCallback((e) => {
        setTimeFilterEnabled(e.target.checked);
    }, []);

    const onTimeFilterMinChange = useCallback((min) => {
        setMinYear(min);
        timeToggle.current.checked = true;
        setTimeFilterEnabled(true);
    }, []);

    const onTimeFilterMaxChange = useCallback((max) => {
        setMaxYear(max);
        timeToggle.current.checked = true;
        setTimeFilterEnabled(true);
    }, []);

    const onConnectionsToggle = useCallback((e) => {
        setShowAll(e.target.checked);
    }, []);

    const drawPath = useCallback((path) => {
        if(path.attr("opacity") === "0") {
            const totalLength = path.node().getTotalLength();

            path.attr("stroke-dasharray", totalLength + " " + totalLength)
                .attr("stroke-dashoffset", totalLength);

            path
                .attr("opacity", 1)
                .transition()
                    .duration(300)
                    .ease(d3.easeLinear)
                    .attr("stroke-dashoffset", 0);
        }
    }, []);

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
        
        const maxLocX  = Math.max.apply(Math, headstones.map((h) => { return parseInt(h.LocX) } ));
        const maxLocY = Math.max.apply(Math, headstones.map((h) => { return parseInt(h.LocY) } ));
        
        const max = (maxLocX > maxLocY ? maxLocX : maxLocY);

        const yScale = d3.scaleLinear()
                .domain([0, max])
                .range([max, 0]);

        const xScale = d3.scaleLinear()
                .domain([0, max])
                .range([0, max])

        headstones.forEach((h) => {
            h.AddressObj = addresses.find(a => a.NameEnglish === h.City);


            h.OriginalLocX = h.LocX;
            h.OriginalLocY = h.LocY;

            let locX = parseInt(h.LocX) * 5;
            let locY = parseInt(h.LocY) * 5;

            // locX += 150;

            if(h.CemeteryName === "Beechmount") {
                locX += 600;
                locY += 400;
            } else if(h.CemeteryName === "Mount Pleasant") {
                locX += 400;
            } else if(h.CemeteryName === "Edmonton") {
                locY += 400;
            }

            h.LocX = xScale(locX) + "";
            h.LocY = yScale(locY) + "";
        
        });

        svg.selectAll(".headstone-to-address")
            .data(headstones)
            .enter().append("path")
                .attr("class", "connection headstone-to-address")
                .style("stroke", (h) => h.AddressObj.Color)
                .style("fill", "none")
                .attr("d", (h) => generatePathData(h, h.AddressObj))
                .attr("opacity", 0);

        svg.selectAll(".address-to-headstone")
            .data(headstones)
            .enter().append("path")
                .attr("class", "connection address-to-headstone")
                .style("stroke", (h) => h.AddressObj.Color)
                .style("fill", "none")
                .attr("d", (h) => generatePathData(h.AddressObj, h))
                .attr("opacity", 0);

        svg.selectAll(".headstone")
            .data(headstones)
            .enter().append("circle")
                .attr("class", "node headstone")
                .style("fill", (h) => h.AddressObj.Color)
                .attr("cx", (h) => h.LocX)
                .attr("cy", (h) => h.LocY)
                .attr("r", 2)
                .on("click", (e, h) => {
                    setSelected(h);
                });

        svg.selectAll(".address")
            .data(addresses)
            .enter().append("rect")
                .attr("class", "node address")
                .style("fill", (a) => a.Color)
                .attr("x", (a) => a.LocX - 5)
                .attr("y", (a) => a.LocY)
                .attr("width", 10)
                .attr("height", 10)
                .on("click", (e, a) => {
                    setSelected(a);
                });
 
        var zoom = d3.zoom()
            .scaleExtent([0.3, 8])
            .translateExtent([[-1000, -750], [1000, 200]])
            .on('zoom', (event) => {
            
                svg.selectAll(".headstone")
                    .attr("transform", event.transform);

                svg.selectAll(".headstone-to-address")
                    .attr("d", (h) => generatePathData(h, h.AddressObj, event.transform));

                svg.selectAll(".address-to-headstone")
                    .attr("d", (h) => generatePathData(h.AddressObj, h, event.transform))
                
                // Filtered for performance
                svg.selectAll("path[opacity='1']")
                    .attr("stroke-dasharray", (d, i, nodes) => {
                        const totalLength = nodes[i].getTotalLength();
                        return totalLength + " " + totalLength;
                    });
            });

        zoom.scaleTo(svg, 0.3);
        zoom.translateTo(svg, 0, -275);

        svg.call(zoom);

    }, [addresses, headstones]);

    useEffect(() => {
        const svg = d3.select(d3ref.current);

        svg.selectAll(".address,.headstone").filter((d) => d.City && isInDateRange(d)).attr("opacity", 1);
        svg.selectAll(".address,.headstone").filter((d) => d.City && !isInDateRange(d)).attr("opacity", 0);

    }, [isInDateRange]);

    useEffect(() => {
        const svg = d3.select(d3ref.current);

        svg.selectAll(".node")
            .classed("selected", false)
            .select("circle")
            .style("fill", null);

        if(selected) {
            if(selected.City) {
                if(!isInDateRange(selected)) {
                    setSelected(null);
                } else {
                    d3.selectAll(".headstone")
                        .filter((h) => h === selected)
                        .classed("selected", true)
                        .select("circle")
                        .style("fill", (h) => h.AddressObj.Color);
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
            svg.selectAll(".address-to-headstone,.headstone-to-address")
                .filter((h) => !isInDateRange(h))
                .attr("opacity", 0);
            
            svg.selectAll(".address-to-headstone")
                .filter((h) => isInDateRange(h))
                .each((d, i, nodes) => drawPath(d3.select(nodes[i])));

        } else if(selected) {
            if(selected.City) {
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
        <div id="address-graph" className="fade-in">
            <div className="center-column">
                <svg 
                    id="d3"
                    ref={d3ref} 
                    viewBox={("0 0 " + WIDTH + " " + HEIGHT)}
                />
                <div className="toggle-panel">
                    <div className="toggle-button" id="time-toggle-button">
                        <input 
                            id="time-toggle" 
                            className="toggle" 
                            type="checkbox" 
                            ref={timeToggle}
                            onChange={(e) => onTimeToggle(e)}
                        />
                        <label htmlFor="time-toggle">Filter by Date</label>
                        <div className="toggle-text">Filter by Date</div>
                    </div>
                    <div className="toggle-button" id="connections-toggle-button">
                        <input
                            id="connections-toggle"
                            className="toggle"
                            type="checkbox"
                            onChange={(e) => onConnectionsToggle(e)}
                        />
                        <label htmlFor="connections-toggle">Show All Connections</label>
                        <div className="toggle-text">Show All Connections</div>
                    </div>
                </div>
                <TimeSlider
                    className={timeFilterEnabled ? "active" : "disabled"}
                    min={minBirthYear}
                    max={maxDeathYear}
                    onMinChange={(d) => { onTimeFilterMinChange(d) }}
                    onMaxChange={(d) => { onTimeFilterMaxChange(d) }}
                />
            </div>
            <InfoPanel
                data={selected}
            />
        </div>
    );
}

export default AddressGraph;