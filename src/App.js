import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { render } from "react-dom";
import SearchParams from "./SearchParams";
import Details from "./Details";

const App = () => {
  return (
    <BrowserRouter>
      <header>
        <Link to="/">Adopt Me!</Link>
      </header>
      <Routes>
        <Route path="/details/:id" element={<Details />} />
        <Route path="/" element={<SearchParams />} />
      </Routes>
    </BrowserRouter>
  );
};

render(<App />, document.getElementById("root"));
