/**
 * 
 * @param {*} options 
 * @returns 
 * Interceptor for the request to modify.
 * Might change in the future as per need with new API integration
 */
 const awsRequestInterceptor = (options = {}) => {
    let headerOptions;
    // If header is passed then set it otherwise the default one will get applied.

    headerOptions = options.header ? options.header : { 
        'Content-Type': 'application/json', 'x-api-key': 'QZo8B6GAd08XEmW27AEcp5ZVVwKVg1T14cUSh4if' 
    };
    // If response type is passed then set it otherwise the default one will get applied.
    const responseType = options.responseType ? options.responseType : 'json';

    const httpParams = options.params ? options.params : {};

    const httpOptions = {
        headers: headerOptions,
        responseType: responseType,
        // queryStringParameters
        params: httpParams,
        timeout: 30000, // Default timeout 30seconds  
    };

    // OPTIONAL (return the entire response object instead of only response.data)
    if (options.observe) {
        httpOptions.response = true;
    }

    httpOptions.body = (options.body) ? options.body : {}

    // Add User ID as TOKEN
    /*  if(httpOptions.body && authenticationService.userID) {
         httpOptions.body = {
             ...httpOptions.body,
             id: authenticationService.userID,
         }
     } */

    return httpOptions;
}

export default awsRequestInterceptor;