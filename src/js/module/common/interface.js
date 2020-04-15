/**
 * 该模块主要用于配置系统中的接口、链接等地址
 *
 * 其通过检测url中的顶级域名(如org / net)和端口号来判断系统当前所在的环境(测试版/预发版/正式版)
 * 根据环境的不同将需要改变的地址改变到对应环境中的地址
 *
 * 开发时请咨询后端开发，根据实际情况进行判断环境(环境判断逻辑可修改，!!!请注意)
 *
 */

import utility from 'ct-utility';
var getEnv = function() {
  let env = '';
  const port = location.port;
  const tdl = location.host.split('.').slice(-1)[0].split(':')[0];

  if (tdl === 'net' && port === '1506') {
    env = 'pre';
  } else if (tdl === 'net') {
    env = 'official';
  } else {
    env = 'test';
  }
  return env;
};
var base = {
  common: {
    api1: '/api/api111',
    api2: '/api/api2'
  },
  patchList: {
    api3: '/api/api3'
  },
  patchMonitor: {
    api4: '/api/api4'
  },
  singlePackage: {
    api5: '/api/api5'
  }
};
var Interface = {
  test: utility.base.extend(true, {}, base, {
    common: {
      api1: '/api/api11'
    }
  }),
  pre: utility.base.extend(true, {}, base, {
    common: {
      api1: '/api/api111'
    }
  }),
  official: utility.base.extend(true, {}, base, {
    common: {
      api1: '/api/api111'
    }
  })
};
var env = getEnv();

export default Interface[env];
