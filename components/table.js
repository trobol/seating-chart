import MaterialTable from 'material-table';

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = { init: false };
  }

  componentDidMount() {
    fetch('/api/table-api/', { method: 'post' })
      .then((results) => {
        results.json().then(data => ({
          names: data,
        })).then((res) => {
          // set initial values
          const newHead = [];
          // if data is retrieved use field to create header for table
          if (res.names.response.length > 0) {
            for (const key in res.names.response[0]) {
              newHead.push({ title: key, field: key });
            }
          }
          this.setState({ head: newHead, data: res.names.response, init: true });
        });
      });
  }

  render() {
    if (this.state.init) {
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
    return (<div />);
  }
}
export default Table;
