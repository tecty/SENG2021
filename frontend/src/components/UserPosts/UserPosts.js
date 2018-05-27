import React, { Component } from 'react';
import './UserPosts.css';
import { Affix, Button, Avatar, Icon } from 'antd';
import UserPostsFilter from '../UserPostsFilter/UserPostsFilter';
import UserPostsList from '../UserPostsList/UserPostsList';

export default class UserPosts extends Component {

  onBackButtonClick = () => {
    this.props.handleShowUserPostsChanged(false, "")
  }

  render() {
    const {
      user,
      author,
      onEventDetailClick,
      handleDeletePost,
      posts,
      filteredPosts,
      filterValue,
      handleValueChanged
    } = this.props;

    return (
      <div className="UserPosts" ref={(node) => { this.container = node; }}>
        <Affix target={() => this.container}>
          <Button type="primary" onClick={this.onBackButtonClick}>
            <Icon type="left" />Go back
          </Button>
        </Affix>
        <div className="UserPosts-avatar">
          <Avatar size="large" style={{ backgroundColor: '#87d068' }}>{author[0].toUpperCase()}</Avatar>
          <p>{author}</p>
        </div>
        <UserPostsFilter 
          value={filterValue}
          handleValueChanged={handleValueChanged}
          places={posts}
        />
        <UserPostsList 
          listData={filteredPosts}
          onEventDetailClick={onEventDetailClick}
          isAuthor={user.username === author}
          handleDeletePost={handleDeletePost}
          handleFilterValueChanged={handleValueChanged}
        />
      </div>
    );
  }
}