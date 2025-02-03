import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const loading = <div className="bg-red-700">Loading....</div>;
const Main = lazy(() => import("../pages/MainPage"));

const About = lazy(() => import("../pages/AboutPage"));

const root = createBrowserRouter([
  {
    path: "",
    element: (
      <Suspense fallback={loading}>
        <Main />
      </Suspense>
    ),
  },
  {
    path: "about",
    element: (
      <Suspense fallback={loading}>
        <About />
      </Suspense>
    ),
  },
]);

export default root;
