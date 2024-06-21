import React, { Suspense } from "react";
import Sidebar from "./components/Sidebar";
import { Box, styled } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loader from "./pages/Loader";
import { Provider } from "react-redux";
import store from "./store";
import Practices from "./pages/form/Practices";

//=======imports routing file =========//
const Task = React.lazy(() => import("./pages/Task"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));

const App = () => {
  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));
  return (
    <>
     <Provider store={store}>
      <Box sx={{ display: "flex" }}>
        <BrowserRouter>
          <Sidebar />

          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <DrawerHeader />

            {/* setup react router for whole project  */}
            <Suspense fallback={<Loader />}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/task" element={<Task />} />
                <Route path="/form" element={<Practices />} />
                <Route path="*" element={<h1>404 Not Found</h1>} />
              </Routes>
            </Suspense>
            {/* end react router setup  */}
          </Box>
        </BrowserRouter>
      </Box>
      </Provider>
    </>
  );
};

export default App;
