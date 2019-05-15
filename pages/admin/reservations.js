import { useState, useEffect } from 'react';
import {
  Table, TableHeader, TableBody, TableRow, TableCell,
} from 'semantic-ui-react';
import axios from 'axios';

const Reservations = ({ link }) => {
  const [url] = useState(link);
  const [columns, setColumns] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    Promise.resolve(axios.get('/api/admin/reservations/')).then((res) => {
      const { fields, results } = res.data.response;
      setData(results);
      setColumns(fields.map(column => ({ title: column.name, field: column.name })));
    });
  }, []);
  if (data !== null && columns !== null) {
    return (
      <Table>
        <TableHeader>
          {columns.map(({ title }) => <Table.HeaderCell key={title}>{title}</Table.HeaderCell>)}
        </TableHeader>
        <TableBody>
          {data.map(row => (
            <TableRow>
              {
              Object.keys(row).map(key => <TableCell>{row[key]}</TableCell>)
            }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
  return (<div />);
};

export default Reservations;
