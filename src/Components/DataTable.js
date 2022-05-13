import { styled } from '@stitches/react';
import React, { useState } from 'react';
import ClientRow from './ClientRow';
import SortArrow from './SortArrow';
import FileUpload from './FileUpload';

const DataTable = props => {
  const { data, setData } = props;
  const [ sortBy, setSortBy ] = useState(null);
  const [ reversed, setReversed ] = useState(false);

  const deleteRow = () => {

  }
  const handleSort = (type) => {
    if (sortBy === type) {
      let reversedData = [].concat(data).reverse();
      setReversed(!reversed)
      return setData(reversedData);
    }
    const sorted = data.sort((a,b) => a[type] > b[type] ? 1 : -1);
    setReversed(false)
    setData(sorted);
    setSortBy(type);
  };

  const createHeaders = () => {
    const headers = ['Full Name', 'Email', 'Vehicle Type', 'Vehicle Name', 'Vehicle Length'];
    return headers.map(h => {
      if (h === 'Full Name') return <Header as='button' key={h} onClick={() => handleSort('name')} sort>{h} <SortArrow color={sortBy === 'name'} direction={sortBy === 'name' && reversed}/></Header>;
      if (h === 'Vehicle Type') return <Header as='button' key={h} onClick={() => handleSort('vType')} sort>{h} <SortArrow color={sortBy === 'vType'} direction={sortBy === 'vType' && reversed}/></Header>;
      return <Header key={h}>{h}</Header>
    });
  };
  const parseData = () => {
    return data.map(d => <ClientRow key={d[0]} client={d}/>)
  };

  const Heading = styled('div', {
    display: 'grid',
    gridTemplateColumns: '1fr 1.5fr 1fr 1fr .5fr',
  });

  const Header = styled('p', {
    display: 'flex',
    height: 'calc(100% - 10px)',
    margin: 0,
    padding: 5,
    textAlign: 'left',
    alignSelf: 'center',
    border: 'none',
    borderLeft: '1px solid #282c34',
    veritcalAlign: 'center',
    color: '#282c34',
    backgroundColor: 'white',
    variants: {
      sort: {
        true: {
          height: '100%',
          fontSize: 12,
          '&:first-of-type': {
            borderLeft: 'none'
          },
        }
      }
    }
  });

  const TableWrapper = styled('div', {
    width: '90%',
    margin: '0 auto',
    border: '1px solid white'
  });

  const TopWrapper = styled('div', {
    display: 'flex',
    justifyContent: 'space-between',
    width: '90%',
    margin: '0 auto',
  });

  const Title = styled('h2', {
    textAlign: 'center'
  });

  return (
    <div>
      <TopWrapper>
        <Title>Client Data</Title>
        <FileUpload data={data} setData={setData}/>
      </TopWrapper>
      { !!data.length ?
        <TableWrapper>
          <Heading>{createHeaders()}</Heading>
          {parseData()}
        </TableWrapper>
        : <Title as='p'>No user data uploaded yet.</Title>}
    </div>
  )
}

export default DataTable;
