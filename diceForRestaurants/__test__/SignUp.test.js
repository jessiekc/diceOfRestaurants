import React from 'react';
import SignUp from "../components/SignUp";
import renderer from 'react-test-renderer';


test('renders correctly', () => {
    const tree = renderer.create(
        <SignUp />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});
