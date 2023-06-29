import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: "5px",
    textAlign: "center",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const DetailsTicket = ({ row, index, showTickets }) => {
  return (
    <StyledTableRow key={index}>
      <StyledTableCell component="th" scope="row">
        {row.event_name}
      </StyledTableCell>
      <StyledTableCell>{row.row}</StyledTableCell>
      <StyledTableCell>{row.seat}</StyledTableCell>
      <StyledTableCell>{row.area}</StyledTableCell>
      <StyledTableCell>{row.price}$</StyledTableCell>
      {showTickets === "seller" ? (
        <>
          <StyledTableCell>
            {row.is_sold
              ? `${row.first_name} ${row.last_name}`
              : "Not Available"}
          </StyledTableCell>
          <StyledTableCell>
            {row.is_sold ? "Sold" : "Waiting For Sale"}
          </StyledTableCell>
        </>
      ) : (
        <>
          <StyledTableCell>
            {row.first_name} {row.last_name}
          </StyledTableCell>
        </>
      )}
    </StyledTableRow>
  );
};

export default DetailsTicket;
