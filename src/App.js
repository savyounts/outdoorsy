import { useState, useEffect } from 'react';
import DataTable from './Components/DataTable';
import Button from './Components/Button';

function App() {
  const [ data, setData ] = useState([]);

  useEffect(() => {
    let storedData = localStorage.getItem('outdoorsy_data');
    storedData && setData(JSON.parse(storedData));
  },[]);

  const handleClear = () => {
    const confirm = window.confirm('Are you sure you want to clear the client data? You cannot undo this action.');
    if (confirm) {
      setData([]);
      localStorage.setItem('outdoorsy_data', '');
    }
  };

  // Styles
  const appStyles = {
    backgroundImage: 'url(https://assets.website-files.com/612fc9b7859cf45dee4845ff/6168e2cbab9e3b74bc7d7bea_TWG_Topo_L1.svg)',
    backgroundPosition: '50% 50%',
    backgroundRepeat: 'repeat',
    backgroundSize: 'auto 105%',
    color:           'white',
    fontSize:        12,
    height:          'fit-content',
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
