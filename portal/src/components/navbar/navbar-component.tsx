import React from 'react';
import './navbar-component.css';
export const NavBar = () => (
  <header>
    <h1 className="logo">FaceSystems</h1>
    <input type="checkbox" id="nav-toggle" className="nav-toggle" />
    <nav>
      <ul>
        <li>
          <a href="/orders">Orders</a>
        </li>
        <li>
          <a href="/profile">Profile</a>
        </li>
        <li>
          <a href="/logout">Log out</a>
        </li>
      </ul>
    </nav>
    <label htmlFor="nav-toggle" className="nav-toggle-label">
      <span></span>
    </label>
  </header>
);
