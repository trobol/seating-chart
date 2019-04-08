import MaterialTable from 'material-table';


class Table extends React.Component {
  constructor(props) {
    super(props);
    const jsonString = '{"users": [{"name": "kevin","id": 0,"seat": 5},{"name": "adam","id": 1,"seat": 6},{"name": "jackson","id": 2,"seat": 7}]}';
    const obj = JSON.parse(jsonString);
    const tmp = [
      {
        name: 'Kevin', surname: 'Eats', seat: 8,
      }, {
        name: 'Adam', surname: 'Pasta', seat: 11,
      }, {
        name: 'Jackson', surname: 'Mic', seat: 7,
      },
    ];
    this.state = { users: props.users, data: tmp, debug: obj };
  }

  render() {
    return (
      <div>
        <div>
          <span>Test: </span>
          {this.state.debug.name}
        </div>
        <MaterialTable
          columns={[
            { title: 'Firstname', field: 'name' },
            { title: 'LastName', field: 'surname' },
            { title: 'Seat', field: 'seat', type: 'numeric' },
          ]}
          data={this.state.data}
          title="Admin Site"
        />
      </div>
    );
  }
}
export default Table;
