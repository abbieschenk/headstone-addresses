import React from "react"
import renderer from "react-test-renderer"

import TimeSlider from "../TimeSlider"

describe("TimeSlider", () => {
    
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <TimeSlider min={1900}
            max={2000}
            onMinChange={(value) => {/* do nothing */}} 
            onMaxChange={(value) => {/* do nothing */}}
            className="active"
            >
                <div>Test</div>
            </TimeSlider>
        ).toJSON();

    expect(tree).toMatchSnapshot();
  });

});