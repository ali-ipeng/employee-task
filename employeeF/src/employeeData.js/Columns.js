import Button from "react-bootstrap/Button";

const Columns = ({ handleEdit, handleDelete }) => {
  const columns = [
    {
      name: <span style={{ fontWeight: "bold" }}>Serial #</span>,
      selector: (row, index) => index + 1,
      sortable: false,
    },
    {
      name: <span style={{ fontWeight: "bold" }}>First_Name</span>,
      selector: (row) => row.firstName,
      sortable: true,
    },

    {
      name: <span style={{ fontWeight: "bold" }}>Last_Name</span>,
      selector: (row) => row?.lastName,
      sortable: true,
    },
    {
      name: <span style={{ fontWeight: "bold" }}>Title</span>,
      selector: (row) => row?.title,
      sortable: true,
    },

    {
      name: <span style={{ fontWeight: "bold" }}>Email</span>,
      selector: (row) => row?.email,
      sortable: true,
    },
    {
      name: <span style={{ fontWeight: "bold" }}>phone</span>,
      selector: (row) => row?.phone,
      sortable: true,
    },
    {
      name: <span style={{ fontWeight: "bold" }}>Craete At</span>,
      selector: (row) => row?.createdAt,
      sortable: true,
    },
    {
      name: <span style={{ fontWeight: "bold" }}>Actions</span>,
      cell: (row) => (
        <>
          <Button as="a" variant="primary" onClick={() => handleEdit(row)}>
            Update
          </Button>
          <Button as="a" variant="primary" onClick={() => handleDelete(row)}>
            Delete
          </Button>
        </>
      ),
      allowOverflow: true,
      button: true,
    },
  ];
  return columns;
};

export default Columns;
