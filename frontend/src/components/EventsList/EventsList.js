import React, { Component } from 'react';
// import { List, Avatar, Tag } from 'antd';
import { List, Tag } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import './EventsList.css'


export default class InfiniteListExample extends Component {
  render() {
    return (
      <div className="EventsList">
        <InfiniteScroll>
          <List
            dataSource={this.props.listData}
            renderItem={item => (
              <List.Item
                key={item.id}
                actions={[<a>more</a>]}
              >
                <List.Item.Meta
                  // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                  // title={<a href="https://ant.design">{item.name}</a>}
                  title={item.name}
                  description={
                    <div>
                      {item.tags.length > 0 && item.tags.map(tag => {
                        return (<Tag color="#2db7f5">#{tag}</Tag>)
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