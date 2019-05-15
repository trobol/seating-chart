import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import MaterialTable from 'material-table';

const AddAction = {
  icon: 'add',
  tooltip: 'Add',
  isFreeAction: true,
  onClick: event => event,
};

const DeleteAction = {
  icon: 'delete',
  tooltip: 'Delete',
  onClick: (_event, row) => row,
};

const EditAction = {
  icon: 'edit',
  tooltip: 'Edit',
  onClick: (_event, row) => row,
};

const Table = ({
  link, title, method, canAdd, canDelete, canEdit,
}) => {
  const [url] = useState(link);
  const [data, setData] = useState(null);
  const [columns, setColumns] = useState(null);
  useEffect(() => {
    Promise.resolve(axios({ method, url }))
      .then((res) => {
        const { fields, results } = res.data.response;
        setData(results);
        setColumns(fields.map(column => ({ title: column.name, field: column.name })));
      }).catch(error => console.error(error));
  }, [method, url]);
  if (columns !== null && data !== null) {
    const actions = [
      (canAdd ? AddAction : null),
      (canDelete ? DeleteAction : null),
      (canEdit ? EditAction : null),
    ].filter(action => action !== null);
    return (
      <div className="table">
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <MaterialTable
          columns={columns}
          data={data}
          title={title}
          actions={actions}
          options={{ actionsColumnIndex: -1 }}
        />
        <style jsx>{'.table{width:90%; padding-left:5%}'}</style>
      </div>
    );
  }
  return (<div />);
};

Table.propTypes = {
  link: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  method: PropTypes.string.isRequired,
  canAdd: PropTypes.bool.isRequired,
  canDelete: PropTypes.bool.isRequired,
  canEdit: PropTypes.bool.isRequired,
};

export default Table;
