import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EditData, deleteData, fetchData } from "../feature/employeeDataSlice";
import DataTable from "react-data-table-component";
import Columns from "./Columns";
import FilterComponent from "../utils/FilterComponent";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const List = () => {
  const navigate = useNavigate();
  const [filterText, setFilterText] = useState("");
  const loader = useSelector((state) => state.EmployeeData.loading);
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.EmployeeData?.data?.employees);

  // function for filtering
  const filteredItems = data?.filter((item) => {
    const filterTextLower = filterText.toLowerCase();

    return (
      (item.title && item.title.toLowerCase().includes(filterTextLower)) ||
      (item.firstName &&
        item.firstName.toLowerCase().includes(filterTextLower)) ||
      (item.lastName &&
        item.lastName.toLowerCase().includes(filterTextLower)) ||
      (item.email && item.email.toLowerCase().includes(filterTextLower))
    );
  });

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  // Edit Function
  const handleEdit = (row) => {
    console.log(row);
    navigate(`/edit/${row?._id}`);
    dispatch(EditData(row?._id));
  };

  // Delete Function
  const handleDelete = async (row) => {
    await dispatch(deleteData(row?._id));
    dispatch(fetchData());
  };

  // import columns
  const columns = useMemo(
    () => Columns({ handleEdit, handleDelete }),
    [handleEdit, handleDelete]
  );

  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };
    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  if (loader) {
    return <h1>Loader</h1>;
  }

  return (
    <div className="mainListing">
      <div>
        <Button
          onClick={() => navigate("/create")}
          className="registerbtn cancel"
        >
          Add
        </Button>
        <DataTable
          scrollX
          columns={columns}
          data={filteredItems}
          pagination
          paginationResetDefaultPage={resetPaginationToggle}
          subHeader
          subHeaderComponent={subHeaderComponentMemo}
          persistTableHead
        />
      </div>
    </div>
  );
};

export default List;
