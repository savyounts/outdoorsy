import { useState } from 'react';
import { styled } from '@stitches/react';
import FileUpload from './Components/FileUpload';
import DataTable from './Components/DataTable';
import Button from './Components/Button';

function App() {
  const [ data, setData ] = useState(localStorage.getItem('outdoors_data') || []);

  const handleClear = () => {
    const confirm = window.confirm('Are you sure you want to clear the client data? You cannot undo this action.');
    confirm && setData([]);
  }
  const appStyles = {
    backgroundColor: '#282c34',
    color:           'white',
    fontSize:        12,
    width:           '100%',
    position:        'absolute',
    top:             0,
    height:          '100%',
  };

  const centerStyles = {
    width: '90%',
    margin: '0 auto',
    textAlign: 'center'
  };

  const Title = styled('h1', {
    margin: 40,
    fontSize: '3em'
  })

  return (
    <div style={ appStyles }>
      <div style={ centerStyles }>
        <header>
          <Title>
            Welcome to Outdoor.sy
          </Title>
        </header>
        <DataTable data={data} setData={setData}/>
        { !!data.length && <Button onClick={handleClear}>Clear Data</Button>}
      </div>
    </div>
  );
}

export default App;
