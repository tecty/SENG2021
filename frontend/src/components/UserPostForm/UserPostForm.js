import React, { Component } from 'react';
import { Modal, Button, Input, Tag, Icon, Tooltip, Alert } from 'antd';
import './UserPostForm.css';
import PicturesWall from '../PicturesWall/PicturesWall';
import TextEditor from '../TextEditor/TextEditor';
import postApi from '../../utils/postApi';


export default class UserPostForm extends Component {
  constructor(props) {
    super(props);

    const {post} = props
    this.state = {
      name: post.name,
      description: post.description,
      tags: post.tags,
      pictures: post.pictures,
      inputVisible: false,
      inputValue: '',
      error: null,
      success: null,
    }
  }

  handleClose = (removedTag) => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    this.setState({
      tags: tags
    })
  }

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  }

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  }

  handleDescriptionChange = (description) => {
    this.setState({ description: description});
  }

  handleInputConfirm = () => {
    const state = this.state;
    const inputValue = state.inputValue;
    let tags = state.tags;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
    });
  }

  handleAlertChanged(error, success) {
    this.setState({
      error: error,
      success: success,
    })
  }

  handleSubmit = () => {
    const { name, description, tags, pictures } = this.state;
    const { location } = this.props;

    if (name === "") {
      this.handleAlertChanged("Title may not be blank.", null)
    } else if (description === "") {
      this.handleAlertChanged("Desicription may not be blank", null)
    } else {
      console.log(pictures)
      const id = this.props.post.id
      postApi.editPostById(id, name, description, location, tags, pictures).then(detail => {
        if (detail.success) {
          this.handleAlertChanged(null, "Successfully posted.")
          this.props.onSubmit({
            id: detail.id,
            name: name,
            description: description,
            tags: tags,
            pictures: pictures,
          })
          this.setState({
            error: null,
            success: null, 
          })
        } else {
          this.handleAlertChanged("Unknown error.", null);
        }
      })
    }
  }

  handleTitleInput = (e) => {
    this.setState({
      name: e.target.value
    })
  }

  saveInputRef = (input) => {
    this.input = input
  }

  handlePicturesChanged = (pictures) => {
    this.setState({
      pictures: pictures,
    });
  }

  render() {
    const { 
      name,
      description,
      tags,
      pictures,
      inputVisible, 
      inputValue, 
      error, 
      success,
    } = this.state;
    const { visible, loading, onClose, onBack } = this.props;
    return (
      <div>
        <Modal
          wrapClassName="UserPostForm-modal"
          visible={visible}
          title="New Post"
          onOk={this.handleSubmit}
          // onCancel={onClose}
          closable={false}
          footer={[
            <Button key="back" onClick={onClose}>Close</Button>,
            <Button key="backToPin" onClick={onBack}>Back</Button>,
            <Button key="submit" type="primary" loading={loading} onClick={this.handleSubmit}>
              Submit
            </Button>,
          ]}
        >
          <Input
            placeholder="Title"
            onChange={this.handleTitleInput}
            prefix={<Icon type="form" />}
            defaultValue={name}
          />
          <br/>
          <br/>
          <PicturesWall 
            onPicturesChanged={this.handlePicturesChanged} 
            defaultValue={pictures}
          />
          <br/>
          <TextEditor 
            handleDescriptionChange={this.handleDescriptionChange}
            defaultValue={description}
          />
          <br/>
          <div className="post-tags">
            {tags.length > 0 && tags.map((tag, index) => {
              const isLongTag = tag.length > 20;
              const tagElem = (
                <Tag key={tag} closable={index >= 0} afterClose={() => this.handleClose(tag)}>
                 {isLongTag ? `#${tag.slice(0, 20)}...` : `#${tag}`}
                </Tag>
              );
              return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
            })}
            {inputVisible && (
              <Input
                ref={this.saveInputRef}
                type="text"
                size="small"
                style={{ width: 78 }}
                value={inputValue}
                onChange={this.handleInputChange}
                onBlur={this.handleInputConfirm}
                onPressEnter={this.handleInputConfirm}
              />
            )}
            {!inputVisible && (
              <Tag
                onClick={this.showInput}
                style={{ background: '#fff', borderStyle: 'dashed' }}
              >
                <Icon type="tags-o" /> New Tag
              </Tag>
            )}
          </div>
          <br/>
          { error && <Alert message={error} type="error" showIcon /> }
          { success && <Alert message={success} type="success" showIcon />}
        </Modal>
      </div>
    );
  }
}