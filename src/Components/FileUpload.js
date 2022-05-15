import React, { useState } from 'react';
import { styled } from '@stitches/react';
import Button from './Button';
import { validateFile } from '../Utils/validation';

const FileUpload = props => {
  const { data, setData, setSort } = props;
  const [ file, setFile ] = useState(null);
  const [ error, setError ] = useState([]);

  const clearFile = () => {
    setFile(null);
  };

  const handleChange = e => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        const array = text.split('\n');

        const validated = validateFile(array);

        if (validated.status === 'error') {
          setFile(null);
          return setError(validated.data);
        }
        const updatedData = [ ...data, ...validated.data ];
        setData(updatedData);
        localStorage.setItem('outdoorsy_data', JSON.stringify(updatedData) )
        setError([]);
      }
      reader.readAsText(file)
    }
    setFile(null);
    setSort(null);
  };

//Styles
  const Input = styled('input', {
    margin: 10,
    '&::file-selector-button': {
      backgroundColor: '#0e1225',
      border: '1px solid rgb(255, 188, 0)',
      borderRadius: 15,
      color: 'rgb(255, 188, 0)',
      cursor: 'pointer',
      padding: 8,
      '&:hover': {
        backgroundColor: 'rgb(255, 188, 0)',
        color: '#0e1225',
      },
    }
  })

  return (
    <div>
      {file ?
        <>
          <p>{file.name}</p>
          <Button onClick={handleUpload}>Upload</Button>
          <Button onClick={clearFile}>Clear File</Button>
        </>
      : <>
          <Input type='file' onChange={handleChange} accept='.csv, .txt'/>
          {!!error.length &&
            <>
              <p>There were errors with this file, please correct them and try again</p>
              {error.map((e, index) => <p key={`${e}-${index}`}>{e}</p>)}
            </>}
        </>}
    </div>
  )
}

export default FileUpload;
