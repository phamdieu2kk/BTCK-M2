import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CarsContext } from "../contexts/CarsContext";
import { Box, InputBase, IconButton, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";

const SearchBar = () => {
  const { addToQuery } = useContext(CarsContext);
  const { pathname, search } = useLocation();
  const navigate = useNavigate();

  const [term, setTerm] = useState("");
  const [debounceTerm, setDebounceTerm] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(search);
    const q = queryParams.get("query") || "";
    if (q) {
      setDebounceTerm(q);
      setTerm(q);
    }
  }, [search]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTerm(debounceTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [debounceTerm]);

  useEffect(() => {
    addToQuery?.(term);
    if (term.length !== 0) {
      navigate(`/search?query=${term}`);
    } else {
      if (pathname === "/search") navigate("/search");
    }
  }, [term]);

  return (
    <Paper
      component="form"
      sx={{
        display: "flex",
        alignItems: "center",
        width: 300,
        height: 30,
        borderRadius: 10,
        pl: 1,
        pr: 1,
        boxShadow: "0px 1px 6px rgba(0,0,0,0.1)",
        backgroundColor: "#f8f8f8",
      }}
      elevation={0}
    >
      <IconButton sx={{ p: "10px" }} disabled>
        <SearchIcon sx={{ color: "#7f7f7f" }} />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1, color: "#444" }}
        placeholder="Search something here"
        value={debounceTerm}
        onChange={(e) => setDebounceTerm(e.target.value)}
      />
      <IconButton sx={{ p: "10px" }}>
        <TuneIcon sx={{ color: "#7f7f7f" }} />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;
