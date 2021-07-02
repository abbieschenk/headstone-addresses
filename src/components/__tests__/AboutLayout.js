import React from "react"
import renderer from "react-test-renderer"

import AboutLayout from "../AboutLayout"

describe("AboutLayout", () => {
    
  it("renders correctly", () => {
    const tree = renderer
      .create(<AboutLayout><div>Test</div></AboutLayout>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

});