import Table from '../../components/Table/Table';
import Layout from '../../components/Layout';

const Timesheets = () => (
  <Layout>
    <Table link="api/table/timesheets" title="Timesheets" />
  </Layout>
);

export default Timesheets;
