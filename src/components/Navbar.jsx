import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import styled from "styled-components";

const Navbar = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Nav>
      <Logo to="/">🎬 MovieZone</Logo>
      <Menu>
        <NavItem to="/">Home</NavItem>
        {isAuthenticated ? (
          <NavItem to="/profile">👤 Profile</NavItem>
        ) : (
          <NavItem to="/login">Login</NavItem>
        )}
      </Menu>
    </Nav>
  );
};

export default Navbar;

// Styled Components
const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #1f1f2f;
  padding: 1rem 2rem;
  color: white;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  color: white;
`;

const Menu = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const NavItem = styled(Link)`
  text-decoration: none;
  color: white;
  font-weight: bold;
  font-size: 1rem;

  &:hover {
    color: #f39c12;
  }
`;
