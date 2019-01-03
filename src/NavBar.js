import React from 'react'
import { Navbar, Nav, NavItem, NavLink, NavbarBrand } from "reactstrap"
import logo from "./logo.png"

function NavBar() {
  return (
    <div>
      <Navbar style={{ paddingRight: '20px', paddingLeft: '30px' }}>
        <NavbarBrand href="/">
          <img src={logo} alt="CodeFlair" width="120" />
        </NavbarBrand>
        <Nav>
          <NavItem>
            <NavLink href="/snippets">
              Your Snippets
      </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  )
}

export default NavBar
