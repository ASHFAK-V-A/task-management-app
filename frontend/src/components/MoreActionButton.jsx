import { IconButton, Menu, MenuItem } from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { useState } from "react"
import InfoOutlineIcon from "@mui/icons-material/InfoOutline"

export const MoreActionButton = ({
  params,
  setID,
  setDeleteID,
  setViewData,
}) => {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleEdit = () => {
    setID(params?.row._id)
    handleClose()
  }

  const handleDelete = () => {
    setDeleteID(params?.row._id)
    handleClose()
  }
  const handleView = () => {
    setViewData(params?.row)
    handleClose()
  }
  return (
    <>
      <IconButton size="small" onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={() => handleView()}>
          <InfoOutlineIcon sx={{ fontSize: 14, mr: 1 }} />
          Details
        </MenuItem>
        <MenuItem onClick={() => handleEdit()}>
          <EditIcon sx={{ fontSize: 14, mr: 1, color: "blue" }} />
          Edit
        </MenuItem>
        <MenuItem onClick={() => handleDelete()}>
          <DeleteIcon sx={{ fontSize: 14, mr: 1, color: "red" }} />
          Delete
        </MenuItem>
      </Menu>
    </>
  )
}
