import React, { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";

const Loading = <div className="bg-red-700">Loading....</div>;
const ProductList = lazy(() => import("../pages/products/ListPage"));

const productsRouter = () => {
  return [
    {
      path: "list",
      element: (
        <Suspense fallback={Loading}>
          <ProductList />
        </Suspense>
      ),
    },
    {
      path: "",
      element: <Navigate replace to={"/products/list"}></Navigate>,
    },
  ];
};

export default productsRouter;
