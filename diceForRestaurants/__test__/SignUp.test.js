import React from 'react';
import SignUp from "../components/SignUp";
import renderer from 'react-test-renderer';

it('renders without crashing', () => {
    const rendered = renderer.create(<SignUp />).toJSON();
    expect(rendered).toBeTruthy();
});

test('renders correctly', () => {
    const tree = renderer.create(
        <SignUp />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});

it('renders the Image component', done => {
    const Image = require('Image');
    Image.getSize('https://avatars3.githubusercontent.com/u/22123151?s=100&v=4', (width, height) => {
        const tree = renderer.create(<Image style={{height, width}} />).toJSON();
        expect(tree).toMatchSnapshot();
        done();
    });
});
