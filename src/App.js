import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'

import Index from './routes/Index'
import Chats from './routes/Chats'
import Chat from './routes/Chat'

export default function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Index />}>
          <Route index element={<Chats />} />
          <Route path=':chatId' element={<Chat />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
