import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store, persistor } from './Store/index';
import { PersistGate } from 'redux-persist/integration/react'
import reportWebVitals from './reportWebVitals';
import Amplify, { Auth } from "aws-amplify";
import config from "./config";

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.devCognito.REGION,
    userPoolId: config.devCognito.USER_POOL_ID,
    //identityPoolId: config.devCognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.devCognito.APP_CLIENT_ID
  },
  Storage: {
		region: config.s3.REGION,
		bucket: config.s3.BUCKET,
		identityPoolId: config.cognito.IDENTITY_POOL_ID
  },
  API: {
		endpoints: [
      {
				name: 'testApi',
				endpoint: config.devApiGateway.URL,
				region: config.devApiGateway.REGION,
        // custom_header: async () => {
        //   return { Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}` }
        // }
			},
		]
	},
  aws_appsync_region: "eu-west-1", // Stack region
  aws_appsync_graphqlEndpoint: "https://sa7zircwubar3jbpmxj7raj4au.appsync-api.eu-west-1.amazonaws.com/graphql", // AWS AppSync endpoint
  aws_appsync_authenticationType: "API_KEY", //Primary AWS AppSync authentication type
  aws_appsync_apiKey: "da2-rwigxpo5rvfe7kpwhr7pgjztli" // AppSync API Key
});

// Checkin - API gateway
// 

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
    </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
