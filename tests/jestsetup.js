import { shallow, render, mount } from 'enzyme'
import 'babel-polyfill' // https://github.com/facebook/jest/issues/3126#issuecomment-345949328
global.shallow = shallow
global.render = render
global.mount = mount
global.__SERVER_HOST__ = 'localhost'
global.__CORS_PROXY_PORT__ = 3001
