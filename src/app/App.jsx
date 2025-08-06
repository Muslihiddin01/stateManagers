import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../pages/layout/layout";
import Redux from "../pages/redux/redux";
import Jotai from "../pages/jotai/jotai";
import MobX from "../pages/mobX/mobX";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Redux />} />
        <Route path="/jotai" element={<Jotai />} />
        <Route path="/mobX" element={<MobX />} />
      </Route>
    </Routes>
  );
};

export default App;
