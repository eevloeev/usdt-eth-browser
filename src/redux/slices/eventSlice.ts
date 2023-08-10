import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const eventSlice = createSlice({
  name: "event",
  initialState: {
    all: [],
    loading: false,
  },
  reducers: {
    addManyEvents(state, action) {
      state.all = action.payload
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchEvents.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchEvents.fulfilled, (state, action) => {
      const { events } = action.payload
      state.all = events.map((event: any) => ({
        ...event,
        id: event._id,
      }))
      state.loading = false
    })
  },
})

export const fetchEvents = createAsyncThunk("event/fetchEvents", async () => {
  const response = await fetch("/api/v1/events")
  const data = await response.json()
  return data
})

export const { addManyEvents } = eventSlice.actions
export default eventSlice.reducer
