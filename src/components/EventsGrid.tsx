"use client"

import { Box, Button, Typography } from "@mui/material"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { useState } from "react"

const TABLE_PAGE_SIZE = 10

const columns: GridColDef[] = [
  {
    field: "blockNumber",
    headerName: "Block",
    width: 90,
    type: "number",
  },
  {
    field: "transactionHash",
    headerName: "Txn Hash",
    width: 180,
  },
  {
    field: "time",
    headerName: "Time",
    width: 180,
    sortable: false,
    valueFormatter: (params) => {
      return new Date(params.value).toLocaleString()
    },
  },
  {
    field: "from",
    headerName: "From",
    width: 180,
    valueGetter: (params) => {
      console.log(params)
      return params.row?.returnValues?.from
    },
  },
  {
    field: "to",
    headerName: "To",
    width: 180,
    valueGetter: (params) => params.row?.returnValues?.to,
  },
  {
    field: "amount",
    headerName: "Amount",
    width: 150,
    type: "number",
    valueFormatter(params) {
      return params.value + " USDT"
    },
  },
  {
    field: "fee",
    headerName: "Txn Fee",
    width: 150,
    editable: true,
    type: "number",
    valueFormatter(params) {
      return params.value + " ETH"
    },
  },
]

const EventsGrid = () => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchEvents = async () => {
    setLoading(true)
    const response = await fetch("/api/v1/events")
    const data = await response.json()
    const events = data.events.map((event: any) => ({
      ...event,
      id: event._id,
    }))
    setEvents(events)
    setLoading(false)
  }

  const handleClick = () => {
    fetchEvents()
  }

  return (
    <>
      {events.length > 0 ? (
        <DataGrid
          rows={events}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: TABLE_PAGE_SIZE,
              },
            },
          }}
          pageSizeOptions={[TABLE_PAGE_SIZE]}
          disableRowSelectionOnClick
        />
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
            height: "30vh",
          }}
        >
          <Typography variant="h5">No events to show 👀</Typography>
          <Typography>Click the button to fetch events</Typography>
          <Button variant="contained" onClick={handleClick} disabled={loading}>
            {loading ? "Loading..." : "Fetch Events"}
          </Button>
        </Box>
      )}
    </>
  )
}

export { EventsGrid }
