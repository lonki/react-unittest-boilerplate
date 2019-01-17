import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

export default class FormInputText extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
    placeholder: PropTypes.string,
    inputText: PropTypes.string,
    tooltipText: PropTypes.string,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
  };

  static defaultProps = {
    disabled: false,
    readonly: false,
    placeholder: 'default placeholder',
    inputText: '',
    tooltipText: 'default tooltipText',
    onChange: () => {},
    onFocus: () => {},
    onBlur: () => {},
  };

  constructor(props) {
    super(props);

    this.state = {
      isShowTooltip: false,
      inputText: props.inputText,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { inputText } = this.props;
    const {
      inputText: nextInputText,
    } = nextProps;

    if (inputText !== nextInputText) {
      this.setState({
        inputText: nextInputText,
        isShowTooltip: nextInputText !== '',
      });
    }
  }

  _handleOnChange = (e) => {
    const { onChange } = this.props;
    const text = e.target.value;

    if (onChange && typeof onChange === 'function') {
      onChange(text);
    }

    this.setState({
      inputText: text,
      isShowTooltip: text !== '',
    });
  }

  _handleOnFocus = () => {
    const { onFocus, readonly } = this.props;
    const { inputText } = this.state;

    if (onFocus && typeof onFocus === 'function') {
      onFocus();
    }

    if (!readonly && inputText !== '') {
      this.setState({
        isShowTooltip: true,
      });
    }
  }

  _handleOnBlur = () => {
    const { onBlur } = this.props;
    const { inputText } = this.state;

    if (onBlur && typeof onBlur === 'function') {
      onBlur(inputText);
    }

    this.setState({
      isShowTooltip: false,
    });
  }

  render() {
    const {
      placeholder,
      disabled,
      readonly,
      tooltipText,
    } = this.props;
    const { isShowTooltip, inputText } = this.state;

    return (
      <div className="form-input-box">
        <input
          className="form-input-text"
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readonly}
          value={inputText}
          onChange={this._handleOnChange}
          onFocus={this._handleOnFocus}
          onBlur={this._handleOnBlur}
        />
        <CSSTransition
          in={isShowTooltip}
          timeout={300}
          classNames="form-input-tooltip"
          unmountOnExit
        >
          <div>{tooltipText}</div>
        </CSSTransition>
      </div>
    );
  }
}
