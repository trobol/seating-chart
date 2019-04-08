import MaterialTable from 'material-table';

const Table = () => (
  <MaterialTable
    columns={[
      { title: 'Firstname', field: 'name' },
      { title: 'LastName', field: 'surname' },
      { title: 'Seat', field: 'seat', type: 'numeric' },
    ]}
    data={[
      {
        name: 'Kevin', surname: 'Eats', seat: 8,
      }, {
        name: 'Adam', surname: 'Pasta', seat: 11,
      }, {
        name: 'Jackson', surname: 'Mic', seat: 7,
      },
    ]}
    title="Admin Site"
  />
);

export default Table;
