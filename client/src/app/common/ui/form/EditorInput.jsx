import React, { Component } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Form, Label } from 'semantic-ui-react';

class EditorInput extends Component {
  constructor(props) {
    super(props);
    this.state = { content: '' };
    this.handleEditorChange = this.handleEditorChange.bind(this);
  }

  handleEditorChange(content, editor) {
    this.setState({ content });
  }

  blur = async () => {
    await this.inputRef.focus();
    await this.inputRef.blur();
  };

  render() {
    const {
      input,
      click,
      meta: { touched, error }
    } = this.props;
    return (
      <div className='editor-input-wrap'>
        <Form.Field>
          <input {...input} className='hidden-text-input' type='text' value={this.state.content} ref={ref => (this.inputRef = ref)} />
        </Form.Field>
        <Editor
          apiKey='twpt6v84p920kri6p37w1wk4258x70z5e2yjhikzlu6mysb6'
          onEditorChange={this.handleEditorChange}
          onBlur={this.blur}
          onClick={click}
          init={{
            height: 250,
            menubar: false,
            elementpath: false,
            plugins: ['lists link searchreplace fullscreen paste'],
            toolbar: 'fullscreen | bold italic underline strikethrough | bullist numlist | link ',
            default_link_target: '_blank',
            link_assume_external_targets: true,
            link_title: false,
            target_list: false
          }}
        />
        {touched && error && (
          <Label basic color='red'>
            {error}
          </Label>
        )}
      </div>
    );
  }
}

export default EditorInput;
