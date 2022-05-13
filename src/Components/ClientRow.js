import { styled } from '@stitches/react';

const ClientRow = props => {
  const { client, deleteClient } = props;

  const handleClear = () => {
    deleteClient(client);
  };
  
  const Row = styled('div', {
    display: 'grid',
    gridTemplateColumns: '1fr 1.5fr 1fr 1fr .5fr .25fr',
    width: '100%',
    borderTop: '1px solid white',
    borderRight: '1px solid white'
  });

  const Cell = styled('p', {
    height: 'calc(100% - 10px)',
    margin: 0,
    padding: 5,
    textAlign: 'left',
    alignSelf: 'center',
    borderLeft: '1px solid white',
    '&:first-of-type': {
      borderLeft: 'none'
    },
    variants: {
      clear: {
        true: {
          backgroundColor: 'white',
          color: '#282c34',
          border: 'none',
          textAlign: 'center',
          padding: 3,
          width: 'fit-content',
          height: 'fit-content',
          justifySelf: 'flex-end'

        }
      }
    }
  });

  return (
    <Row>
      { Object.keys(client).map(key => <Cell key={key}> {client[key]}</Cell>) }
      <Cell as="button" key={`${client.name}-clear`} onClick={handleClear} clear>X</Cell>
    </Row>
  );
};

export default ClientRow;
