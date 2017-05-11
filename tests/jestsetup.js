import { shallow, render, mount } from 'enzyme'
global.shallow = shallow
global.render = render
global.mount = mount
global.__SERVER_HOST__ = 'localhost'
global.__CORS_PROXY_PORT__ = 3001
