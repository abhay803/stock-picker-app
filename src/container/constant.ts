export const BASE_URL = 'https://www.alphavantage.co/query'
const API_KEY = 'demo'

const serviceName = {
  overview: 'OVERVIEW',
  symbolSearch: 'SYMBOL_SEARCH',
}

export const DEBOUNCE_TIME = 500

export const overviewOptions = {
  params: {
    apikey: API_KEY,
    function: serviceName.overview,
    symbol: '',
  },
}

export const searchOptions = {
  params: {
    apikey: API_KEY,
    function: serviceName.symbolSearch,
    keywords: '',
  },
}
