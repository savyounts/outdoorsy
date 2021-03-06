import { styled } from '@stitches/react';

const Button = props => {
  const { onClick, children, color } = props;

  const StyledButton = styled('button', {
    backgroundColor: '#0e1225',
    border: '1px solid rgb(255, 188, 0)',
    borderRadius: 14,
    color: 'rgb(255, 188, 0)',
    cursor: 'pointer',
    margin: 8,
    padding: '10px 30px',
    '&:hover': {
      backgroundColor: 'rgb(255, 188, 0)',
      color: '#0e1225',
    },
    variants: {
      color: {
        white: {
          backgroundColor: 'rgb(255, 188, 0)',
          color: '#0e1225',
          '&:hover': {
            backgroundColor: '#0e1225',
            color: 'rgb(255, 188, 0)',
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
