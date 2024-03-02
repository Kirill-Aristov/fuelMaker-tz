import React from "react";
import TableData from "./components/Table/TableData";
import Result from "./components/Result";
import Header from "./components/Header";
import ErrorBlock from "./components/Error/SnackbarAlert";
// const electron = window.require('electron');
// const fs = window.require("fs")
const App = () => {
  // fs.readFile("src/text.json", 'utf8', function (err: any, data: any) {
  //   if (err) throw err;
  //   console.log('OK: ' + "text.json");
  //   console.log(data)
  // });
  return (
    <React.Fragment>
      <Header />
      <TableData />
      <Result />
      <ErrorBlock />
    </React.Fragment >
  );
};

export default App;