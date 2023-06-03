import { ColorModeScript } from '@chakra-ui/react'
import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { App } from './App'
import reportWebVitals from './reportWebVitals'
import * as serviceWorker from './serviceWorker'
import {
  createClient,
  Provider,
  subscriptionExchange,
  defaultExchanges
} from 'urql'
import { createClient as createWSClient } from 'graphql-ws'

import './styles.css'
import './style-sunset.css'

const isProd = process.env.NODE_ENV === 'production'
const graphqlPath = '/graphql';
const URL = process.env.REACT_APP_API_PRODUCTION
const localhost = process.env.REACT_APP_API_LOCALHOST

const serverURL = isProd ? `https://${URL}${graphqlPath}` : `http://${localhost}${graphqlPath}`
const wsClient = createWSClient({
  url: isProd ? `wss://${URL}${graphqlPath}` : `ws://${localhost}${graphqlPath}`
})

const client = createClient({
  url:serverURL,
  exchanges: [
    ...defaultExchanges,
    subscriptionExchange({
      forwardSubscription: (operation) => ({
        subscribe: (sink: any) => ({
          unsubscribe: wsClient.subscribe(operation, sink)
        })
      })
    })
  ]
})

const container = document.getElementById('root')
if (!container) throw new Error('Failed to find the root element')
const root = ReactDOM.createRoot(container)

root.render(
  <React.StrictMode>
    <ColorModeScript />
    <Provider value={client}>
      <App />
    </Provider>
  </React.StrictMode>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
