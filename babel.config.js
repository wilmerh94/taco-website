const alias = require('./importAliases');

[
  // .. other plugins
  '@babel/plugin-syntax-jsx'[
    // start here
    ('module-resolver',
    {
      root: ['./src'],
      alias,
      extensions: ['.jsx', 'js']
    })
  ]
  // end here
];
