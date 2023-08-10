import { Providers } from "@/components/Providers"
import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"

import CssBaseline from "@mui/material/CssBaseline"

type Props = {
  children: React.ReactNode
}

export default function RootLayout(props: Props) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <CssBaseline />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
