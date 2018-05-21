import React, { Component } from 'react';
import { Modal, Button, Input, Tag, Icon, Tooltip } from 'antd';
import './NewPostForm.css';
import PicturesWall from '../PicturesWall/PicturesWall';
import TextEditor from '../TextEditor/TextEditor';


export default class NewPostForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      description: "",
      tags: [],
      pictures: [],
      inputVisible: false,
      inputValue: '',
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

  handleSubmit = () => {
    const { name, description, tags, pictures } = this.state;
    this.props.onSubmit({
      name: name,
      description: description,
      tags: tags,
      pictures: pictures,
    })
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
    const { tags, inputVisible, inputValue } = this.state;
    const { visible, loading, onClose } = this.props;
    return (
      <div>
        <Modal
          wrapClassName="NewPostForm-modal"
          visible={visible}
          title="New Post"
          onOk={this.handleSubmit}
          onCancel={onClose}
          footer={[
            <Button key="back" onClick={onClose}>Return</Button>,
            <Button key="submit" type="primary" loading={loading} onClick={this.handleSubmit}>
              Submit
            </Button>,
          ]}
        >
          <Input
            placeholder="Title"
            onChange={this.handleTitleInput}
          />
          <br/>
          <br/>
          <TextEditor handleDescriptionChange={this.handleDescriptionChange}/>
          <br/>
          <PicturesWall onPicturesChanged={this.handlePicturesChanged} />
          <br/>
          <div className="post-tags">
            {tags.length > 0 && tags.map((tag, index) => {
              const isLongTag = tag.length > 20;
              const tagElem = (
                <Tag key={tag} closable={index >= 0} afterClose={() => this.handleClose(tag)}>
                 {isLongTag ? `${tag.slice(0, 20)}...` : tag}
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
                <Icon type="plus" /> New Tag
              </Tag>
            )}
          </div>
        </Modal>
      </div>
    );
  }
}