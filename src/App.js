import { useState, useEffect } from 'react';
import DataTable from './Components/DataTable';
import Button from './Components/Button';

function App() {
  const [ data, setData ] = useState([]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('outdoorsy_data'));
    setData(storedData);
  },[]);

  const handleClear = () => {
    const confirm = window.confirm('Are you sure you want to clear the client data? You cannot undo this action.');
    confirm && setData([]) && localStorage.setItem('outdoorsy_data', '');

  };

  // Styles
  const appStyles = {
    backgroundColor: '#282c34',
    color:           'white',
    fontSize:        12,
    height:          '100%',
    position:        'absolute',
    top:             0,
    width:           '100%',

  };

  const centerStyles = {
    margin: '0 auto',
    textAlign: 'center',
    width: '90%',
  };

  const titleStyles = {
    fontSize: '3em',
    margin: 40,
  };

  return (
    <div style={ appStyles }>
      <div style={ centerStyles }>
        <header>
          <h1 style={ titleStyles }>
            Welcome to Outdoor.sy
          </h1>
        </header>
        <DataTable data={data} setData={setData}/>
        { !!data.length && <Button onClick={handleClear} color='white'>Clear Data</Button> }
      </div>
    </div>
  );
}

export default App;
