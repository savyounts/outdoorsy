import { styled } from '@stitches/react';

const SortArrow = props => {
  const { color, direction } = props;

  const Arrow = styled('div', {
    borderBottom: direction && `5px solid ${color ? 'lightblue' : '#282c34'}`,
    borderLeft: '3px solid transparent',
    borderRight: '3px solid transparent',
    borderTop: !direction && `5px solid ${color ? 'lightblue' : '#282c34'}`,
    height: 0,
    margin: 5,
    width: 0,
  });

  return (
    <Arrow/>
  )
}

export default SortArrow;
