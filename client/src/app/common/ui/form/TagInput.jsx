import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form } from 'semantic-ui-react';
import { createSlug } from '../../util/createSlug';
import { handleUpdateTagNames } from './actions/tagInputActions';

const mapState = state => ({
  tagNames: state.tagInput.tagNames
});

const actions = {
  handleUpdateTagNames
};

export class TagInput extends Component {
  removeTag = i => {
    const newTags = [...this.props.tagNames];
    newTags.splice(i, 1);
    this.props.handleUpdateTagNames(newTags);
    this.valueRef.value = newTags;
    this.blur();
    this.inputRef.focus();
  };

  inputKeyDown = e => {
    // console.log('inputKeyDown: start');
    const val = createSlug(e.target.value);
    if (e.key === 'Enter' && val) {
      // console.log('val: ', val);
      if (this.props.tagNames && this.props.tagNames.find(tag => tag === val)) {
        this.inputRef.focus();
        e.preventDefault();
        return;
      }
      // console.log('Enter Key: ');
      const newTags = [...this.props.tagNames, val];
      // console.log('inputKeyDown: newTags: ', newTags);
      this.props.handleUpdateTagNames(newTags);
      this.inputRef.value = null;
      this.valueRef.value = newTags;
      this.blur();
      this.inputRef.focus();
      e.preventDefault();
    } else if (e.key === 'Backspace' && !val) {
      this.removeTag(this.props.tagNames.length - 1);
      this.inputRef.focus();
      e.preventDefault();
    }
  };

  blur = () => {
    this.valueRef.focus();
    // console.log('this.valueRef.value: ', this.valueRef.value);
    this.valueRef.blur();
  };

  render() {
    const { input, placeholder, tagNames } = this.props;
    return (
      <>
        <Form.Field>
          <input {...input} className='hidden-text-input' type='text' value={this.props.tagNames} ref={ref => (this.valueRef = ref)} />
        </Form.Field>
        <div className='input-tag'>
          <ul className='input-tag__tags'>
            {tagNames &&
              tagNames.map((tag, idx) => (
                <li key={idx.toString()}>
                  {tag || ''}
                  <button
                    type='button'
                    onClick={() => {
                      this.removeTag(idx);
                    }}
                  >
                    +
                  </button>
                </li>
              ))}
            <li className='input-tag__tags__input'>
              <input type='text' placeholder={placeholder} onKeyDown={this.inputKeyDown} ref={ref => (this.inputRef = ref)} />
            </li>
          </ul>
        </div>
      </>
    );
  }
}

export default connect(mapState, actions)(TagInput);
