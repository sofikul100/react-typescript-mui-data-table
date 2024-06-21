import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/Hooktype";
import { RootState } from "../store";
import { addTask, addTasknew, fetchTask } from "../redux/TaskSlice";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Card,
  Stack,
  Typography,
  Button,
  Fade,
  Modal,
  Box,
  Backdrop,
  TextField,
  Grid,
} from "@mui/material";
import AddTaskIcon from "@mui/icons-material/AddTask";
const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "Sl No",
    type: "string",
    renderCell: (params) =>
      params.api.getRowIndexRelativeToVisibleRows(params.row.id) + 1,
    flex: 1,
  },
  {
    field: "name",
    headerName: "Name",
    type: "string",
    flex: 1,
  },
  {
    field: "designation",
    headerName: "Designation",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    flex: 1,
  },
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function Task() {
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");

  const [openModal, setOpenModal] = React.useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
  const dispatch = useAppDispatch();

  const task = useAppSelector((state: RootState) => state.Task);

  useEffect(() => {
    dispatch(fetchTask());
  }, [dispatch]);

  if (task.loading) return <h1>Loading......</h1>;

  const handleTaskSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTask = { name: name, designation: designation };
    await dispatch(addTask(newTask));
  };

  return (
    <>
      <Card sx={{ mb: 2, p: 2 }}>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Typography variant="h6" color="initial">
            Task List
          </Typography>

          <Button
            variant="contained"
            onClick={handleOpen}
            startIcon={<AddTaskIcon />}
          >
            Add New Task
          </Button>
        </Stack>
      </Card>
      <div style={{ height: 400, width: "100%", overflow: "auto" }}>
        <DataGrid
          rows={task.task}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection={false}
        />
      </div>

      {/* modal content */}
      <Modal
        sx={{ width: "100%" }}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openModal}>
          <Card sx={style}>
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Typography variant="h6" color="initial">
                Add New Task
              </Typography>
              <Button onClick={handleClose}>Close</Button>
            </Stack>

            <form onSubmit={handleTaskSubmit}>
              <Grid container sx={{ marginTop: 2 }} spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    id="outlined-basic"
                    label="Enter Name"
                    variant="outlined"
                    sx={{ width: "100%" }}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="outlined-basic"
                    label="Enter Designation"
                    variant="outlined"
                    sx={{ width: "100%" }}
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Button type="submit" variant="contained" sx={{ marginTop: 2 }}>
                Add Now
              </Button>
            </form>
          </Card>
        </Fade>
      </Modal>
      {/* end modal content  */}
    </>
  );
}

export default Task;
