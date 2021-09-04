import React, { useEffect, useState } from "react";
import { Tabs,Tab,Grid,makeStyles,withStyles,Box,Typography} from "@material-ui/core";
import "../styles/Controls.css";
import { Dropdown,DropdownItem,DropdownMenu,DropdownToggle} from "reactstrap";
import PropTypes from "prop-types"; //typechecking
import TableCard from "./TableCard";
import { Link } from "react-router-dom";
import {  List } from "@material-ui/icons";
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';

const useStyles = makeStyles((theme) => ({
  formControl: { margin: theme.spacing(1), minWidth: 120, height: 20,},
  indicator: { backgroundColor: "black",
  },
  cont: { justifyContent: "space-between",
  },
}));

const StyledTab = withStyles({
  wrapper: { textTransform: "capitalize",  // when switch between tabs the text tranform from capiatl to small
  },
})(Tab);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Controls = () => {
  const classes = useStyles();
  const [category, setCategory] = useState("");
  const [value, setValue] = useState(0);
  const [city, setCity] = useState("Delhi");
  const [firstdropdownOpen, setDropdownOpen] = useState(false);
  const [seconddropdownOpen, setsecondDropDownOpen] = useState(false);
  const [cat, setCat] = useState("None");
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([]);
  

  const fetchapi = (val) => {
    if (localStorage.getItem(val)) {    //localStorage stores key value pairs as strings only (keys can also be integers)
      setTimeout(() => {
        setIsLoaded(false);
        console.log("Data fetched");
        const item = JSON.parse(localStorage.getItem(val));
        const now = new Date(); // Today's date
        // compare the expiry time of the item with the current time
        if (now.getTime() > item.expiry) {
          // If the item is expired, delete the item from storage
		// 
          localStorage.removeItem(val);
        } else {
          //return the original information.
          setData(item.data);
        }
        setIsLoaded(true);
      }, 200);
      return;
    }

    if (localStorage.getItem(val) === null) {
      setIsLoaded(false);
      var apiLink = `https://vast-shore-74260.herokuapp.com/banks?city=${val}`;
      fetch(apiLink)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          const now = new Date();
          data = data.map((data) => ({ ...data, favourite: false }));
          setData(data);
          const item = {
            data: data, expiry: now.getTime() + 60 * 6000,
          };
          localStorage.setItem(val, JSON.stringify(item));
          setIsLoaded(true);
        })
        .catch((err) => {
          console.log("Error in fetching data : ", err);
        });
    }
  };

  useEffect(() => {
    var val = "DELHI";
    console.log(val + "CITY");
    if (localStorage.getItem("favourite") === null) {
      localStorage.setItem("favourite", JSON.stringify([]));
    }

    if (localStorage.getItem(val)) {
      const item = JSON.parse(localStorage.getItem(val));
      const now = new Date();
      if (now.getTime() > item.expiry) {
        localStorage.removeItem(val);
      } else {
        setData(item.data);
      }
      setIsLoaded(true);
      return;
    }
    console.log(localStorage.getItem(val));
    if (
      localStorage.getItem(val) === null || localStorage.getItem(val) === []
    ) {
      var apiLink = `https://vast-shore-74260.herokuapp.com/banks?city=${val}`;
      fetch(apiLink)
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          const now = new Date();
          setData(res);
          var info = res.map((data) => ({ ...data, favourite: false }));
          setData(info);
          const item = {
            data: info, expiry: now.getTime() + 60 * 6000, 
          };
          localStorage.setItem(val, JSON.stringify(item));
          setIsLoaded(true);
        })
        .catch((err) => {
          console.log("Error in fetching data : ", err);
        });
    }
  }, []);
  // The handleChange() function that you see in many React component examples is a regular function created to handle input change. It’s commonly passed into an <input> element’s onChange property to intercept user’s input.

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const toggletwo = () => setsecondDropDownOpen((prevState) => !prevState);

  if (!isLoaded)
    return (
      <div className="loadingDiv">
        <img
          src= "https://wp-asset.groww.in/wp-content/uploads/2020/06/19190833/for-blog_top-funds-05.png" height= {450} width={800} alt="grow"
          className="loading"
        />
      </div>
    );
  else {
    return (
      <div>
        <div className="tabcard">
          <Grid container className={classes.cont}>
            <Grid item xs={6} md={4}>
              <Tabs value={value} onChange={handleChange} classes={{ indicator: classes.indicator }}>
                <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                  <StyledTab label="Banks"  icon={<List />} {...a11yProps(0)} />
                </Link>
                <Link
                  to="/favourites" style={{ textDecoration: "none", color: "black" }}>
                  <StyledTab label="Favourites" icon={<ThumbUpOutlinedIcon />} {...a11yProps(1)} />
                </Link>
              </Tabs>
            </Grid>
            <Grid item xs={5}>
              <Grid container style={{ justifyContent: "flex-start", marginTop: 10}}>
                {console.log(data)}
                <Grid item xs={4} sm={6} lg={9}>
                  <Dropdown
                    isOpen={firstdropdownOpen} toggle={() => toggle(firstdropdownOpen)}>
                    <DropdownToggle caret color="secondary" style={{ textTransform: "capitalize" }}>
                      {city}
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem
                        onClick={() => { setCity("Mumbai");fetchapi("MUMBAI");}}>
                        Mumbai
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => { setCity("Indore");fetchapi("INDORE");}} >
                        Indore
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => {setCity("Bhopal");fetchapi("BHOPAL"); }}>
                        Bhopal
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => { setCity("Lucknow"); fetchapi("LUCKNOW");}}>
                        Lucknow
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => { setCity("Delhi");fetchapi("DELHI");}}>
                        Delhi
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </Grid>
                <Grid item xs={8} sm={6} lg={3} style={{ display: "flex" }}>
                  <Dropdown isOpen={seconddropdownOpen} toggle={() => toggletwo(seconddropdownOpen)}>
                    <DropdownToggle caret color="secondary">
                      {cat}
                    </DropdownToggle>
                    <DropdownMenu className="menu">
                      <DropdownItem
                        onClick={() => { setCat("None"); setCategory("");}}>
                        None
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => { setCat("Bank Name"); setCategory("bank_name");}}>
                        Bank Name
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => { setCat(" IFSC"); setCategory("ifsc");}}>
                        IFSC
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => { setCat("Branch"); setCategory("branch");}}>
                        Branch
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
        <TableCard data={data} category={category} val={city.toUpperCase()} />
      </div>
    );
  }
};

export default Controls;
