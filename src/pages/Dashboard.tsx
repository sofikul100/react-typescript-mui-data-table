import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_Row,
  createMRTColumnHelper,
} from "material-react-table";
import { Box, Button } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { jsPDF } from "jspdf"; //or use your library of choice here
import autoTable from "jspdf-autotable";
import { mkConfig, generateCsv, download } from "export-to-csv"; //or use your library of choice here

type Person = {
  id: string;
  firstName: string;
  lastName: string;
  company: string;
  city: string;
  country: string;
};

const columnHelper = createMRTColumnHelper<Person>();
const columns = [
  {
    header: 'Status',
    accessorFn: (originalRow) => (originalRow.isActive ? 'true' : 'false'), //must be strings
    id: 'isActive',
    filterVariant: 'checkbox',
    Cell: ({ cell }) =>
      cell.getValue() === 'true' ? 'Active' : 'Inactive',
    size: 170,
  },
  columnHelper.accessor("id", {
    header: "ID",
    size: 40,
  }),
  columnHelper.accessor("firstName", {
    header: "First Name",
    size: 120,
    filterVariant: 'text', // default
  }),
  columnHelper.accessor("lastName", {
    header: "Last Name",
    size: 120,
  }),
  columnHelper.accessor("company", {
    header: "Company",
    size: 300,
  }),
  columnHelper.accessor("city", {
    header: "City",
  }),
  columnHelper.accessor("country", {
    header: "Country",
    size: 220,
  }),
];

const csvConfig = mkConfig({
  fieldSeparator: ",",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
});

const data: Person[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    company: "261 Erdman Ford",
    city: "East Daphne",
    country: "Kentucky",
  },

  {
    id: "2",
    firstName: "John",
    lastName: "Doe",
    company: "261 Erdman Ford",
    city: "East Daphne",
    country: "Kentucky",
  },
  {
    id: "3",
    firstName: "John",
    lastName: "Doe",
    company: "261 Erdman Ford",
    city: "East Daphne",
    country: "Kentucky",
  },
  {
    id: "4",
    firstName: "John",
    lastName: "Doe",
    company: "261 Erdman Ford",
    city: "East Daphne",
    country: "Kentucky",
  },
  {
    id: "5",
    firstName: "John",
    lastName: "Doe",
    company: "261 Erdman Ford",
    city: "East Daphne",
    country: "Kentucky",
  },
  {
    id: "6",
    firstName: "John",
    lastName: "Doe",
    company: "261 Erdman Ford",
    city: "East Daphne",
    country: "Kentucky",
  },
  {
    id: "7",
    firstName: "John",
    lastName: "Doe",
    company: "261 Erdman Ford",
    city: "East Daphne",
    country: "Kentucky",
  },
];

const Dashboard = () => {
  const handleExportRows = (rows: MRT_Row<Person>[]) => {
    const rowData = rows.map((row) => row.original);
    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
  };

  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(data);
    download(csvConfig)(csv);
  };

  //=======for pdf =========//
  const handlePdfExportRows = (rows: MRT_Row<Person>[]) => {
    const doc = new jsPDF();
    const tableData = rows.map((row) => Object.values(row.original));
    
    const tableHeaders = columns.map((c) => c.header);
    autoTable(doc, {
      head: [tableHeaders],
      body: tableData,
    });

    doc.save("mrt-pdf-example.pdf");
  };

  const table = useMaterialReactTable({
    columns,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
   
    enablePagination: true,
    initialState: { pagination: { pageIndex: 0, pageSize: 5 },showColumnFilters:true },
    enableRowSelection: true,
    columnFilterDisplayMode: "popover",
    enableGlobalFilter:true,
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
   
    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        sx={{
          display: "flex",
          gap: "16px",
          padding: "8px",
          flexWrap: "wrap",
        }}
      >
        <Button
          //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
          onClick={handleExportData}
          startIcon={<FileDownloadIcon />}
        >
          Export All Data
        </Button>
        <Button
          disabled={table.getPrePaginationRowModel().rows.length === 0}
          //export all rows, including from the next page, (still respects filtering and sorting)
          onClick={() =>
            handleExportRows(table.getPrePaginationRowModel().rows)
          }
          startIcon={<FileDownloadIcon />}
        >
          Export All Rows
        </Button>
        <Button
          disabled={table.getRowModel().rows.length === 0}
          //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
          onClick={() => handleExportRows(table.getRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          Export Page Rows
        </Button>
        <Button
          disabled={
            !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
          }
          //only export selected rows
          onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          Export Selected Rows
        </Button>
        <Button
          disabled={table.getPrePaginationRowModel().rows.length === 0}
          //export all rows, including from the next page, (still respects filtering and sorting)
          onClick={() =>
            handlePdfExportRows(table.getPrePaginationRowModel().rows)
          }
          startIcon={<FileDownloadIcon />}
        >
          Export All PDF
        </Button>
      </Box>
    ),
  });
  return (
    <>
      <div className="overflow-x-scroll w-100 h-auto">
        <MaterialReactTable table={table} />
      </div>
    </>
  );
};

export default Dashboard;
