import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React from 'react';

const Navigation = () => {

    return (
    
      
        <>
          <div>
            <Navbar collapseOnSelect  bg="primary" variant="dark">
                <Container>
                <Navbar.Brand href="/home">Formation Academy</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link  href='/'>Home</Nav.Link>
                    <Nav.Link  href='/inscription'>Inscription</Nav.Link>
                    <Nav.Link  href='/calendar'>Evènement</Nav.Link>
                    <Nav.Link className='float-left' href='/auth'>Se connecter</Nav.Link>
                </Nav>
                </Container>
            </Navbar>

        
          </div>
          
    
          
        </>
      );
}
export default Navigation;
