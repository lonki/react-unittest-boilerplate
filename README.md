# react-unittest-boilerplate

We can shorten the time necessary to create unit tests by using **react-unittest-boilerplate**.


## Tech Stack

Here's a curated list of packages that you should be at least familiar with before your project. However, the best way to see a complete list of the dependencies is to check [package.json](https://github.com/lonki/react-unittest-boilerplate/blob/master/package.json).

### Core

- [ ] [React](https://facebook.github.io/react/)
- [ ] [React Router](https://github.com/ReactTraining/react-router)
- [ ] [Redux](http://redux.js.org/)
- [ ] [Redux Saga](https://redux-saga.github.io/redux-saga/)
- [ ] [ImmutableJS](https://facebook.github.io/immutable-js/)

### Unit Testing

- [ ] [Karma](https://karma-runner.github.io/3.0/index.html)
- [ ] [Enzyme](http://airbnb.io/enzyme/)
- [ ] [Jasmine](https://jasmine.github.io/)

### Linting

- [ ] [ESLint](http://eslint.org/)



## Command Line Commands

### Initialization

```Shell
// NPM
npm install

or

// Yarn
yarn install
```

### Dev server
```Shell
yarn run local
```

### Unit testing
```Shell
// Single unit test (for CI)
yarn run unit

// Dev unit test (keep watch)
yarn run unit-dev
```

### Coverage testing
```Shell
yarn run unit-coverage
```



## Unit testing

Unit testing is the practice of testing the smallest possible _units_ of our
code, functions. We run our tests and automatically verify that our functions
do the thing we expect them to do. We assert that, given a set of inputs, our
functions return the proper values and handle problems.

This boilerplate uses the [Karma](https://karma-runner.github.io/3.0/index.html) and [Jasmine](https://jasmine.github.io/) test
framework to run tests and make assertions. This library makes writing tests as easy as speaking - you
`describe` a unit of your code and `expect` `it` to do the correct thing.

## Installing Karma and plugins

- [Karma](https://karma-runner.github.io/3.0/index.html) Test runner.
- [karma-chrome-launcher](https://github.com/karma-runner/karma-chrome-launcher) Launcher for Chrome and Chrome Canary.
- [karma-jasmine](https://github.com/karma-runner/karma-jasmine) Adapter for Jasmine testing framework.
- [karma-sourcemap-loader](https://github.com/demerzel3/karma-sourcemap-loader) Preprocessor that locates and loads existing source maps.
- [karma-webpack](https://github.com/webpack-contrib/karma-webpack) Use webpack to preprocess files in karma.
- [karma-coverage](https://github.com/karma-runner/karma-coverage) Generate code coverage using Istanbul.
- [circular-dependency-plugin](https://github.com/aackerman/circular-dependency-plugin) Detect circular dependencies in modules compiled with Webpack.
- [enzyme](https://github.com/airbnb/enzyme/) and [enzyme-adapter-react-16](https://github.com/airbnb/enzyme/) JavaScript Testing utilities for React ^16.4.0-0.

```Shell
yarn add karma karma-chrome-launcher karma-jasmine karma-sourcemap-loader karma-webpack karma-coverage circular-dependency-plugin enzyme enzyme-adapter-react-16 --dev
```

## Setting config

- [Karma config](https://github.com/lonki/react-unittest-boilerplate/blob/master/test/unit/karma.base.js)
```Shell
module.exports = {
  browsers: ['ChromeHeadless'],
  frameworks: ['jasmine'],
  colors: true,
  autoWatch: true,
  files: [
    './index.js',
  ],
  preprocessors: {
    './index.js': ['webpack', 'sourcemap'],
  },
  reporters: ['spec'],
  specReporter: {
    maxLogLines: 2,
    suppressErrorSummary: true,
    suppressPassed: true,
    suppressSkipped: true,
  },
  webpack: webpackConfig,
  webpackMiddleware: {
    noInfo: true,
  },
  customLaunchers: {
    ChromeHeadless: {
      base: 'Chrome',
      flags: [
        '--headless',
        '--remote-debugging-port=9222',
      ],
    },
  },
};
```

- [karma-coverage](https://github.com/lonki/react-unittest-boilerplate/blob/master/test/unit/karma.coverage.conf.js)
```Shell
module.exports = function (config) {
  karmaConfig.reporters = ['spec', 'coverage'];
  karmaConfig.coverageReporter = {
    type: 'html',
    dir: 'coverage/',
  };

  config.set(karmaConfig);
};
```

- [Webpack config](https://github.com/lonki/react-unittest-boilerplate/blob/master/webpack/config.test.js)
```Shell
module.exports = {
  mode: 'development',
  devtool: 'inline-eval-cheap-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  resolveLoader: {
    moduleExtensions: ['-loader'],
  },
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, '../src'),
    ],
    extensions: ['.js'],
    alias: {
      src: path.resolve(projectRoot, 'src'),
      test: path.resolve(projectRoot, 'test'),
    },
  },
  // enzyme 必需的資訊
  externals: {
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': 'window',
  },

  plugins: [
    // 檢查是否有循環依賴
    new CircularDependencyPlugin({
      exclude: /node_modules/,
      failOnError: true,
    }),
  ],
};
```

- [Enzyme config](https://github.com/lonki/react-unittest-boilerplate/blob/master/test/unit/index.js)
```Shell
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
```


## Testing Redux Applications

Let's see what testing the actions and the reducer would look like.

- [Async Action Creators](#async-action-creators)
- [Reducers](#reducers)

### Async Action Creators
[example](https://github.com/lonki/react-unittest-boilerplate/blob/master/src/redux/modules/app.js)
```Shell
const initialState = fromJS({
  getFakeApiPedding: false,
  getFakeApiSuc: false,
  getFakeApiErr: false,
});

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case cons.GET_FAKE_API_PENDING: {
      return state.merge({
        getFakeApiPedding: true,
        getFakeApiSuc: false,
        getFakeApiErr: false,
      });
    }
    case cons.GET_FAKE_API_FULFILLED: {
      return state.merge({
        getFakeApiPedding: false,
        getFakeApiSuc: true,
        getFakeApiErr: false,
      });
    }
    case cons.GET_FAKE_API_REJECTED: {
      return state.merge({
        getFakeApiPedding: false,
        getFakeApiSuc: false,
        getFakeApiErr: true,
      });
    }
    default:
      return state;
  }
}

export function getFakeApi(email) {
  const url = '/fakeApi';
  return {
    type: cons.GET_FAKE_API,
    payload: {
      promise: axios({
        url,
      }),
    },
  };
}
```

[can be tested like:](https://github.com/lonki/react-unittest-boilerplate/blob/master/test/unit/specs/redux/modules/app.spec.js)

```Shell
import {
  getFakeApi,
} from 'src/redux/modules/app';

describe('redux/modules/app', () => {
  const mock = new MockAdapter(axios);

  afterEach(() => {
    mock.reset();
  });

  it('creates GET_FAKE_API_FULFILLED when fetching fakeApi has been done', () => {
    const store = mockStore({});
    const respCode = 200;
    const data = {
      people: ['Tim'],
    };

    mock.onGet('/fakeApi').reply(respCode, data);

    return store.dispatch(getFakeApi()).then(() => {
      const actions = store.getActions();

      expect(actions[0].type).toEqual(cons.GET_FAKE_API_PENDING);
      expect(actions[1].type).toEqual(cons.GET_FAKE_API_FULFILLED);
      expect(actions[1].payload.status).toEqual(respCode);
      expect(actions[1].payload.data).toEqual(data);
    });
  });
});
```


### Reducers
[example](https://github.com/lonki/react-unittest-boilerplate/blob/master/src/redux/modules/app.js)

```Shell
// Actions
export function setSectionViewPort(viewPort) {
  return {
    type: cons.SET_SECTION_VIEWPORT,
    viewPort,
  };
}

// Reducer
const initialState = fromJS({
  viewPort: 0,
});
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case cons.SET_SECTION_VIEWPORT: {
      const { viewPort } = action;

      return state.merge({
        viewPort,
      });
    }
  }
}
```

[can be tested like:](https://github.com/lonki/react-unittest-boilerplate/blob/master/test/unit/specs/redux/modules/app.spec.js)
```Shell
import reducer, {
  setSectionViewPort,
} from 'src/redux/modules/app';

describe('redux/modules/app', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(fromJS({
      viewPort: 0,
    }));
  });

  it('should handle SET_SECTION_VIEWPORT', () => {
    const expectedAction = {
      type: types.SET_SECTION_VIEWPORT,
      viewPort: 200,
    }
    const result = reducer(fromJS({}), expectedAction);

    expect(setSectionViewPort(200)).toEqual(expectedAction);
    expect(result.get('viewPort')).toEqual(200);
  });
});
```


## Testing Redux Sagas

Let's see what testing the redux-sagas would look like.

[example](https://github.com/lonki/react-unittest-boilerplate/blob/master/src/redux/sagas/auth.js)
```Shell
export function* login(account, password) {
  const tokenResp = yield call(fakeGetToken, account, password);
  const infomationResp = yield call(fakeGetInfomation, tokenResp.token);
  return {
    token: tokenResp.token,
    infomation: infomationResp.infomation,
  };
}

export function* watchLogin() {
  yield takeEvery(authActions.SAGA_LOGIN, function* ({ account, password } = {}) {
    try {
      yield put({ type: authActions.LOGIN });

      const memberData = yield call(login, account, password);

      yield put({ type: authActions.LOGIN_SUCCESS, memberData });
    } catch (error) {
      yield put({ type: authActions.LOGIN_FAIL });
    }
  });
}

export default [
  watchLogin,
];
```

[can be tested like:](https://github.com/lonki/react-unittest-boilerplate/blob/master/test/unit/specs/redux/sagas/auth.spec.js)
```Shell
const FAKE_GET_TOKEN_DATA = {
  result: 'success',
  token: 'abc',
};

const FAKE_GET_IMFORMATION_DATA = {
  result: 'success',
  infomation: {
    height: 170,
    weight: 60,
  },
};

describe('redux/sagas/auth', () => {
  describe('reducer', () => {

    let state = null;

    beforeEach(() => {
      state = reducer();
    });

    it('get fake member data by calling function login', () => {
      const generator = login('account', 'password');
      generator.next();

      let result = generator.next(FAKE_GET_TOKEN_DATA).value;

      result = generator.next(FAKE_GET_IMFORMATION_DATA);

      const {
        token,
        infomation,
      } = result.value

      expect(token).toBe(FAKE_GET_TOKEN_DATA.token);
      expect(infomation.height).toBe(FAKE_GET_IMFORMATION_DATA.infomation.height);
      expect(infomation.weight).toBe(FAKE_GET_IMFORMATION_DATA.infomation.weight);
      expect(result.done).toBe(true);
    });
  });
});
```



## Testing React Component

This boilerplate uses the [Enzyme](https://github.com/airbnb/enzyme/) to test utility for React that makes it easier to assert, manipulate, and traverse your React Components' output.

First, let's first understand what the Enzyme's rendering!

[Enzyme Render Diffs](https://github.com/lonki/react-unittest-boilerplate/blob/master/enzyme_render_diffs.md)


Let's see what testing the component would look like.

[example](https://github.com/lonki/react-unittest-boilerplate/blob/master/src/components/FormInputText/FormInputText.js)

```Shell
export default class FormInputText extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
    placeholder: PropTypes.string,
    defaultInputText: PropTypes.string,
    tooltipText: PropTypes.string,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
  };

  static defaultProps = {
    disabled: false,
    readonly: false,
    placeholder: 'default placeholder',
    defaultInputText: '',
    tooltipText: 'default tooltipText',
    onChange: () => {},
    onFocus: () => {},
    onBlur: () => {},
  };

  constructor(props) {
    super(props);

    this.state = {
      isShowTooltip: false,
      inputText: props.defaultInputText,
    };
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
          <span className="form-input-tooltip-text">{tooltipText}</span>
        </CSSTransition>
      </div>
    );
  }
}
```

[can be tested like:](https://github.com/lonki/react-unittest-boilerplate/blob/master/test/unit/specs/components/FormInputText.spec.js)
```Shell
describe('<FormInputText />', () => {
  let comp = null;
  let inst = null;
  let input = null;
  let props = {};

  beforeEach(() => {
    props = {
      onChange: jasmine.createSpy('onChange').and.callThrough(),
      onFocus: jasmine.createSpy('onFocus').and.callThrough(),
      onBlur: jasmine.createSpy('onBlur').and.callThrough(),
    };

    comp = mount(
      <FormInputText {...props} />
    );

    inst = comp.instance();

    input = comp.find('input');
  });


  it('測試prop是否有被正確塞入', () => {
    comp.setProps({
      disabled: true,
      readonly: true,
      placeholder: 'test placeholder',
      defaultInputText: 'test defaultInputText',
      tooltipText: 'test tooltipText',
    });

    expect(comp.prop('disabled')).toBe(true);
    expect(comp.prop('readonly')).toBe(true);
    expect(comp.prop('placeholder')).toBe('test placeholder');
    expect(comp.prop('defaultInputText')).toBe('test defaultInputText');
    expect(comp.prop('tooltipText')).toBe('test tooltipText');
  });

  it('測試onChange, onFocus, onBlur是否有被呼叫到', () => {
    input.simulate('change', { target: { value: 'newValue' }});
    expect(props.onChange).toHaveBeenCalledTimes(1);

    input.simulate('focus');
    expect(props.onFocus).toHaveBeenCalledTimes(1);

    input.simulate('blur');
    expect(props.onBlur).toHaveBeenCalledTimes(1);
  });

  it('onChange時，如果input Text不是空值，會出現tooltip', () => {
    comp.setProps({
      tooltipText: 'show tooltip',
    });

    input.simulate('change', { target: { value: 'not empty' }});
    expect(comp.state().isShowTooltip).toBe(true);
    expect(comp.find('input').props().value).toBe('not empty');
    expect(comp.find('span').text()).toBe('show tooltip');
    
    input.simulate('change', { target: { value: '' }});
    expect(comp.state().isShowTooltip).toBe(false);
    expect(comp.find('input').props().value).toBe('');
  });
});
```

