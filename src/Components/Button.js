import { styled } from '@stitches/react';

const Button = props => {
  const { onClick, children, color } = props;

  const StyledButton = styled('button', {
    backgroundColor: '#282c34',
    border: '1px solid white',
    borderRadius: 15,
    color: 'white',
    cursor: 'pointer',
    margin: 8,
    padding: 8,
    '&:hover': {
      backgroundColor: 'white',
      color: '#282c34',
    },
    variants: {
      color: {
        white: {
          backgroundColor: 'white',
          color: '#282c34',
          '&:hover': {
            backgroundColor: '#282c34',
            color: 'white',
          },
        }
      }
    }
  })
  return(
    <StyledButton onClick={onClick} color={color}>{children}</StyledButton>
  );
};

export default Button;
