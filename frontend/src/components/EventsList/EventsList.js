import React, { Component } from 'react';
// import { List, Avatar, Tag } from 'antd';
import { List, Tag } from 'antd';
// import { List } from 'antd';
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
              >
                <List.Item.Meta
                  title={<a role="button" style={{color:"black"}} onClick={this.handleMoreClick.bind(this, item)} >{item.name}</a>}
                  description={
                    <div className="EventsList-tags">
                      {item.tags.length > 0 && item.tags.map(tag => {
                        return (<Tag color="#2db7f5" key={`${item.id}${tag}`}>#{tag}</Tag>)
                      })}
                    </div>
                  }
                  avatar={ item.pictures.length <= 0 ? null :
                    <div className="EventsList-picture">
                      <img src={item.pictures[0]} alt={`${item.id}_logo`} key={`${item.id}_logo`} />
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