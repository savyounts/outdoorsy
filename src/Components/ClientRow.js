import { styled } from '@stitches/react';

const ClientRow = props => {
  const { client } = props;

  const Cell = styled('p', {
    borderLeft: '1px solid white',
    margin: 0,
    padding: 5,
    textAlign: 'left',
    '&:first-of-type': {
      borderLeft: 'none'
    }
  });

  const Row = styled('div', {
    borderTop: '1px solid white',
    display: 'grid',
    gridTemplateColumns: '1fr 1.5fr 1fr 1fr .5fr',
    width: '100%',
  });
  
  return (
    <Row>
      { Object.keys(client).map(key => <Cell key={key}> {client[key]}</Cell>) }
    </Row>
  );
};

export default ClientRow;
