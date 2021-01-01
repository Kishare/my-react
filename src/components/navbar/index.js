import React from 'react';

import {
  Container,
  Navbar,
} from 'react-bootstrap';

const NavBar = () => (
  <Navbar style={{ width: '100%', marginBottom: '20px' }} bg="dark" variant="dark">
    <Container>
      <Navbar.Brand style={{ margin: 'auto' }}>Moteur de recherche des événements de Paris</Navbar.Brand>
    </Container>
  </Navbar>
);

export default NavBar;
