import React, { Component } from 'react';
import './AboutUs.css';
import { List } from 'antd';

const text = [
  "1. SiRound is built in 2018 by SENG2021 group project.",
  "2. SiRound is social website for people discover the events and people around them.",
  "3. The huge number of pins on the same place indicates that there might be an important event happened in that place.",
  "4. We are encourage users make friends with each other in real life. Since they can find each others based on their “Pins”.",
  "5. We also encourage users to record their life by their footprint.",
  "6. At the end of each year, we will send to each users a map of footprint for the past whole year.",
  "7. User can use our website as a dating website by sharing their location in real time.",
  "8. We also welcome traders to post their promotions or events in the “Pin” of their location.",
  "9. Hottest topics of day indicates what is the most popular events of the day.",
  "10. We encourage you to explore the SiRound website so you can find out more about what we do.",
]

export default class AboutUs extends Component {
  render() {
    return (
      <div className="AboutUs">
        <div className="AboutUs-top"></div>
        <br/>
        <div className="AboutUs-list">
          <List
          size="large"
          header={<div className="AboutUs-header">10 Things You Should Know About SiRound</div>}
          // footer={<div>Footer</div>}
          bordered
          dataSource={text}
          renderItem={item => (<List.Item>{item}</List.Item>)}
          />
        </div>
      </div>
    );
  }
}