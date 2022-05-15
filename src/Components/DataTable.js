import { styled } from '@stitches/react';
import React, { useState, useEffect } from 'react';
import ClientRow from './ClientRow';
import SortArrow from './SortArrow';
import FileUpload from './FileUpload';

const DataTable = props => {
  const { data, setData } = props;
  const [ sortedData, setSortedData ] = useState(null);
  const [ sortBy, setSortBy ] = useState(null);
  const [ reversed, setReversed ] = useState(false);

  useEffect(() => {
    setSortedData(data)
  }, [data]);

  const handleSort = (type) => {
    if (sortBy === type) {
      let reversedData = [].concat(sortedData).reverse();
      setReversed(!reversed)
      return setSortedData(reversedData);
    }
    const sorted = sortedData.sort((a,b) => a[type] > b[type] ? 1 : -1);
    setReversed(false)
    setSortedData(sorted);
    setSortBy(type);
  };

  const renderData = (clientData) => {
    return clientData.map((d,i) => <ClientRow key={`Row -${i}`} client={d} row={i}/>)
  };

  // Styles
  const Header = styled('p', {
    alignItems: 'center',
    backgroundColor: 'rgb(255, 188, 0)',
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

  const tableHeaders = ['Full Name', 'Email', 'Vehicle Type', 'Vehicle Name', 'Vehicle Length'].map(h => {
      if (h === 'Full Name') return <Header as='button' key={h} onClick={() => handleSort('name')} sort>{h} <SortArrow color={sortBy === 'name'} direction={sortBy === 'name' && reversed}/></Header>;
      if (h === 'Vehicle Type') return <Header as='button' key={h} onClick={() => handleSort('vType')} sort>{h} <SortArrow color={sortBy === 'vType'} direction={sortBy === 'vType' && reversed}/></Header>;
      return <Header key={h}>{h}</Header>
  });

  const TableWrapper = styled('div', {
    border: '1px solid rgb(255, 188, 0)',
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
        <FileUpload data={data} setData={setData} setSort={setSortBy}/>
      </TopWrapper>
      { !!data.length ?
        <TableWrapper>
          <Heading>{tableHeaders}</Heading>
          {renderData(sortedData || data)}
        </TableWrapper>
        : <Title as='p'>No user data uploaded yet.</Title>}
    </div>
  )
}

export default DataTable;
