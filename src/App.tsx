import React, { Suspense } from "react";
import Sidebar from "./components/Sidebar";
import { Box, styled } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loader from "./pages/Loader";
import { Provider } from "react-redux";

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
    </>
  );
};

export default App;





//=====some interesing part here=========//

// import {
//   MaterialReactTable,
//   useMaterialReactTable,
//   type MRT_Row,
//   createMRTColumnHelper,
// } from "material-react-table";
// import { Box, Button } from "@mui/material";
// import FileDownloadIcon from "@mui/icons-material/FileDownload";
// import { jsPDF } from "jspdf"; //or use your library of choice here
// import autoTable from "jspdf-autotable";
// import { mkConfig, generateCsv, download } from "export-to-csv"; //or use your library of choice here

// type Person = {
//   id: string;
//   firstName: string;
//   lastName: string;
//   company: string;
//   city: string;
//   country: string;
// };

// const columnHelper = createMRTColumnHelper<Person>();
// const columns = [
//   columnHelper.accessor("id", {
//     header: "ID",
//     size: 40,
//   }),
//   columnHelper.accessor("firstName", {
//     header: "First Name",
//     size: 120,
//     filterVariant: 'text', // default
//   }),
//   columnHelper.accessor("lastName", {
//     header: "Last Name",
//     size: 120,
//   }),
//   columnHelper.accessor("company", {
//     header: "Company",
//     size: 300,
//   }),
//   columnHelper.accessor("city", {
//     header: "City",
//   }),
//   columnHelper.accessor("country", {
//     header: "Country",
//     size: 220,
//   }),
// ];

// const csvConfig = mkConfig({
//   fieldSeparator: ",",
//   decimalSeparator: ".",
//   useKeysAsHeaders: true,
// });

// const data: Person[] = [
//   {
//     id: "1",
//     firstName: "John",
//     lastName: "Doe",
//     company: "261 Erdman Ford",
//     city: "East Daphne",
//     country: "Kentucky",
//   },

//   {
//     id: "2",
//     firstName: "John",
//     lastName: "Doe",
//     company: "261 Erdman Ford",
//     city: "East Daphne",
//     country: "Kentucky",
//   },
//   {
//     id: "3",
//     firstName: "John",
//     lastName: "Doe",
//     company: "261 Erdman Ford",
//     city: "East Daphne",
//     country: "Kentucky",
//   },
//   {
//     id: "4",
//     firstName: "John",
//     lastName: "Doe",
//     company: "261 Erdman Ford",
//     city: "East Daphne",
//     country: "Kentucky",
//   },
//   {
//     id: "5",
//     firstName: "John",
//     lastName: "Doe",
//     company: "261 Erdman Ford",
//     city: "East Daphne",
//     country: "Kentucky",
//   },
//   {
//     id: "6",
//     firstName: "John",
//     lastName: "Doe",
//     company: "261 Erdman Ford",
//     city: "East Daphne",
//     country: "Kentucky",
//   },
//   {
//     id: "7",
//     firstName: "John",
//     lastName: "Doe",
//     company: "261 Erdman Ford",
//     city: "East Daphne",
//     country: "Kentucky",
//   },
// ];

// const App = () => {
//   const handleExportRows = (rows: MRT_Row<Person>[]) => {
//     const rowData = rows.map((row) => row.original);
//     const csv = generateCsv(csvConfig)(rowData);
//     download(csvConfig)(csv);
//   };

//   const handleExportData = () => {
//     const csv = generateCsv(csvConfig)(data);
//     download(csvConfig)(csv);
//   };

//   //=======for pdf =========//
//   const handlePdfExportRows = (rows: MRT_Row<Person>[]) => {
//     const doc = new jsPDF();
//     const tableData = rows.map((row) => Object.values(row.original));
    
//     const tableHeaders = columns.map((c) => c.header);
//     autoTable(doc, {
//       head: [tableHeaders],
//       body: tableData,
//     });

//     doc.save("mrt-pdf-example.pdf");
//   };

//   const table = useMaterialReactTable({
//     columns,
//     data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
   
//     enablePagination: true,
//     initialState: { pagination: { pageIndex: 0, pageSize: 5 },showColumnFilters:true },
//     enableRowSelection: true,
//     columnFilterDisplayMode: "popover",
//     enableGlobalFilter:true,
//     paginationDisplayMode: "pages",
//     positionToolbarAlertBanner: "bottom",
   
//     renderTopToolbarCustomActions: ({ table }) => (
//       <Box
//         sx={{
//           display: "flex",
//           gap: "16px",
//           padding: "8px",
//           flexWrap: "wrap",
//         }}
//       >
//         <Button
//           //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
//           onClick={handleExportData}
//           startIcon={<FileDownloadIcon />}
//         >
//           Export All Data
//         </Button>
//         <Button
//           disabled={table.getPrePaginationRowModel().rows.length === 0}
//           //export all rows, including from the next page, (still respects filtering and sorting)
//           onClick={() =>
//             handleExportRows(table.getPrePaginationRowModel().rows)
//           }
//           startIcon={<FileDownloadIcon />}
//         >
//           Export All Rows
//         </Button>
//         <Button
//           disabled={table.getRowModel().rows.length === 0}
//           //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
//           onClick={() => handleExportRows(table.getRowModel().rows)}
//           startIcon={<FileDownloadIcon />}
//         >
//           Export Page Rows
//         </Button>
//         <Button
//           disabled={
//             !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
//           }
//           //only export selected rows
//           onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
//           startIcon={<FileDownloadIcon />}
//         >
//           Export Selected Rows
//         </Button>
//         <Button
//           disabled={table.getPrePaginationRowModel().rows.length === 0}
//           //export all rows, including from the next page, (still respects filtering and sorting)
//           onClick={() =>
//             handlePdfExportRows(table.getPrePaginationRowModel().rows)
//           }
//           startIcon={<FileDownloadIcon />}
//         >
//           Export All PDF
//         </Button>
//       </Box>
//     ),
//   });
//   return (
//     <>
//         <div className="w-[100%] h-auto flex flex-row ">
//            <div className="w-[5%] px-8 h-[100vh] shadow-md bg-sky-600">
              
//            </div>
//             <div className="w-[95%] overflow-auto mx-8">
//               <MaterialReactTable table={table} />
//             </div>
//         </div>
        
//     </>
//   );
// };

// export default App;
