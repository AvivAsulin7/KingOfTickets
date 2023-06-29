import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DetailsTicket from "./DetailsTicket";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 14,
    textAlign: "center",
    padding: "5px",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 10,
  },
}));

export default function StatusTickets({ showTickets, tickets }) {
  return (
    <TableContainer
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>Event Name</StyledTableCell>
            <StyledTableCell>Row</StyledTableCell>
            <StyledTableCell>Seat</StyledTableCell>
            <StyledTableCell>Area</StyledTableCell>
            <StyledTableCell>Price</StyledTableCell>
            {showTickets === "seller" ? (
              <>
                <StyledTableCell>Buyer Name</StyledTableCell>

                <StyledTableCell>Status</StyledTableCell>
              </>
            ) : (
              <>
                <StyledTableCell>Seller Name</StyledTableCell>
              </>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {tickets.map((row, index) => (
            <DetailsTicket
              row={row}
              index={index}
              key={index}
              showTickets={showTickets}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
