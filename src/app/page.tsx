import { AppBar, Container, Toolbar, Typography } from "@mui/material"

export default function Home() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Container maxWidth="lg">
            <Typography variant="h6" color="inherit" component="div">
              USDT (ERC-20) &mdash; Transfer events
            </Typography>
          </Container>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg"></Container>
    </div>
  )
}
