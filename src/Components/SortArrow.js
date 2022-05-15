import { styled } from '@stitches/react';

const SortArrow = props => {
  const { color, direction } = props;

  const Arrow = styled('div', {
    borderBottom: direction && `5px solid ${color ? 'white' : '#282c34'}`,
    borderLeft: '5px solid transparent',
    borderRight: '5px solid transparent',
    borderTop: !direction && `5px solid ${color ? 'white' : '#282c34'}`,
    height: 0,
    margin: 5,
    width: 0,
  });

  return (
    <Arrow/>
  )
}

export default SortArrow;
