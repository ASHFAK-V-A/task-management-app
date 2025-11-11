import { useEffect, useState } from "react"
import {
  Button,
  Drawer,
  Box,
  Typography,
  TextField,
  Stack,
  MenuItem,
  Grid,
} from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import { useForm, Controller } from "react-hook-form"
import moment from "moment"
import { toast } from "react-toastify"

export default function Create({ id, setId, token, setRefresh }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const authHeader = { Authorization: `Bearer ${token}` }

  useEffect(() => {
    if (id) {
      fetchDetails(id)
      setOpen(true)
    }
  }, [id])
  const { handleSubmit, control, reset, clearErrors } = useForm({
    defaultValues: {
      title: "",
      description: "",
      status: "pending",
      priority: "low",
      due_date: moment().format("YYYY-MM-DD"),
    },
  })

  const toggleDrawer = (state) => () => {
    clearErrors()
    setOpen(state)
    setId(null)
  }
  const fetchDetails = async (id) => {
    try {
      const res = await fetch(`/api/tasks/${id}`, { headers: authHeader })
      const data = await res.json()
      if (data) {
        reset({
          title: data.title,
          description: data.description,
          status: data.status,
          priority: data.priority,
          due_date: moment(data.due_date).format("YYYY-MM-DD"),
        })
      }
    } catch (err) {
      console.error(err)
    }
  }

  const onSubmit = async (data) => {
    setLoading(true)

    const dataToSubmit = {
      title: data.title,
      status: data.status,
      priority: data.priority,
      due_date: data.due_date,
      description: data.description,
    }

    try {
      // Determine method and URL
      const method = id ? "PUT" : "POST"
      const url = id
        ? `https://task-management-app-dux.onrender.com/api/tasks/${id}`
        : "https://task-management-app-dux.onrender.com/api/tasks"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", ...authHeader },
        body: JSON.stringify(dataToSubmit),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || "Error saving task")
      }

      toast.success(`Task ${id ? "updated" : "created"} successfully`, {
        autoClose: 3000,
      })

      setRefresh(Math.random())
      setOpen(false)
      reset()
    } catch (error) {
      console.error(error)
      toast.error(error.message || "Something went wrong", { autoClose: 3000 })
    } finally {
      setLoading(false)
    }
  }

  const OpenModal = (state) => {
    setOpen(state)
    setId(null)
  }

  return (
    <>
      <Button
        variant="contained"
        onClick={() => OpenModal(true)}
        sx={{ display: "flex", alignItems: "center" }}
      >
        <AddIcon sx={{ marginRight: 1 }} /> Task
      </Button>

      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        <Box sx={{ width: { xs: 400, sm: 500 }, p: 3 }}>
          <Typography variant="h6" mb={2}>
            {id ? "Edit Task" : "Create Task"}
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <Controller
                name="title"
                control={control}
                rules={{ required: "Title is required" }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Title"
                    fullWidth
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />

              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <TextField {...field} select label="Status" fullWidth>
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="in-progress">In Progress</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
                  </TextField>
                )}
              />

              <Controller
                name="priority"
                control={control}
                render={({ field }) => (
                  <TextField {...field} select label="Priority" fullWidth>
                    <MenuItem value="low">Low</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="high">High</MenuItem>
                  </TextField>
                )}
              />

              <Controller
                name="due_date"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Due Date"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                )}
              />
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Description"
                    fullWidth
                    multiline
                    rows={3}
                  />
                )}
              />
              <Grid display={"flex"} justifyContent={"flex-end"}>
                <Button
                  variant="contained"
                  color="error"
                  onClick={toggleDrawer(false)}
                >
                  Close
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ ml: 2 }}
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit"}
                </Button>
              </Grid>
            </Stack>
          </form>
        </Box>
      </Drawer>
    </>
  )
}
