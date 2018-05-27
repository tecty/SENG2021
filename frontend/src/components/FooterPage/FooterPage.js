import React, { Component } from 'react';
import { Col, Container, Row, Footer } from 'mdbreact';
import './FooterPage.css';
import { Link } from 'react-router-dom';
import url from '../../utils/url';

export default class FooterPage extends Component {
  render(){
    const link = url.get();
    return(
      <div className="FooterPage">
        <Footer color="stylish-color-dark" className="font-small pt-4 mt-4">
          <Container className="text-center text-md-left">
            <Row className="text-center text-md-left mt-3 pb-3">
              <Col md="3" lg="3" xl="3" className="mx-auto mt-3">
                  <h6 className="text-uppercase mb-4 font-weight-bold">SiRound</h6>
                  {/* <Link to='/' style={{ textDecoration: 'none' }}> */}
                  <a href={link}>
                    <p>Home</p>
                  </a>
                  {/* </Link> */}
                  <Link to='/map' style={{ textDecoration: 'none' }}>
                    <p>Map</p>
                  </Link>
              </Col>
              <hr className="w-100 clearfix d-md-none"/>
              <Col md="3" lg="2" xl="2" className="mx-auto mt-3">
                  <h6 className="text-uppercase mb-4 font-weight-bold">Useful links</h6>
                  <Link to='/about_us' style={{ textDecoration: 'none' }}>
                    <p>About Us</p>
                  </Link>
                  <Link to='/help' style={{ textDecoration: 'none' }}>
                    <p>Help</p>
                  </Link>
              </Col>
              <hr className="w-100 clearfix d-md-none"/>
              <Col md="4" lg="3" xl="3" className="mx-auto mt-3">
                  <h6 className="text-uppercase mb-4 font-weight-bold">Contact</h6>
                  <p><i className="fa fa-home mr-3"></i> UNSW Sydney, NSW 2052, Australia</p>
                  <p><i className="fa fa-envelope mr-3"></i> SiRound2018@gmail.com</p>
              </Col>
            </Row>
            <Row className="text-center text-md-left mt-3 pb-3" >
              <Col md="3" lg="3" xl="3" className="mx-auto mt-3">
                <p>&copy; {(new Date().getFullYear())} Copyright: 
                  {/* <Link to='/' style={{ textDecoration: 'none' }}> SiRound </Link> */}
                  <a href={link}> SiRound </a>
                </p>
              </Col>
            </Row>
          </Container>
        </Footer>
      </div>
    );
  }
}