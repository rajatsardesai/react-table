import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import "./App.css";
import Sidebar from "./components/Sidebar";

const countriesURL = "https://restcountries.eu/rest/v2/all";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  cursor: {
    cursor: "pointer",
    border: "1px solid #000"
  }
});

function App() {
  const [countriesData, setCountriesData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState([]);

  const [state, setState] = React.useState({
    right: false,
  });

  const classes = useStyles();

  const getCountriesWithAxios = async () => {
    const response = await axios.get(countriesURL);
    setCountriesData(response.data);
    setCountriesData(response.data);
  };

  useEffect(() => {
    getCountriesWithAxios();
  }, []);

  const selectedData = (data) => {
    setSelectedCountry(data);
  }

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table" responsive="sm">
              <TableHead className="thead">
                <TableRow>
                  <TableCell>
                    <strong>Name</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>Flag</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>Capital</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>Population</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>Region</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {countriesData.map((country, index) => (
                  ['right'].map((anchor) =>
                    <TableRow onClick={() => selectedData(country)} onClickCapture={toggleDrawer(anchor, true)} className={classes.cursor} key={index}>
                      <TableCell component="th" data-heading="Name" className="td" scope="row">{country.name}</TableCell>
                      <TableCell align="right" data-heading="Flag" className="td">
                        <img src={country.flag} alt="Flag" width="32px" />
                      </TableCell>
                      <TableCell align="right" data-heading="Capital" className="td">
                        {country.capital}
                      </TableCell>
                      <TableCell align="right" data-heading="Population" className="td">{country.population}</TableCell>
                      <TableCell align="right" data-heading="Region" className="td">{country.region}</TableCell>
                    </TableRow>
                  )))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

      <Sidebar toggleDrawer={toggleDrawer} state={state} selectedCountry={selectedCountry} />

    </>
  );

}

export default App;