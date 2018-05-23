import React, { Component } from 'react';
import { List, Tag } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import './EventsList.css'

export default class InfiniteListExample extends Component {
  handleMoreClick(eventDetatil) {
    this.props.onEventDetailClick(eventDetatil);
  }

  onTagClick(tag) {
    this.props.handleFilterValueChanged(`#${tag}`);
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
                  title={<a role="button" className="EventsList-title" onClick={this.handleMoreClick.bind(this, item)} >{item.name}</a>}
                  description={
                    <div>
                      <div className="EventsList-tags">
                        {item.tags.length > 0 && item.tags.map(tag => {
                          return (<Tag color="#2db7f5" key={`${item.id}${tag}`} onClick={this.onTagClick.bind(this, tag)}>#{tag}</Tag>)
                        })}
                      </div>
                      <div>
                        <a className="EventsList-author">Post by </a>
                        {item.url && <a href={item.url}>Eventbrite</a>}
                        {item.author && <a className="EventsList-author">{item.author}</a>}
                      </div>
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