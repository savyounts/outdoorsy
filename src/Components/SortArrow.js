import { styled } from '@stitches/react';
import { useState } from 'react';

const SortArrow = props => {
  const { color, direction } = props;

  const Arrow = styled('div', {
    width: 0,
    height: 0,
    borderLeft: '3px solid transparent',
    borderRight: '3px solid transparent',
    borderTop: !direction && `5px solid ${color ? 'orange' : '#282c34'}`,
    borderBottom: direction && `5px solid ${color ? 'orange' : '#282c34'}`,
    margin: 5
  });

  return (
    <Arrow/>
  )
}

export default SortArrow;
