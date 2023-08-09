export const BASE_URL = 'https://www.alphavantage.co/query'
const API_KEY = '9OSSNYSEXF05IRM2'

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
