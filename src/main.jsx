import { StrictMode } from 'react'
import React from "react";
import './index.css'

import { createRoot } from 'react-dom/client'
import { router } from './Component/Route/Route';
import { RouterProvider } from "react-router/dom";
createRoot(document.getElementById('root')).render(
  <StrictMode>
  <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
