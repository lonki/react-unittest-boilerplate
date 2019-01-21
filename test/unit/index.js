import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

// require all test files (files that ends with .spec.js)
var testsContext = require.context('./specs', true, /\.spec$/);
testsContext.keys().forEach(testsContext);
