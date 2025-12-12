import React from "react";
import { createBrowserRouter } from "react-router";

import UserFrom from "../Page/AddFrom";
import Root from "../Root/Root";
import UpDateInfo from "../Page/UpDateInfo";
import PageError from "../Page/PageError";
import AllUserInfo from "../Page/AllUserInfo";
import Home from "../Page/Home";
import UserDetails from "../Page/UserDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index:true, Component:Home },
      { path:"/addUser", Component:UserFrom },
    
  {path: "/update/:id",
  loader: async ({ params }) => {
    const res = await fetch(`http://localhost:5000/single/${params.id}`);
    return res.json();
  },
  element: <UpDateInfo />,
},
  { path:"/details/:id",
         loader: async ({ params }) => {
      const res = await fetch(`http://localhost:5000/single/${params.id}`);
      return res.json();
    },
      element:<UserDetails/> },
 { path: "/alluser", Component: AllUserInfo,
        hydrateFallbackElement:""
       },
      { path:"/*", Component:PageError,
        hydrateFallbackElement:""
       },
    ],
  },
]);
