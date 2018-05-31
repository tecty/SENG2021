import React, { Component } from 'react';
import { Upload, Icon, Modal } from 'antd';

export default class PicturesWall extends Component {
  constructor(props) {
    super(props);

    let count = -1
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: !props.defaultValue ? [] :
      props.defaultValue.map(url => {
        return {
          name: `${count}.png`,
          uid: count--,
          status: 'done',
          url: url,
        }
      }),
    };
  }

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange = ({ fileList }) => {
    this.setState({ fileList })
    let pictures = fileList.map(picture => {
      return picture.response ? picture.response.url : null;
    });
    pictures = pictures.filter(picture => picture != null);
    //console.log(pictures);
    this.props.onPicturesChanged(pictures);
  }

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload cover</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          accept="image/*"
          action="https://api.cloudinary.com/v1_1/cvluca/image/upload/?upload_preset=ff34dt8b&folder=siround"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 3 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}