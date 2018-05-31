import React, { Component } from 'react';
import './TextEditor.css';
import { EditorState, convertToRaw, convertFromHTML, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import { Icon } from 'antd';


export default class TextEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: !props.defaultValue ? EditorState.createEmpty() :
      EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(props.defaultValue))),
    };
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
    this.props.handleDescriptionChange(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          placeholder={<div><Icon type="form" /> Add Description</div>}
          editorState={editorState}
          wrapperClassName=".wrapper"
          editorClassName=".editor"
          onEditorStateChange={this.onEditorStateChange}
          toolbar={{
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
          }}
        />
      </div>
    );
  }
}