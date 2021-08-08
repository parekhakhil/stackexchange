import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function ResultTable(props) {
  const classes = useStyles();


  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Title</StyledTableCell>
            <StyledTableCell align="center">Owner</StyledTableCell>
            <StyledTableCell align="center">Views count</StyledTableCell>
            <StyledTableCell align="center">Date</StyledTableCell>
            <StyledTableCell align="center">Tags</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.results.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell align="center">
                <a href={row.link}>{row.title}</a>
              </StyledTableCell>
              <StyledTableCell align="center">
                <a href={row.owner.link}>{row.owner.display_name}</a>
              </StyledTableCell>
              <StyledTableCell align="center">{row.view_count}</StyledTableCell>
              <StyledTableCell align="center">
                      {new Date(row.creation_date*1000).toLocaleDateString()}
              </StyledTableCell>
              <StyledTableCell align="center">{row.tags.map(tag=>`${tag}, \t`)}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
