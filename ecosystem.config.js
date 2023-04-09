module.exports = {
  apps : [{
    name : 'Chat GPT Api',
    script: 'app.js',
    instances : "1",
    exec_mode : "cluster",
    watch: '.',
    env: {
      COMMON_VARIABLE: 'true'
    },
    
    env_development : {
      NODE_ENV: 'development',
    }, 
    env_production : {
      NODE_ENV: 'production'
    },
  }],

  deploy : {
    production : {
      user : 'node',
      host : '212.83.163.1',
      ref  : 'origin/main',
      repo : 'https://github.com/NaimBiswas/chat-gpt-api.git',
      path : '/var/www/production',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
