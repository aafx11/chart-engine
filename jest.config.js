module.exports = {
  testMatch: ['**/__tests__/**/*.spec.ts'], // 只测试后缀为 .spec.ts 的文件
  transform: {
    '^.+\\.jsx?$': 'babel-jest', //这个是jest的默认配置
    '^.+\\.ts?$': 'ts-jest', //typescript转换
  },
  runner: 'jest-electron/runner', // 指定测试的 runner
  testEnvironment: 'jest-electron/environment' //  制定测试的环境
}
