import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {ApolloWrapper} from './apollo/client'
import './index.css'
import App from './App.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApolloWrapper>
      <App />
    </ApolloWrapper>
  </StrictMode>,
)
