import { useState, useEffect } from "react"
import { Drawer, Box, Typography, Stack, Grid, Button } from "@mui/material"
import moment from "moment"

const View = ({ data, onClose }) => {
  const [open, setOpen] = useState(false)
  const [task, setTask] = useState(null)

  useEffect(() => {
    if (data) {
      setTask(data)
      setOpen(true)
    }
  }, [data])

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Drawer anchor="right" open={open} onClose={handleClose}>
      <Box sx={{ width: { xs: 400, sm: 500 }, p: 3 }}>
        <Typography variant="h6" mb={2}>
          Task Details
        </Typography>

        {task && (
          <Stack spacing={2}>
            <Box>
              <Typography variant="subtitle2">Title</Typography>
              <Typography variant="body1">{task.title || "-"}</Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2">Status</Typography>
              <Typography variant="body1">{task.status || "-"}</Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2">Priority</Typography>
              <Typography variant="body1">{task.priority || "-"}</Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2">Due Date</Typography>
              <Typography variant="body1">
                {task.due_date
                  ? moment(task.due_date).format("YYYY-MM-DD")
                  : "-"}
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2">Created At</Typography>
              <Typography variant="body1">
                {task.createdAt
                  ? moment(task.createdAt).format("YYYY-MM-DD")
                  : "-"}
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2">Owner</Typography>
              <Typography variant="body1">
                {task?.owner?.username || "-"}
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2">Description</Typography>
              <Typography variant="body1">{task.description || "-"}</Typography>
            </Box>
            <Grid display={"flex"} justifyContent={"flex-end"}>
              <Button variant="contained" color="error" onClick={handleClose}>
                Close
              </Button>
            </Grid>
          </Stack>
        )}
      </Box>
    </Drawer>
  )
}

export default View
