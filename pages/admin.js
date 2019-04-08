import Table from '../components/table';

const Admin = () => (
  <div>
    <p> Admin Site </p>
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
    <Table header='[{ "title": "Name", "field": "name" },{ "title": "ID", "field": "id" },{ "title": "Seat", "field": "seat", "type": "numeric" }]' contents='[{"name": "kevin","id": 0,"seat": 5},{"name": "adam","id": 1,"seat": 6},{"name": "jackson","id": 2,"seat": 7}]' />
  </div>
);

export default Admin;
