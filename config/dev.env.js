'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
	NODE_ENV: '"development"',
    APP_NAME: '"Member Monitoring"',
    APP_VERSION: '"dev 101"',
    APP_URL: '"http://localhost:8000"',
	APP_API_URL: '"https://membership-api.kapitan.ph"',
	APP_WEB_URL: '"https://www.mayap.ph"',
    APP_API_VERSION: '"api"',
    APP_API_USER: '"admin"',
    APP_COOKIE_URL: '"localhost"',
    APP_ACCESS_TOKEN: '"mmbrshp_ccsstkn"',
    APP_REFRESH_TOKEN: '"mmbrshp_rfrshtkn"',
    APP_SOCKET_PORT: '"6001"',
    APP_SOCKET_CONNECTION: true,
    APP_BASE64: true,
    APP_DEBUG: true,
    APP_BENEFICIARY_PLURAL_NAME: '"Beneficiaries"',
    APP_BENEFICIARY_SINGULAR_NAME: '"Beneficiary"',
})