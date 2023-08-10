import { EventsGrid } from "@/components/EventsGrid"
import { AppBar, Container, Toolbar, Typography } from "@mui/material"
import { Suspense } from "react"

export default async function Home() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography variant="h6" color="inherit">
            USDT (ERC-20) &mdash; Transfer events
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ py: 2 }}>
        <Suspense fallback={<div>Loading...</div>}>
          <EventsGrid />
        </Suspense>
      </Container>
    </div>
  )
}
