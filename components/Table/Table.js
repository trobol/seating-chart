import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MaterialTable from 'material-table';
import axios from 'axios';

const Table = ({ link, title }) => {
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
  }, [url]);
  if (columns !== null && data !== null) {
    return (
      <div className="table">
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <MaterialTable columns={columns} data={data} title={title} />
        <style jsx>{'.table{width: 90vw; padding-left:5vw}'}</style>
      </div>
    );
  }
  return (<div />);
};

Table.propTypes = {
  link: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Table;
