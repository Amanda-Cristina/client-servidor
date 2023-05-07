import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  MenuItem,
} from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  textField: {
    marginRight: 10,
    marginBottom: 10,
  },
});

const FilterableTable = (props) => {
  const { data } = props;
  const classes = useStyles();

  const [filter, setFilter] = useState("");
  const [ocurrenceFilter, setOcurrenceFilter] = useState("");

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleOcurrenceFilterChange = (event) => {
    setOcurrenceFilter(event.target.value);
  };

  const filteredData = data.filter((d) => {
    if (filter !== "" && !d.local.toLowerCase().includes(filter.toLowerCase())) {
      return false;
    }
    if (ocurrenceFilter !== "" && d.ocurrence_type !== ocurrenceFilter) {
      return false;
    }
    return true;
  });

  return (
    <React.Fragment>
      <TextField
        className={classes.textField}
        label="Local"
        value={filter}
        onChange={handleFilterChange}
      />
      <TextField
        className={classes.textField}
        select
        label="Type"
        value={ocurrenceFilter}
        onChange={handleOcurrenceFilterChange}
        style={{ width: '200px' }}
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value={1}>Atropelamento</MenuItem>
        <MenuItem value={2}>Deslizamento</MenuItem>
        <MenuItem value={3}>Colisão frontal</MenuItem>
      </TextField>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Registered at</TableCell>
              <TableCell align="right">Local</TableCell>
              <TableCell align="right">Km</TableCell>
              <TableCell align="right">Occurrence type</TableCell>
              <TableCell align="right">User ID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.registered_at}</TableCell>
                <TableCell align="right">{row.local}</TableCell>
                <TableCell align="right">{row.km}</TableCell>
                <TableCell align="right">{row.ocurrence_type}</TableCell>
                <TableCell align="right">{row.user_id}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
};

export default FilterableTable;