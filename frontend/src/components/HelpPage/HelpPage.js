import React, { Component } from 'react';
import './HelpPage.css';
import { Collapse } from 'antd';

const text = [
  {
    question: "How can I create an account?",
    text: "In our map, you can see the button with grey icon,click on that button.The pop-up box should show up and click on the sign up button it should lead you to the sign up page.Please follow the guide and provide your details for sign up."
  },
  {
    
    question: "How can I login?",
    text: "Same as sign up,go to our map page,you can see the button with grey icon,click on that button.The login pop-up box should show up.Please provide your username and password for login."
  },
  {
    question: "How can I login without SiRound account?",
    text: "Since we powered by the third party APIs, we support Google,Facebook and WeChat account login for the moment.Please follow the guide of the third party login."
  },
  {
    question: "What should I do if I forgot my password?",
    text: "In our login page, you could see “forgot password?” link behind the password bar.Please click on that bar,follow the guide and provide your account details. The reset password e-mail should be sent to your sign up e-mail."
  },
  {
    question: "How can I search?",
    text: "In our map,search bar is on the left top of the map, you can type anything you want to search,such as location,event,people and categories. Also the button with text “Search in this area” is for search all the events in that specific area, all the events in that area should comes up after click on that button."
  },
  {
    question: "How can I create a new post?",
    text: "First you need to login in to our website,click on the “+” button on the right bottom,pick up the place that you currently in Pin on that place and then the post detail pop-up box should show up. Please follow the guide and upload your comments to create a post."
  },
  {
    question: "How can I delete my post?",
    text: "First you need to find out the post that you want to delete, it can be found in your personal page.On the right bottom of that post it has the link which texted “Delete”,click on that link,warning message will show up and just click on “Delete”. It can be correctly delete your post."
  },
  {
    question: "How can I follow and unfollow?",
    text: "If you want to follow or unfollow someone,click on his/her icon and get into their home page,right down the their icon it has the button of follow or if you are following him/her it is a following button.Click on that button and if you want to unfollow this person, the warning message should come up and just click on “unfollow”."
  },
  {
    question: "How can I check my following and followers?",
    text: "Get into your homepage click on “Following” or “Follower”,the following and followers list should be showed."
  }
]

export default class HelpPage extends Component {
  render() {
    const Panel = Collapse.Panel;

    const customPanelStyle = {
      background: '#f7f7f7',
      borderRadius: 4,
      marginBottom: 24,
      border: 0,
      overflow: 'hidden',
    };

    return (
      <div className="HelpPage">
        <div className="HelpPage-top"></div>
        <br />
        <div className="HelpPage-list">
        <Collapse bordered={false} defaultActiveKey={[]}>
          {
            text.map(question => {
              return (
                <Panel header={question.question} key={text.indexOf(question)} style={customPanelStyle}>
                  <p>{question.text}</p>
                </Panel>
              );
            })
          }
        </Collapse>
        </div>
      </div>
    );
  }
}