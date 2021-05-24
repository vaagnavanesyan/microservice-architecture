import * as React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import { ImageWrapper } from '../ImageWrapper';

const shallowRenderer = createRenderer();

describe('<Masthead />', () => {
  it('should render and match the snapshot', () => {
    shallowRenderer.render(<ImageWrapper />);
    const renderedOutput = shallowRenderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
