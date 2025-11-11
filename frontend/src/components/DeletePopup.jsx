import { useState, forwardRef } from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import Slide from "@mui/material/Slide"
import { toast } from "react-toastify"

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />
})

export default function Delete({
  DeleteID,
  setDeleteID,
  setRefresh,
  authHeader,
}) {
  const [loading, setLoading] = useState(false)
  const handleClose = () => {
    setTimeout(() => {
      setDeleteID(0)
    }, 100)
  }

  // function to delete task
  const DeleteHandler = async () => {
    setLoading(true)
    try {
      const res = await fetch(`https://task-management-app-dux.onrender.com/api/tasks/${DeleteID}`, {
        method: "DELETE",
        headers: { ...authHeader },
      })
      const data = await res.json()
      if (!res.ok) {
        toast.error(data.message || "Delete failed", { autoClose: 3000 })
        handleClose()
        throw new Error(data.message || "Delete failed")
      } else {
        toast.success("Task deleted successfully", { autoClose: 3000 })
        handleClose()
        setRefresh(Math.random)
        setDeleteID(0)
      }
      setRefresh(Math.random)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Dialog
        open={DeleteID ? true : false}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{
          style: {
            transform: "translateY(-75%)",
          },
        }}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to delete this Task?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" color="inherit">
            Cancel
          </Button>
          <Button
            onClick={() => DeleteHandler()}
            disabled={loading}
            variant="outlined"
            color="error"
            type="submit"
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
