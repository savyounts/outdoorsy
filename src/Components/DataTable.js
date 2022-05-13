import { styled } from '@stitches/react';
import React, { useState } from 'react';
import ClientRow from './ClientRow';
import SortArrow from './SortArrow';
import FileUpload from './FileUpload';

const DataTable = props => {
  const { data, setData } = props;
  const [ sortBy, setSortBy ] = useState(null);
  const [ reversed, setReversed ] = useState(false);

  const createHeaders = () => {
    const headers = ['Full Name', 'Email', 'Vehicle Type', 'Vehicle Name', 'Vehicle Length'];
    return headers.map(h => {
      if (h === 'Full Name') return <Header as='button' key={h} onClick={() => handleSort('name')} sort>{h} <SortArrow color={sortBy === 'name'} direction={sortBy === 'name' && reversed}/></Header>;
      if (h === 'Vehicle Type') return <Header as='button' key={h} onClick={() => handleSort('vType')} sort>{h} <SortArrow color={sortBy === 'vType'} direction={sortBy === 'vType' && reversed}/></Header>;
      return <Header key={h}>{h}</Header>
    });
  };

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

  const parseData = () => {
    return data.map(d => <ClientRow key={d.name} client={d}/>)
  };

  // Styles
  const Header = styled('p', {
    alignItems: 'center',
    backgroundColor: 'white',
    border: 'none',
    borderLeft: '1px solid #282c34',
    color: '#282c34',
    display: 'flex',
    fontWeight: 'bold',
    justifyContent: 'center',
    margin: 0,
    padding: 5,
    textAlign: 'center',
    variants: {
      sort: {
        true: {
          fontSize: 12,
          height: '100%',
          textAlign: 'center',
          '&:first-of-type': {
            borderLeft: 'none'
          },
        }
      }
    }
  });

  const Heading = styled('div', {
    display: 'grid',
    gridTemplateColumns: '1fr 1.5fr 1fr 1fr .5fr',
  });

  const TableWrapper = styled('div', {
    border: '1px solid white',
    margin: '0 auto',
    width: '90%',
    '@media (max-width: 767px)': {
      zoom: '50%'
    },
  });

  const Title = styled('h2', {
    textAlign: 'center'
  });

  const TopWrapper = styled('div', {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '0 auto',
    width: '90%',
    '@media (max-width: 767px)': {
      display: 'block',
    },
  });

  return (
    <div>
      <TopWrapper>
        <Title>Client Data</Title>
        <FileUpload data={data} setData={setData}/>
      </TopWrapper>
      { data.length ?
        <TableWrapper>
          <Heading>{createHeaders()}</Heading>
          {parseData()}
        </TableWrapper>
        : <Title as='p'>No user data uploaded yet.</Title>}
    </div>
  )
}

export default DataTable;
