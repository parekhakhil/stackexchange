import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import axios from "axios";
import ResultTable from './ResultTable';
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TablePagination from "@material-ui/core/TablePagination";
export class Results extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      query: "",
      page: 0,
      count: 0,
      rowsPerPage: 15,
      error: false,
      error_message: "",
      tag:'',
    };
  }
  handleChangePage = (event, newPage) => {
    event.preventDefault();
    this.setState({ page: newPage }, () => {
      this.getResults();
    });
  };
  getResults = () => {
    let page = this.state.page+1
    axios
      .get(
        `http://localhost:8000/search?q=${this.state.query}&tag=${this.state.tag}&page=${page}&row_per_page=${this.state.rowsPerPage}`,
      )
      .then((res) => {
        let results = [];
        console.log(res.data)
        res.data.search_results.forEach((item) => {
          results.push(item);
        });
        this.setState({ data: results, count: res.data.count,error:false },()=>{console.log(this.state)});
      })
      .catch((err) => {
        this.setState({error_message:"Please wait for a minute then try again",error:true})
      });
  };
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  render() {
    return (
      <>
        <div>
          <form className="search-form" method="get">
            <TextField
              id="outlined-search"
              label="Search by query"
              type="search"
              variant="outlined"
              name="query"
              value={this.state.query}
              onChange={this.handleChange}

            />
            <TextField
              id="outlined-search"
              label="Search by topics"
              type="search"
              variant="outlined"
              name="tag"
              value={this.state.tag}
              onChange={this.handleChange}

            />
            <TextField
              id="outlined-basic"
              label="Rows per page"
              type="number"
              variant="outlined"
              name="rowsPerPage"
              value={this.state.rowsPerPage}
              onChange={this.handleChange}
              required
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={this.getResults}
            >
              Submit
            </Button>
          </form>
        </div>
          <div>
            {!this.state.error && (
              <>
                <ResultTable results={this.state.data} count={this.state.count} />
                <TablePagination
                  // rowsPerPageOptions={[10, 25, 100]}
                  component="div"
                  count={this.state.count}
                  rowsPerPage={this.state.rowsPerPage}
                  page={this.state.page}
                  onChangePage={this.handleChangePage}
                  rowsPerPageOptions={[]}
                />
              </>
            )}
            {this.state.error && (
              <>
                <h2>{this.state.error_message}</h2>
              </>
            )}
          </div>
      </>
    );
  }
}

export default Results;
