module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['last 5 versions', 'ie >= 11'],
          node: 'current'
        },
        useBuiltIns: 'usage',
        corejs: '3.38.0'
      }
    ],
    '@babel/preset-typescript',
    '@babel/preset-react'
  ]
};
