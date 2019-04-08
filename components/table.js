import MaterialTable from 'material-table';


class Table extends React.Component {
  constructor(props) {
    super(props);
    const tableData = JSON.parse(props.contents);
    const tableHeader = JSON.parse(props.header);
    this.state = { head: tableHeader, data: tableData };
  }

  render() {
    return (
      <div>
        <div>
          <span>Test: </span>
        </div>
        <MaterialTable
          columns={this.state.head}
          data={this.state.data}
          title="Admin Site"
        />
      </div>
    );
  }
}
export default Table;
