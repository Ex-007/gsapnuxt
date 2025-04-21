import { defineEventHandler, getQuery } from 'h3';
import axios from 'axios';

export default defineEventHandler(async (event) => {
  try {
    const { reference } = getQuery(event);
    
    if (!reference) {
      return {
        success: false,
        message: 'Payment reference is required',
      };
    }

    // console.log('Verifying payment with reference:', reference);

    // Get API environment variables
    const apiKey = process.env.MONNIFY_API_KEY;
    const secretKey = process.env.MONNIFY_SECRET_KEY;
    const isTestMode = process.env.MONNIFY_TEST_MODE === 'true' || false;

    // Check if credentials are set
    if (!apiKey || !secretKey) {
      // console.error('Missing Monnify credentials');
      return {
        success: false,
        message: 'Payment provider credentials not configured'
      };
    }

    // Set API base URL based on environment
    const baseUrl = isTestMode 
      ? 'https://sandbox.monnify.com/api/v1'
      : 'https://api.monnify.com/api/v1';

    // console.log(`Using Monnify ${isTestMode ? 'test' : 'production'} environment`);

    // Get authentication token
    const authString = Buffer.from(`${apiKey}:${secretKey}`).toString('base64');

    // console.log('Requesting auth token for verification...');
    const tokenRes = await axios.post(
      `${baseUrl}/auth/login`,
      {},
      {
        headers: { Authorization: `Basic ${authString}` },
      }
    );

    const token = tokenRes.data.responseBody.accessToken;
    // console.log('Auth token received successfully', token);

    // Query transaction by reference
    // console.log('Querying transaction status...');

    const encodedReference = encodeURIComponent(reference);
    // console.log(encodedReference)
    const verifyRes = await axios.get(
      // Note: Updated endpoint to use v1 instead of v2 to match the makePayment endpoint
      `https://sandbox.monnify.com/api/v2/merchant/transactions/query?paymentReference=${encodedReference}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    // console.log(verifyRes)

    // console.log('Payment verification successful');
    return verifyRes.data;
  } catch (error) {
    // Enhanced error handling
    const errorData = error.response?.data;
    // console.error('Payment verification error:', errorData || error.message);
    
    if (error.response?.status === 404) {
      // console.error('Transaction not found. The payment reference may be invalid or the transaction may not exist.');
      return {
        success: false,
        message: 'Transaction not found',
        error: 'The payment reference is invalid or the transaction does not exist.'
      };
    }
    
    if (error.response?.status === 401 || 
        (errorData && errorData.responseMessage && 
         errorData.responseMessage.includes('authentication'))) {
      // console.error('Authentication failed. Check your API credentials and environment settings.');
    }
    
    return {
      success: false,
      message: 'Failed to verify payment',
      error: errorData || error.message
    };
  }
});