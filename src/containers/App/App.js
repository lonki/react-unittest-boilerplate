import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setSectionViewPort } from 'redux/modules/app';
import { login } from 'redux/modules/auth';
import FormInputText from 'components/FormInputText/FormInputText';

@connect(
  (state) => {
    const { app } = state;

    return {
      viewPort: app.get('viewPort'),
    };
  }, {
    setSectionViewPort,
    login,
  },
)
class App extends React.PureComponent {
  static propTypes = {
    viewPort: PropTypes.number.isRequired,
    setSectionViewPort: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
  };

  reduxButtonOnClick = () => {
    this.props.setSectionViewPort(1000);
  }

  sagasButtonOnClick = () => {
    this.props.login('Tim', '123');
  }

  render() {
    const { viewPort } = this.props;

    return (
      <React.Fragment>
        <section>
          <p>Component Example</p>
          <FormInputText
            placeholder="Enter some text"
            inputText=""
            onChange={() => {}}
            onFocus={() => {}}
            onBlur={() => {}}
          />
        </section>
        <hr />
        <section>
          <p>Redux Example</p>
          <button type="button" onClick={this.reduxButtonOnClick}>start</button>
          <div>{viewPort}</div>
        </section>
        <hr />
        <section>
          <p>Redux Sagas Example</p>
          <FormInputText
            placeholder="Account"
            inputText=""
            onChange={() => {}}
            onFocus={() => {}}
            onBlur={() => {}}
          />
          <FormInputText
            placeholder="Password"
            inputText=""
            onChange={() => {}}
            onFocus={() => {}}
            onBlur={() => {}}
          />
          <button type="button" onClick={this.sagasButtonOnClick}>Login</button>
        </section>
        <hr />
      </React.Fragment>
    );
  }
}

export default App;
