import React from "react";
import { createBrowserRouter } from "react-router";

import UserFrom from "../Page/UserFrom";
import Root from "../Root/Root";
import UpDateInfo from "../Page/UpDateInfo";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: UserFrom },
      { path: "updateInfo", Component: UpDateInfo },
      { path: "/update/:id",
        // loader:({params})=>
        Component: UpDateInfo },
      { path: "/*", Component: UpDateInfo,
        hydrateFallbackElement:""
       },
    ],
  },
]);
