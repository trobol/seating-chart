import Table from '../../components/Table/Table';
import Layout from '../../components/Layout';

const Reservations = () => (
  <Layout>
    <Table link="/api/admin/reservations/" title="Reservations" method="get" canAdd canDelete canEdit />
  </Layout>
);

export default Reservations;
