import React, { Component } from 'react';
import { Modal, Button } from 'antd';
import './NewPostForm.css';

export default class NewPostForm extends Component {
  render() {
    const { visible, loading, onClose, onSubmit } = this.props;
    return (
      <div>
        <Modal
          wrapClassName="NewPostForm-modal"
          visible={visible}
          title="New Post"
          onOk={onSubmit}
          onCancel={onClose}
          footer={[
            <Button key="back" onClick={onClose}>Return</Button>,
            <Button key="submit" type="primary" loading={loading} onClick={onSubmit}>
              Submit
            </Button>,
          ]}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    );
  }
}