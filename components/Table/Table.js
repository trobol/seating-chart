import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MaterialTable from 'material-table';

const Table = ({ link }) => {
  const [url] = useState(link);
  const [data, setData] = useState(null);
  const [columns, setColumns] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setData(json.response.results);
        setColumns(json.response.fields.map(column => ({ title: column.name, field: column.orgName })));
      } catch (error) {
        console.error(error);
      }
    };
    if (columns === null && data === null) {
      fetchData();
    }
  });
  if (columns !== null && data !== null) {
    return (<MaterialTable columns={columns} data={data} />);
  }
  return (<div />);
};

Table.propTypes = {
  link: PropTypes.string.isRequired,
};

export default Table;
