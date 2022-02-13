import React from 'react';
import { render, screen } from '@testing-library/react';
import 'jest-styled-components';

import { Input } from "./index";

describe('<Input />', () => {
  it('renders component correctly', () => {
    const { container } = render(<Input value="default value" />);

    // 화면의 value를 잘 표시되었는지 확인
    const input = screen.getByDisplayValue('default value');
    expect(input).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });
});