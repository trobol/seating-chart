import { Component } from 'react';
import PropTypes from 'prop-types';
import MaterialTable from 'material-table';

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = { url: props.url };
  }

  async componentDidMount() {
    const { url } = this.state;
    if (url !== null) {
      try {
        const response = await fetch(url);
        const json = await response.json();
        this.setState({
          data: json.response.results,
          columns: json.response.fields.map(column => ({ title: column.name, field: column.orgName })),
        });
      } catch (error) {
        console.error(error);
      }
    }
  }

  render() {
    const { columns, data } = this.state;
    if ((columns !== null && columns !== undefined) && (data !== null && data !== undefined)) {
      return (<MaterialTable columns={columns} data={data} />);
    }
    return (<div />);
  }
}

Table.propTypes = {
  url: PropTypes.string.isRequired,
};

export default Table;
