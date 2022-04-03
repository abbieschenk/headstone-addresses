import React, {
    useState,
    useRef,
    useEffect,
    useCallback,
} from "react";
import PropTypes from "prop-types"

import "../styles/TimeSlider.scss";

/** Adapted from https://dev.to/sandra_lewis/building-a-multi-range-slider-in-react-from-scratch-4dl1 **/

const TimeSlider = ({ 
    min, 
    max, 
    onMinChange, 
    onMaxChange, 
    className }) => {

    const [minVal, setMinVal] = useState(min);
    const [maxVal, setMaxVal] = useState(max);
    
    const minValRef = useRef(min);
    const maxValRef = useRef(max);

    const range = useRef(null);

    // Convert to percentage
    const getPercent = useCallback(value => Math.round(((value - min) / (max - min)) * 100), [min, max]);

    // Set width of the range to change from the left side
    useEffect(() => {
        const minPercent = getPercent(minVal);
        const maxPercent = getPercent(maxValRef.current);

        if (range.current) {
            range.current.style.left = `${minPercent}%`;
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [minVal, getPercent]);

    // Set width of the range to change from the right side
    useEffect(() => {
        const minPercent = getPercent(minValRef.current);
        const maxPercent = getPercent(maxVal);

        if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [maxVal, getPercent]);

    return(    
        <div className={"timeslider" + (className ? " " + className : "")}>
            <input
                type="range"
                min={min}
                max={max}
                value={minVal}
                onChange={event => 
                    {
                        const value = Math.min(Number(event.target.value), maxVal - 1);
                        setMinVal(value);
                        minValRef.current = value;

                        if(onMinChange) {
                            onMinChange(value);
                        }
                    }
                }
                className="thumb thumb--left"
                style={{ zIndex: minVal > max - 100 && "5" }}
            />
            <input
                type="range"
                min={min}
                max={max}
                value={maxVal}
                onChange={event => 
                    {
                        const value = Math.max(Number(event.target.value), minVal + 1);
                        setMaxVal(value);
                        maxValRef.current = value;
                        
                        if(onMaxChange) {
                            onMaxChange(value);
                        }
                    }
                }
            className="thumb thumb--right"
            />
            <div className="slider">
                <div className="slider__track" />
                <div 
                    ref={range} 
                    className="slider__range" 
                />
                <div className="slider__left-value">Year of Birth {minVal}</div>
                <div className="slider__right-value">Year of Death {maxVal}</div>
            </div>
        </div>
    );
};

// Set each prop as type number
TimeSlider.propTypes = {
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired
};

export default TimeSlider;