import React, { Component } from 'react'
import { InfoWindow } from 'react-google-maps'
 
export default class PlaceInfoWindow extends Component {
  render() {
    const {description, name, tags} = this.props;
 
    return(
      <InfoWindow onCloseClick={this.props.closeWindow}>
        <div>
          <h1>{name}</h1>
          <p>{description}</p>
          <div className="tags">
            {tags.length >0 && tags.map(tag => {
              return (
                <span key={tag}>{tag}</span>
              )
            })}
          </div>
        </div>
      </InfoWindow>
    );
  }
}