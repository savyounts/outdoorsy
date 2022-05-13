import React, { useState } from 'react';
import { styled } from '@stitches/react';
import Button from './Button';

const FileUpload = props => {
  const { data, setData } = props;
  const [ file, setFile ] = useState(null);

  const clearFile = () => {
    setFile(null);
  };

  const formatClient = client => {
    let clientArray = client.split(/[|,]+/);

    return  {
      name: `${clientArray[0]} ${clientArray[1]}`,
      email: clientArray[2],
      vType: clientArray[3].toLowerCase(),
      vName: clientArray[4],
      vLength: `${clientArray[5].replace(/\D/g, "")}'`
    }
  }
  const handleChange = e => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    const reader = new FileReader();

    if (file) {
      reader.onload = (e) => {
        const text = e.target.result;
        const array = text.split('\n').map(c => formatClient(c));
        setData([ ...data, ...array ]);
      }
      const fileArray = reader.readAsText(file)
    }
    setFile(null);
  };

  const Input = styled('input', {
    margin: 10,
    '&::file-selector-button': {
      padding: 8,
      cursor: 'pointer',
      color: 'white',
      border: '2px solid white',
      backgroundColor: '#282c34',
      '&:hover': {
        color: '#282c34',
        backgroundColor: 'white',
      },
    }
  })

  return (
    <div>

      {file ?
      <React.Fragment>
        <p>{file.name}</p>
        <Button type='submit' onClick={handleUpload}>Upload</Button>
        <Button onClick={clearFile}>Clear File</Button>
      </React.Fragment>
    : <React.Fragment>
        <Input type='file' onChange={handleChange} accept='.csv, .txt'/>
      </React.Fragment>}

    </div>
  )
}

export default FileUpload;
