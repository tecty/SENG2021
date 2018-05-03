import React, { Component } from 'react';
import { Card, Button, Icon, Tag, Affix } from 'antd';
import './EventDetail.css';

const { Meta } = Card;

export default class EventDetail extends Component {
  render() {
    const { event, onBackButtonClick } = this.props;
    return (
      <div className="EventDetail" ref={(node) => { this.container = node; }}>
        <Affix target={() => this.container}>
          <Button type="primary" onClick={onBackButtonClick}>
            <Icon type="left" />Go back
          </Button>
        </Affix>
        <Card
          // style={{ width: '100%', bottom: 0}}
          // cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
          // actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
          title={event.name}
          bordered={false}
        >
          <Meta
            // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
            title={
              <div>
                {event.tags.length > 0 && event.tags.map(tag => {
                  return (<Tag color="#2db7f5" key={`${event.id}${tag}`}>#{tag}</Tag>)
                })}
              </div>
            }
            description={event.description}
          />
        </Card>
      </div>
    );
  }
}