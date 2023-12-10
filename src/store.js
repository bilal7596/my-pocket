import { configureStore } from '@reduxjs/toolkit'
import articleSlice from './Components/Articles/articleSlice'

export default configureStore({
  reducer: {
    articles: articleSlice
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch