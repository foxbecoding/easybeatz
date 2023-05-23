module.exports = {
    apps: [
      {
        name: 'easybeatz-easymoney',
        port: '1111',
        host: '192.168.1.235',
        exec_mode: 'cluster',
        instances: 'max',
        script: './.output/server/index.mjs'
      
      }
    ]
  }