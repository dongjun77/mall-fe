import { Children, Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

const Loading = <div className="bg-red-700">Loading....</div>;

const TodoList = lazy(() => import("../pages/todo/ListPage"));

function todoRouter() {
  return [
    {
      path: "list",
      element: (
        <Suspense fallback={Loading}>
          {" "}
          <TodoList />{" "}
        </Suspense>
      ),
    },
    {
      path: "",
      element: <Navigate replace={true} to={"list"} />,
    },
  ];
}

export default todoRouter;
