import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import { isLoggedIn } from '../middleware/';

const Header = () => {
    return (
        <Navbar inverse collapseOnSelect>
            <Navbar.Header>
                <Navbar.Brand>
                    <a href="/">My App</a>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
            { (!isLoggedIn()) ?
            <Nav pullRight>
                <NavItem eventKey={1} href="/home">
                    List User
                </NavItem>
                <NavItem eventKey={2} href="/login">
                    Login
                </NavItem> 
            </Nav> :
            <Nav pullRight>
                <NavItem eventKey={1} href="/product-management">
                    Manajemen produk
                </NavItem>
                <NavDropdown eventKey={2} title={"You're Logged in as " + JSON.parse(localStorage.credential).first_name + " " + JSON.parse(localStorage.credential).last_name } id="basic-nav-dropdown">
                    <MenuItem eventKey={2.1}>Profile</MenuItem>
                    <MenuItem divider />
                    <MenuItem eventKey={2.2} href="/logout">Logout</MenuItem>
                </NavDropdown>
            </Nav>
            }
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Header;