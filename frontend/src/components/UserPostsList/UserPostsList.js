import React, { Component } from 'react';
import { List, Tag, Button } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import './UserPostsList.css'
import noImage from './noimage.jpg';
import postApi from '../../utils/postApi';

export default class InfiniteListExample extends Component {
  handleMoreClick(eventDetatil) {
    this.props.onEventDetailClick(eventDetatil);
  }

  onTagClick(tag) {
    this.props.handleFilterValueChanged(`#${tag}`, true);
  }

  handleDeletePostById(id) {
    postApi.deletePostById(id)
    this.props.handleDeletePost(id)
  }

  onEditPostClick(position){
    this.props.handleEditPostButtonClick(position)
  }

  render() {
    const { isAuthor } = this.props;
    return (
      <div className="UserPostsList">
        <InfiniteScroll loadMore={()=>{}}>
          <List
            dataSource={this.props.listData}
            renderItem={item => (
              <List.Item
                key={item.id}
                actions={[]}
              >
                <List.Item.Meta
                  title={<a role="button" className="UserPostsList-title" onClick={this.handleMoreClick.bind(this, item)} >{item.name}</a>}
                  description={
                    <div>
                      <div className="UserPostsList-tags">
                        {item.tags.length > 0 && item.tags.map(tag => {
                          return (<Tag color="#2db7f5" key={`${item.id}${tag}`} onClick={this.onTagClick.bind(this, tag)}>#{tag}</Tag>)
                        })}
                      </div>
                      { isAuthor &&
                        <div><br/><Button onClick={this.onEditPostClick.bind(this, item)}>Edit</Button> &nbsp;
                        <Button type="danger" onClick={this.handleDeletePostById.bind(this, item.id)}>Delete</Button></div>
                      }
                    </div>
                  }
                  avatar={ 
                    <div className="UserPostsList-picture">
                      <img src={ item.pictures.length > 0 ? item.pictures[0] : noImage} alt={`${item.id}_logo`} key={`${item.id}_logo`} />
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