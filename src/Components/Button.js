import { styled } from '@stitches/react';

const Button = props => {
  const { onClick, children } = props;

  const StyledButton = styled('button', {
    color: 'white',
    border: '2px solid white',
    backgroundColor: '#282c34',
    padding: 8,
    cursor: 'pointer',
    margin: 8,
    '&:hover': {
      color: '#282c34',
      backgroundColor: 'white',
    }
  })
  return(
    <StyledButton onClick={onClick}>{children}</StyledButton>
  );
};

export default Button;
