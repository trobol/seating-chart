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
          status: results.status,
        })).then((res) => {
          const newHead = [];
          const data = res.names.response;
          if (data.length > 0) {
            for (const key in data[0]) {
              newHead.push({ title: key, field: key });
            }
          }
          for (let i = 0; i < data.length; i++) {
            if (data[i].seat == null) {
              data[i].seat = 'none';
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
