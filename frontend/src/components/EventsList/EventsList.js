import React, { Component } from 'react';
// import { List, Avatar, Tag } from 'antd';
import { List, Tag } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import './EventsList.css'

export default class InfiniteListExample extends Component {
  handleMoreClick(eventDetatil) {
    this.props.onEventDetailClick(eventDetatil);
  }

  partalDescription(description) {
    if (description == null) return;
    const isLong = description.length > 30;
    const desc = isLong ? `${description.slice(0, 30)} ... ` : `${description} `;
    return (<a className="EventsList-description">{desc}</a>);
  }

  render() {
    return (
      <div className="EventsList">
        <InfiniteScroll loadMore={()=>{}}>
          <List
            dataSource={this.props.listData}
            renderItem={item => (
              <List.Item
                key={item.id}
                actions={[]}
                // onClick={this.props.onClick}
              >
                <List.Item.Meta
                  // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                  // title={<a href="https://ant.design">{item.name}</a>}
                  title={item.name}
                  description={
                    <div>
                      <div>
                        {item.tags.length > 0 && item.tags.map(tag => {
                          return (<Tag color="#2db7f5" key={`${item.id}${tag}`}>#{tag}</Tag>)
                        })}
                      </div>
                      <div>
                        {this.partalDescription(item.description)}
                        <a onClick={this.handleMoreClick.bind(this, item)}>more</a>
                      </div>
                    </div>
                  }
                />
              </List.Item>
            )}
          >
          </List>
        </InfiniteScroll>
      </div>
    );
  }
}