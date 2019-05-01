import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MaterialTable from 'material-table';
import axios from 'axios';

const Table = ({ link }) => {
  const [url] = useState(link);
  const [data, setData] = useState(null);
  const [columns, setColumns] = useState(null);
  useEffect(() => {
    Promise.resolve(axios.get(url))
      .then((res) => {
        const { fields, results } = res.data.response;
        setData(results);
        setColumns(fields.map(column => ({ title: column.name, field: column.orgName })));
      });
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
