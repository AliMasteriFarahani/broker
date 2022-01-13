import React from "react";
import Cookies from "universal-cookie";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import MultiSelect from "../UI/MultiSelect";
import axios from "axios";
import "./Awards.css";

class Awards extends React.Component {
    constructor(props) {
        super(props);
        this.cookie = new Cookies();
    }
    state = {
        categories: [],
        filters: {
            order: "created_at",
            orderBy: "desc",
            limit: "10",
            category: ["all"],
            available: true,
        },
        awards: [],
    };

    getAwards = () => {
        let data = { categories: this.state.filters.category, available: this.state.filters.available };
        axios
            .post(`https://se.armanbrokerage.ir/api/v1/awards/items/filter?limit=${this.state.filters.limit}&orderBy=${this.state.filters.orderBy}&order=${this.state.filters.order}`, data, {
                headers: {
                    Authorization: `Bearer ${this.cookie.get("TOKEN")}`,
                },
            })
            .then((res) => {
                if (res.data.status === "Success") {
                    this.setState({ awards: res.data.data.awards.data });
                }
            });
    };
    componentDidMount = () => {
        axios
            .get("https://se.armanbrokerage.ir/api/v1/awards/category?limit=all", {
                headers: {
                    Authorization: `Bearer ${this.cookie.get("TOKEN")}`,
                },
            })
            .then((res) => {
                if (res.data.status === "Success") {
                    this.setState({ categories: res.data.data.categories });
                }
            });
        this.getAwards();
    };
    filterHandler = (event, category) => {
        let filters = { ...this.state.filters };
        filters[category] = event.target.value;
        this.setState({ filters: filters });
    };
    handleCatChange = async (event) => {
        let filters = { ...this.state.filters };
        filters.category = event.target.value;
        this.setState({ filters: filters });
    };
    render() {
        return (
            <div className="awards">
                <h3>awards section :</h3>
                <br></br>
                <div className="form-inp">
                    <MultiSelect categories={this.state.categories} personName={this.state.filters.category} change={this.handleCatChange}></MultiSelect>
                    <FormControl fullWidth sx={{ mr: "1rem" }} fullWidth>
                        <InputLabel id="demo-simple-select-label">order</InputLabel>
                        <Select onChange={(event) => this.filterHandler(event, "order")} labelId="demo-simple-select-label" id="demo-simple-select" value={this.state.filters.order} label="Age">
                            <MenuItem value="created_at">created at</MenuItem>
                            <MenuItem value="score">score</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{ mr: "1rem" }} fullWidth>
                        <InputLabel id="demo-simple-select-label">order by</InputLabel>
                        <Select onChange={(event) => this.filterHandler(event, "orderBy")} labelId="demo-simple-select-label" id="demo-simple-select" value={this.state.filters.orderBy} label="Age">
                            <MenuItem value="asc">asc</MenuItem>
                            <MenuItem value="desc">desc</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{ mr: "1rem" }} fullWidth>
                        <InputLabel id="demo-simple-select-label">available</InputLabel>
                        <Select
                            onChange={(event) => this.filterHandler(event, "available")}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={this.state.filters.available}
                            label="Age"
                        >
                            <MenuItem value={true}>available</MenuItem>
                            <MenuItem value={false}>not available</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{ mr: "1rem" }} fullWidth>
                        <InputLabel id="demo-simple-select-label">limit</InputLabel>
                        <Select onChange={(event) => this.filterHandler(event, "limit")} labelId="demo-simple-select-label" id="demo-simple-select" value={this.state.filters.limit} label="Age">
                            <MenuItem value="5">5</MenuItem>
                            <MenuItem value="10">10</MenuItem>
                            <MenuItem value="15">15</MenuItem>
                            <MenuItem value="20">20</MenuItem>
                            <MenuItem value="25">25</MenuItem>
                            <MenuItem value="30">30</MenuItem>
                            <MenuItem value="50">50</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <Button onClick={this.getAwards} type="submit" sx={{ mt: "3rem" }} variant="contained" color="success">
                    search
                </Button>
                <div className="divider"></div>

                <div>
                    {this.state.awards.map((item) => {
                        return (
                            <div key={item.id} className="award">
                                <div className="img-awd">
                                    <img src="http://s2.armanbrokerage.ir/awards/1599555879.JPG" alt={item.title}></img>
                                </div>
                                <div className="awd-details">
                                    <h3>title : {item.title}</h3>
                                    <p>descriptions : {item.descriptions}</p>
                                    <div>
                                        <span>category :{item.category.title}</span>
                                        <span>price :{item.price}</span>
                                        <span>score :{item.score}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    {this.state.awards.length === 0 ? <div>there arent anything to show</div> : null}
                </div>
            </div>
        );
    }
}

export default Awards;
