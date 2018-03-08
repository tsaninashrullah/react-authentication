import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';

const Header = () => {
    return (
        <Navbar>
            <Navbar.Header>
                <Navbar.Brand>
                    <a href="/">My App</a>
                </Navbar.Brand>
            </Navbar.Header>
            <Nav pullRight>
                <NavItem eventKey={1} href="/home">
                    Daftar tawanan
                </NavItem>
                { (typeof localStorage.token === "undefined" || localStorage.token === "") ?
                <NavItem eventKey={2} href="/login">
                    Login
                </NavItem> :
                <NavDropdown eventKey={3} title={"You're Logged in as " + JSON.parse(localStorage.credential).first_name + " " + JSON.parse(localStorage.credential).last_name } id="basic-nav-dropdown">
                    <MenuItem eventKey={3.1}>Profile</MenuItem>
                    <MenuItem divider />
                    <MenuItem eventKey={3.2} href="/logout">Logout</MenuItem>
                </NavDropdown>
                }
            </Nav>
        </Navbar>
    );
}

export default Header;