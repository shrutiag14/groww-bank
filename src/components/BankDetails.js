import { Container, Grid, Button } from "@material-ui/core";
import React from "react";
import "../styles/Controls.css";
import { Link, useLocation } from "react-router-dom";

const BankDetails = (props) => {
  console.log(props);
  const location = useLocation();
  const { row } = location.state;

  return (
    <Container>
      <Grid item xs={12} className="tabcard"
        style={{ marginTop: 15, textAlign: "center" }}>
        <div className="heading">
          <h3>{row.bank_name}</h3>
        </div>
      </Grid>
      <Grid container style={{ textAlign: "center" }}>
        <Grid item xs={12} sm={2} md={3}></Grid>
        <Grid item xs={12} sm={8} md={6}  className="tabcard"
          style={{ marginTop: 30, textAlign: "center" }}>
          <p style={{ textAlign: "left", marginLeft: 30, marginTop: 17 }}>
            <p>
              <b>Bank ID : </b> {`${row.bank_id}\n`}
            </p>
            <p>
              <b>Bank Name : </b> {`${row.bank_name}`}
            </p>
            <p>
              <b>Branch : </b> {`${row.branch}`}
            </p>
            <p>
              <b>IFSC : </b> {`${row.ifsc}`}
            </p>
            <p>
              <b>Address : </b> {`${row.address}`}
            </p>
            <p>
              <b>City : </b> {`${row.city}`}
            </p>
            <p>
              <b>District : </b> {`${row.district}`}
            </p>
            <p>
              <b>State : </b> {`${row.state}`}
            </p>
          </p>
          <div className="buttonBottom">
            <Link to="/banks">
              <Button variant="contained"  style={{ textDecoration: "none", backgroundColor: "blue", color: "white",}}>
                Home Page
              </Button>
            </Link>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BankDetails;
