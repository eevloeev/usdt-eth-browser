"use client"

import { persistor, store } from "@/redux/store"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"

type Props = { children: React.ReactNode }

export function StoreProvider(props: Props) {
  const { children } = props

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  )
}
