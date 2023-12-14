/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { AppBar, IconButton, Toolbar, Container } from "@material-ui/core";
import { Menu as MenuIcon, Close } from "@material-ui/icons";
import { useMediaQuery } from "react-responsive";

import Button from "../Button";

import { useStyles } from "./style";

export default function Header() {
  const classes = useStyles();

  const [isLogged, setIsLogged] = useState(false);
  const [token, setToken] = useState(false);
  const [isOpenNav, setIsOpenNav] = useState(true);

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const storedToken = localStorage.getItem("token-login")
      ? JSON.parse(localStorage.getItem("token-login"))
      : "";

    console.log(storedToken, typeof toredToken);

    if (storedToken && storedToken !== "") {
      setIsLogged(true);
      setToken(storedToken);
    }
  }, []);

  return (
    <>
      <AppBar position="static" className={classes.root}>
        <Container className={classes.rootWrapper}>
          <h1 className={classes.title}>
            <a href="/" className={classes.titleLink}>
              Travel Manager
            </a>
          </h1>

          {isLogged ? (
            isOpenNav ? (
              <>
                <ul className={classes.nav}>
                  {isTabletOrMobile && (
                    <IconButton
                      edge="start"
                      className={classes.menuClose}
                      color="default"
                      aria-label="close"
                      size="medium"
                      onClick={() => setIsOpenNav(!isOpenNav)}
                    >
                      <Close color="error" fontSize="large" />
                    </IconButton>
                  )}
                  <li className={classes.itemNav}>
                    <a className={classes.linkNav} href="/">
                      Home
                    </a>
                  </li>
                  <li className={classes.itemNav}>
                    <a className={classes.linkNav} href="/itineraries">
                      Itineraries
                    </a>
                  </li>
                  <li className={classes.itemNav}>
                    <a className={classes.linkNav} href="/my-itineraries">
                      My Itineraries
                    </a>
                  </li>
                  <li className={classes.itemNav}>
                    <a className={classes.linkNav} href="/created-itineraries">
                      New Itinerary
                    </a>
                  </li>
                  <li className={classes.itemNav}>
                    <a className={classes.linkNav} href="/travel-tips">
                      Travel Tips
                    </a>
                  </li>
                </ul>
                <Button
                  onClick={() => {
                    localStorage.removeItem("token-login");
                    window.location.href = "/";
                  }}
                  color="default"
                  variant="contained"
                >
                  Logout
                </Button>
              </>
            ) : (
              <></>
            )
          ) : (
            <div className={classes.containerButtonAuth}>
              <Button
                onClick={() => {
                  window.location.href = "/signup";
                }}
                color="default"
                variant="contained"
              >
                Sign Up
              </Button>
              <Button
                onClick={() => {
                  window.location.href = "/login";
                }}
                color="secondary"
                variant="contained"
              >
                Login
              </Button>
            </div>
          )}
          {isTabletOrMobile && isLogged ? (
            <Toolbar>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={() => setIsOpenNav(!isOpenNav)}
              >
                <MenuIcon />
              </IconButton>
            </Toolbar>
          ) : (
            <></>
          )}
        </Container>
      </AppBar>
    </>
  );
}
