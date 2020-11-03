import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import Inventory from './components/inventory.component';
import InventoryAdd from './components/inventory-add.component';
import InventoryEdit from './components/inventory-edit.component';

//import logo from "./logo.svg";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            {/* <a className="navbar-brand" target="_blank">
              <img src={logo} width="30" height="30" />
            </a> */}
            <Link to="/" className="navbar-brand">MERN-stack Prototype: Ecommerce Website</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Inventory</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/inventory/add" className="nav-link">Add Item</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br/>
          <Route path="/" exact component={Inventory} />
          <Route path="/inventory/add" component={InventoryAdd} />
          <Route path="/inventory/edit/:id" component={InventoryEdit} />
        </div>
      </Router>
    );
  }
}

export default App;
