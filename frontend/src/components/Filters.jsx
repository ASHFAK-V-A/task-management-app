import React from "react"
import { Grid, TextField, MenuItem, Button, setRef } from "@mui/material"

const TaskFilters = ({ watch, setValue, handleFilter, setRefresh }) => {
  const handleReset = () => {
    setValue("status", "")
    setValue("priority", "")
    setValue("due_date", "")
    setRefresh(Math.random)
  }

  return (
    <Grid container spacing={2} alignItems="flex-end" justifyContent={"end"}>
      {/* Status */}
      <Grid item xs={12} sm={3}>
        <TextField
          select
          value={watch("status") || ""}
          onChange={(e) => setValue("status", e.target.value)}
          fullWidth
          size="small"
          SelectProps={{
            displayEmpty: true,
            renderValue: (value) => {
              if (!value) return "Status"
              return value.charAt(0).toUpperCase() + value.slice(1)
            },
          }}
        >
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="in-progress">In Progress</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
        </TextField>
      </Grid>

      {/* Priority */}
      <Grid item xs={12} sm={3}>
        <TextField
          select
          value={watch("priority") || ""}
          onChange={(e) => setValue("priority", e.target.value)}
          fullWidth
          size="small"
          SelectProps={{
            displayEmpty: true,
            renderValue: (value) => {
              if (!value) return "Priority"
              return value.charAt(0).toUpperCase() + value.slice(1)
            },
          }}
        >
          <MenuItem value="low">Low</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="high">High</MenuItem>
        </TextField>
      </Grid>

      {/* Due Date - FIXED: Correct onChange handler */}
      <Grid item xs={12} sm={2}>
        <TextField
          type="date"
          label="Due Date"
          size="small"
          value={watch("due_date") || ""}
          onChange={(e) => setValue("due_date", e.target.value)}
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>

      {/* Apply Button */}
      <Grid item xs={12} sm={2}>
        <Button
          variant="outlined"
          fullWidth
          onClick={handleFilter}
          size="small"
        >
          Apply
        </Button>
      </Grid>

      {/* Reset Button */}
      <Grid item xs={12} sm={2}>
        <Button variant="outlined" fullWidth onClick={handleReset} size="small">
          Reset
        </Button>
      </Grid>
    </Grid>
  )
}

export default TaskFilters
