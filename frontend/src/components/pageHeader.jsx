import { Box, Button, Grid, Typography } from "@mui/material"
import { RefreshOutlined } from "@mui/icons-material"

const PageHeader = (props) => {
  return (
    <Grid sx={{ mx: 2, my: 1 }}>
      <Box>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
          }}
        >
          <Typography
            color="textPrimary"
            sx={{ fontSize: 25, fontWeight: 600 }}
          >
            {props.title}{" "}
            {props.total > 0 && (
              <span style={{ color: "grey", fontSize: 20 }}>
                ({props.total})
              </span>
            )}
            {props.refresh && (
              <Button onClick={() => props.onRefresh()}>
                <RefreshOutlined />
              </Button>
            )}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
        </Box>
      </Box>
    </Grid>
  )
}

export default PageHeader
