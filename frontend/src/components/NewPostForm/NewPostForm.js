import React, { Component } from 'react';
import { Modal, Button, Input, Tag, Icon, Tooltip } from 'antd';
import './NewPostForm.css';

export default class NewPostForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      description: "",
      tags: [],
      inputVisible: false,
      inputValue: '',
    }
    this.handleClose = this.handleClose.bind(this);
    this.showInput = this.showInput.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputConfirm = this.handleInputConfirm.bind(this);
    this.saveInputRef = this.saveInputRef.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTitleInput = this.handleTitleInput.bind(this);
    this.handleDescriptionInput = this.handleDescriptionInput.bind(this);
  }

  handleClose(removedTag) {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    this.setState({
      tags: tags
    })
  }

  showInput() {
    this.setState({ inputVisible: true }, () => this.input.focus());
  }

  handleInputChange(e) {
    this.setState({ inputValue: e.target.value });
  }

  handleInputConfirm() {
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

  handleSubmit() {
    const { name, description, tags } = this.state;
    this.props.onSubmit({
      name: name,
      description: description,
      tags: tags
    })
  }

  handleTitleInput(e) {
    this.setState({
      name: e.target.value
    })
  }

  handleDescriptionInput(e) {
    this.setState({
      description: e.target.value
    })
  }

  saveInputRef(input) {
    this.input = input
  }

  render() {
    const { tags, inputVisible, inputValue } = this.state;
    const { visible, loading, onClose } = this.props;
    const { TextArea } = Input;
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
          <TextArea
            placeholder="Description"
            rows={5}
            onChange={this.handleDescriptionInput}
          />
          <br/>
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