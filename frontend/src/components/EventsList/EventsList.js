import React, { Component } from 'react';
// import { List, Avatar, Tag } from 'antd';
import { List, Tag } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import './EventsList.css'

export default class InfiniteListExample extends Component {
  handleMoreClick(eventDetatil) {
    this.props.onEventDetailClick(eventDetatil);
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
                actions={[<a onClick={this.handleMoreClick.bind(this, item)}>more</a>]}
                // onClick={this.props.onClick}
              >
                <List.Item.Meta
                  // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                  // title={<a href="https://ant.design">{item.name}</a>}
                  title={item.name}
                  description={
                    <div>
                      {item.tags.length > 0 && item.tags.map(tag => {
                        return (<Tag color="#2db7f5" key={`${item.id}${tag}`}>#{tag}</Tag>)
                      })}
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