import React, { useEffect, useState } from "react"
import PageHeader from "../../../components/pageHeader"
import { Box, Card, Chip, Grid, Typography } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import { MoreActionButton } from "../../../components/MoreActionButton"
import Create from "./Create"
import moment from "moment"
import Delete from "../../../components/DeletePopup"
import View from "./View"
import TaskFilters from "../../../components/Filters"
import { useForm } from "react-hook-form"

export default function Tasks({ token }) {
  const [editID, setEditID] = useState(null)
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const authHeader = { Authorization: `Bearer ${token}` }
  const [deleteID, setDeleteID] = useState(0)
  const [viewData, setViewData] = useState()
  const { watch, setValue } = useForm()
  const fetchTasks = async () => {
    setLoading(true)
    try {
      const query = new URLSearchParams({
        status: watch("status") || "",
        priority: watch("priority") || "",
        due_date: watch("due_date") || "",
      }).toString()

      const res = await fetch(`/api/tasks?${query}`, {
        headers: authHeader,
      })
      const data = await res.json()
      setTasks(data || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [refresh])

  const columns = [
    {
      field: "index",
      headerName: "No",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => {
        return params.api.getRowIndexRelativeToVisibleRows(params.id) + 1
      },
    },
    {
      field: "title",
      headerName: "Title",
      flex: 2,
      renderCell: (params) => {
        const today = moment()
        const due = moment(params.row.due_date)
        const isOverdue =
          due.isBefore(today, "day") && params.row.status !== "completed"

        return (
          <p
            style={{ color: isOverdue ? "red" : "inherit", display: "center" }}
          >
            {params.value}
          </p>
        )
      },
    },
    { field: "status", headerName: "Status", flex: 1 },

    {
      field: "priority",
      headerName: "Priority",
      flex: 1,
      renderCell: (params) => {
        let color = "default"

        if (params.value === "high") color = "error" // red
        else if (params.value === "medium") color = "warning" // orange
        else if (params.value === "low") color = "success" // green

        return (
          <Chip
            label={params.value.charAt(0).toUpperCase() + params.value.slice(1)}
            color={color}
            size="small"
          />
        )
      },
    },

    {
      field: "due_date",
      headerName: "Due Date",
      flex: 2,
      renderCell: (params) => {
        const today = moment()
        const due = moment(params.row.due_date)
        const isOverdue =
          due.isBefore(today, "day") && params.row.status !== "completed"

        return (
          <p
            style={{ color: isOverdue ? "red" : "inherit", display: "center" }}
          >
            {moment(params.value).format("DD-MM-YYYY")}
          </p>
        )
      },
    },
    {
      field: "createdAt",
      headerName: "Created Date",
      flex: 1,
      valueGetter: (params) => moment(params).format("DD-MM-YYYY"),
    },
    {
      field: "owner",
      headerName: "Owner",
      flex: 1,
      valueGetter: (params) => params.username || "-",
    },
    {
      field: "actions",
      headerName: "",
      flex: 0.3,
      sortable: false,
      renderCell: (params) => (
        <MoreActionButton
          setID={setEditID}
          params={params}
          setDeleteID={setDeleteID}
          setViewData={setViewData}
        />
      ),
    },
  ]
  const handleFilter = () => {
    setRefresh(Math.random)
  }
  return (
    <div>
      <Box
        pt={2}
        display={"flex"}
        justifyContent={"space-between"}
        alignContent={"center"}
      >
        <PageHeader title={"Tasks"} total={tasks.length} />
        <View data={viewData} />
        <TaskFilters
          watch={watch}
          setValue={setValue}
          handleFilter={handleFilter}
          setRefresh={setRefresh}
        />
        <Box display={"flex"} mt={2}>
          <Create
            id={editID}
            setId={setEditID}
            token={token}
            refreshTasks={fetchTasks}
            setRefresh={setRefresh}
          />
        </Box>
      </Box>

      <Delete
        DeleteID={deleteID}
        setDeleteID={setDeleteID}
        setRefresh={setRefresh}
        authHeader={authHeader}
      />

      <Card sx={{ mt: 4, width: "100%" }} variant="outlined">
        <Box sx={{ width: "100%" }}>
          <DataGrid
            autoHeight
            rows={tasks || []}
            columns={columns}
            getRowId={(row) => row._id}
            pageSizeOptions={[5, 10, 20]}
            initialState={{
              pagination: { paginationModel: { pageSize: 10 } },
            }}
            disableRowSelectionOnClick
            loading={loading}
          />
        </Box>
      </Card>
    </div>
  )
}
