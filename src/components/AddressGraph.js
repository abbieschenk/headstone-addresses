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
    
    const targetX = target.x
                        * (dirVal === right && transform && transform.k ? transform.k : 1)
                        + (dirVal === right && transform && transform.x ? transform.x : 0);

    const targetY = target.y
                        * (dirVal === right && transform && transform.k ? transform.k : 1)
                        + (dirVal === right && transform && transform.y ? transform.y : 0);

    const originX = origin.x
                        * (dirVal === left && transform && transform.k ? transform.k : 1)
                        + (dirVal === left && transform && transform.x ? transform.x : 0);

    const originY = origin.y
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
    
    const [selected, setSelected] = useState({});

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
                setSelected({});
            });

 
    }, []);

    // Main D3 rendering hook
    useEffect(() => {
        const svg = d3.select(d3ref.current);

        svg.selectAll(".address,.headstone,.connection,.china,.edmonton").remove();

        svg.append("path")
            .attr("class", "edmonton cemetery mount-pleasant")
            .attr("d", "M687.741,489.144l0,305.885l-142.15,0l-55.003,-100.127l171.653,-205.758l25.5,0Z");

        svg.append("path")
            .attr("class", "edmonton cemetery edmonton-cemetery")
            .attr("d", "M220.976,389.48l-153.841,-0l-1.642,-261.584l244.84,0l0,105.364l-68.718,0l-22.281,15.377l1.642,140.843Z");

        svg.append("path")
            .attr("class", "edmonton cemetery beechmount")
            .attr("d", "M697.708,54.604l69.952,0l0,262.687l-69.928,-0l-0.024,-262.687Z");

        svg.append("path")
            .attr("class", "edmonton river")
            .attr("d", "M11.25,727.718l211.36,-267.912l296.494,-16.665l344.548,-76.374");


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

            let x = parseInt(h.LocX) * 5;
            let y = parseInt(h.LocY) * 5;

            if(h.CemeteryName === "Beechmount") {
                x += 600;
                y += 400;
            } else if(h.CemeteryName === "Mount Pleasant") {
                x += 400;
            } else if(h.CemeteryName === "Edmonton") {
                y += 400;
            }

            h.x = xScale(x);
            h.y = yScale(y);
        });

        addresses.forEach((a) => {
            a.x = parseInt(a.LocX);
            a.y = parseInt(a.LocY);
        });

        svg.selectAll(".headstone")
            .data(headstones)
            .enter().append("circle")
                .attr("class", "node headstone")
                .style("fill", (h) => h.AddressObj.Color)
                .attr("cx", (h) => h.x)
                .attr("cy", (h) => h.y)
                .attr("r", 2)
                .on("click", (e, h) => {
                    setSelected({
                        headstone: h
                    });
                });

        svg.append("path")
            .attr("class", "china")
            .attr("d", "M0,223.418l18.078,0.397l51.785,-14.48l26.282,-22.325l20.839,-44.059l-20.991," + 
                        "-41.825l22.792,-23.148l-27.123,-3.895l10.219,-23.652l29.294,1.628l27.345," +
                        "-24.365l6.12,-27.694l-164.64,-0l0,223.418Z");
                        
        svg.append("path")
            .attr("class", "china hainan")
            .attr("fill", "none")
            .attr("d", "M19.753,232.191l-11.115,6.938l5.712,10.871l10.437,-6.539l3.089,-8.37l-8.123,-2.9Z");

        svg.selectAll(".headstone-to-address")
            .data(headstones)
            .enter().append("path")
                .attr("class", "connection headstone-to-address")
                .style("stroke", (h) => h.AddressObj.Color)
                .style("stroke-width", 0.6)
                .style("fill", "none")
                .attr("d", (h) => generatePathData(h, h.AddressObj))
                .attr("opacity", 0);

        svg.selectAll(".address-to-headstone")
            .data(headstones)
            .enter().append("path")
                .attr("class", "connection address-to-headstone")
                .style("stroke", (h) => h.AddressObj.Color)
                .style("stroke-width", 0.6)
                .style("fill", "none")
                .attr("d", (h) => generatePathData(h.AddressObj, h))
                .attr("opacity", 0);

        svg.selectAll(".address")
            .data(addresses)
            .enter().append("rect")
                .attr("class", "node address")
                .style("fill", (a) => a.Color)
                .attr("x", (a) => a.x - 5)
                .attr("y", (a) => a.y)
                .attr("width", 7)
                .attr("height", 7)
                .on("click", (e, a) => {
                    setSelected({
                        address: a
                    });
                });
 
        var zoom = d3.zoom()
            .scaleExtent([0.3, 8])
            .translateExtent([[-1000, -750], [1000, 200]])
            .on('zoom', (event) => {
            
                svg.selectAll(".headstone,.edmonton")
                    .attr("transform", event.transform);


                // TODO This is a massive hack. 
                // I'm not sure why this is necessary, but it works for now to get this to release.
                svg.selectAll(".edmonton")
                    .attr("transform" , 
                            "translate(" + 
                                ((-86.5 * (event.transform.k ? event.transform.k : 1)) + (event.transform.x ? event.transform.x : 0)) +
                            " " +
                                ((-730 * (event.transform.k ? event.transform.k : 1)) + (event.transform.y ? event.transform.y : 0)) +
                            ") scale(" + 
                                (0 + (event.transform && event.transform.k ? event.transform.k : 0)) + ")");
              
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

        svg.selectAll(".address,.headstone").filter((d) => d.City && isInDateRange(d))
            .attr("opacity", 1)
            .style("cursor", "pointer");

        svg.selectAll(".address,.headstone").filter((d) => d.City && !isInDateRange(d))
            .attr("opacity", 0.3)
            .style("cursor", "default");

    }, [isInDateRange]);

    useEffect(() => {
        const svg = d3.select(d3ref.current);

        svg.selectAll(".node")
            .classed("selected", false)
            .select("circle")
            .style("fill", null);

        if(selected.headstone) {
            if(!isInDateRange(selected.headstone)) {
                setSelected({});
            } else {
                d3.selectAll(".headstone")
                    .filter((h) => h === selected.headstone)
                    .classed("selected", true)
                    .select("circle")
                    .style("fill", (h) => h.AddressObj.Color);
            }
        } else if(selected.address) {
            d3.selectAll(".address")
                .filter((a) => a === selected.address)
                .classed("selected", true);
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

        } else if(selected.headstone) {
            svg.selectAll(".connection")
                .filter((h) => selected.headstone !== h)
                .attr("opacity", 0);

            svg.selectAll(".headstone-to-address")
                .filter((h) => selected.headstone === h)
                .each((d, i, nodes) => drawPath(d3.select(nodes[i])));
        } else if(selected.address) {
            svg.selectAll(".connection")
                .filter((h) => selected.address !== h.AddressObj || !isInDateRange(h))
                .attr("opacity", 0);
            
            svg.selectAll(".address-to-headstone")
                .filter((h) => ((selected.address === h.AddressObj) && isInDateRange(h)))
                .each((d, i, nodes) => drawPath(d3.select(nodes[i])));
            
        } else {
            svg.selectAll(".connection").attr("opacity", 0);
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