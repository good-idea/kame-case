// @flow
const path = require('path')

require('dotenv').config()

const { PORT, STOREFRONT_ACCESS_TOKEN, SHOP_NAME, SANITY_PROJECT_ID, SANITY_DATASET } = process.env

const config = {
	PORT,
	STOREFRONT_ACCESS_TOKEN,
	SHOP_NAME,
	SANITY_PROJECT_ID,
	SANITY_DATASET,
}

module.exports = config
