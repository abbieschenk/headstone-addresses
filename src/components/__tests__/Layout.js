import React from "react"
import renderer from "react-test-renderer"

import Layout from "../Layout"

describe("Layout", () => {
    
  it("renders correctly", () => {
    const tree = renderer
      .create(<Layout mainClass="test" ><div>Test</div></Layout>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

});