import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// add create-react-app test overrides
configure({ adapter: new Adapter() });
