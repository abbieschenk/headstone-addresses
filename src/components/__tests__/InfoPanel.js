import React from "react";
import renderer from "react-test-renderer";

import InfoPanel from "../InfoPanel";

import data from './data.json';

describe("InfoPanel", () => {
    const { headstones, addresses } = data;

    const headstoneData = {
        headstone: headstones[0]
    };

    const addressData = {
        address: addresses[0]
    };

    const emptyData = {};

    it("renders headstone data correctly", () => {
        const tree = renderer
            .create(<InfoPanel data={headstoneData} />)
            .toJSON();

        expect(tree).toMatchSnapshot();
    });

    it("renders address data correctly", () => {
        const tree = renderer
            .create(<InfoPanel data={addressData} />)
            .toJSON();

        expect(tree).toMatchSnapshot();
    });

    it("renders empty data correctly", () => {
        const tree = renderer
            .create(<InfoPanel data={emptyData} />)
            .toJSON();

        expect(tree).toMatchSnapshot();
    });

});