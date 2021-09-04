import { Container, Grid, Button } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import "../styles/NotFoundPage.css";

import ErrorIcon from '@material-ui/icons/Error';
const NotFoundPage = () => {
  return (
    <Container>
      <Grid container style={{ textAlign: "center" }}>
        <Grid item xs={12} sm={2} md={3}></Grid>
        <Grid item xs={12} sm={8} md={6} className="notFoundCard" style={{ marginTop: 35, textAlign: "center" }}>
          <h2>
            Page Not Found <ErrorIcon />
          </h2>
          <img src= "https://wp-asset.groww.in/wp-content/uploads/2020/06/19190833/for-blog_top-funds-05.png" height= {400} width={800} alt="grow"
          className="logoImage"/>
          <h4>Error!!</h4>
          <div className="buttonBottom">
            <Link to="/banks">
              <Button
                variant="contained" 
                style={{ textDecoration: "none", backgroundColor: "blue", color: "white",}}>
                 Home Page
              </Button>
            </Link>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default NotFoundPage;
