import React, { Component } from 'react';
import './HomePage.css';
import defaultImg from './background.jpeg';
import url from '../../utils/url';

export default class HomePage extends Component {
  render() {
    const link = url.get();
    return (
      <div className="HomePage">
        {/* <div>
          <img src={logo} alt="homepage-logo" classNameName="HomePage-logo"/>
        </div> */}
        <div id="header" className="content-block">
          <section className="center">
            <div className="slogan">
              SiRound
            </div>
            <div className="secondary-slogan">
              World is Connected than Ever Before. <br/><br/>
              <a href={`${link}\\map`} className="btn btn-o btn-lg btn-o-white">Pin Your Story</a>
            </div>
				</section>
        </div>
        <div id="about" className="about-us">
          <div className="container about-sec">
            <header className="block-heading cleafix">
              <div className="title-page">
                <p className="main-header">About Us</p>
                <p className="sub-header">Make sure you know about us</p>
              </div>
            </header>
            <div className="divide50"></div>
              <div className="row">
                <div className="col-md-4 text-center">
                  <div className="aboutus-item">
                    <i className="aboutus-icon far fa-map" aria-hidden="true"></i>
                    <h4 className="aboutus-title">Map Base</h4>
                    <p className="aboutus-desc">
                      A map that help you discorver more.
                    </p>
                  </div>
                </div>
                <div className="col-md-4 text-center">
                  <div className="aboutus-item">
                    <i className="aboutus-icon fa fa-map-marker"></i>
                    <h4 className="aboutus-title">Pins Around</h4>
                    <p className="aboutus-desc">
                      A pin is a event, a story. 
                    </p>
                  </div>
                </div>
                <div className="col-md-4 text-center">
                  <div className="aboutus-item">
                    <i className="aboutus-icon fas fa-plus"></i>
                    <h4 className="aboutus-title">Share Story</h4>
                    <p className="aboutus-desc">
                      It's time to share your story.
                    </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="content-block" id="blog">
          <div className="container blog-sec">
            <header className="block-heading cleafix">
              <div className="title-page">
                <p className="main-header">Features</p>
						    <p className="sub-header">Take a look of this site.</p>
              </div>
            </header>
            <section className="block-body">
              <div className="row">
                <div className="col-sm-4 blog-post">
                  <img src={defaultImg} alt={1}/>
                  <a href="#!"><h2>Pin </h2></a>
                  <p> Simply create a pin by drag and drop. </p>
                  <a href="#!">Try It!</a>
                </div>
                <div className="col-sm-4 blog-post">
								<img src={defaultImg} alt={2}/>
								<a href="#!"><h2>Post Detial</h2></a>
								<p>
									See what's going on on that location.
								</p>
								<a href="#!">Try It!</a>
							</div>
							<div className="col-sm-4 blog-post">
								<img src={defaultImg} alt={3}/>
								<a href="#!"><h2>Something else</h2></a>
								<p> </p>
								<a href="#!">Try It!</a>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }
}