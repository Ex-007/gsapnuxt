import { defineEventHandler, readBody } from 'h3'
import axios from 'axios'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { name, email, amount, transactionRef, phoneNumber } = body

    // Validate required fields
    if (!name || !email || !amount || !transactionRef) {
      return {
        success: false,
        message: 'Missing required payment fields',
        missingFields: !name ? 'name' : !email ? 'email' : !amount ? 'amount' : 'transactionRef'
      }
    }

    console.log('Payment request received:', { name, email, amount, transactionRef })

    // Get API environment variables
    const apiKey = process.env.MONNIFY_API_KEY
    const secretKey = process.env.MONNIFY_SECRET_KEY
    const contractCode = process.env.MONNIFY_CONTRACT_CODE
    const isTestMode = process.env.MONNIFY_TEST_MODE === 'true' || false

    // Check if credentials are set
    if (!apiKey || !secretKey || !contractCode) {
      console.error('Missing Monnify credentials:', { 
        apiKey: !!apiKey, 
        secretKey: !!secretKey, 
        contractCode: !!contractCode 
      })
      return {
        success: false,
        message: 'Payment provider credentials not configured'
      }
    }

    // Log the contract code (but mask most of it for security)
    const maskedContract = contractCode.substring(0, 4) + '...' + 
                          contractCode.substring(contractCode.length - 4)
    console.log(`Using contract code: ${maskedContract}`)

    // Set API base URL based on environment
    const baseUrl = isTestMode 
      ? 'https://sandbox.monnify.com/api/v1'
      : 'https://api.monnify.com/api/v1'

    console.log(`Using Monnify ${isTestMode ? 'test' : 'production'} environment`)

    // Get authentication token
    const authString = Buffer.from(`${apiKey}:${secretKey}`).toString('base64')

    console.log('Requesting auth token...')
    const authRes = await axios.post(
      `${baseUrl}/auth/login`,
      {},
      {
        headers: { Authorization: `Basic ${authString}` },
      }
    )

    const token = authRes.data.responseBody.accessToken
    console.log('Auth token received successfully')

    // Format payment data according to Monnify's API requirements
    const paymentData = {
      amount: Number(amount),
      customerName: name,
      customerEmail: email,
      paymentReference: transactionRef,
      paymentDescription: 'Membership Registration Form',
      currencyCode: 'NGN',
      contractCode: contractCode,
      redirectUrl: 'http://localhost:3000/payment-success',
      paymentMethods: ['CARD', 'ACCOUNT_TRANSFER', 'USSD']
    }

    console.log('Sending payment request to Monnify...')

    const initRes = await axios.post(
      `${baseUrl}/merchant/transactions/init-transaction`,
      paymentData,
      {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      }
    )

    console.log('Payment initialized successfully')
    console.log("Payment initialized. Monnify ref:", initRes.data);

    return initRes.data
  } catch (error) {
    // Enhanced error handling
    const errorData = error.response?.data
    console.error('Payment initialization error:', errorData || error.message)
    
    // Contract-specific error
    if (errorData && errorData.responseMessage && 
        errorData.responseMessage.includes('contract')) {
      console.error('Contract error. Please check your contract code and ensure it exists in the ' + 
        (process.env.MONNIFY_TEST_MODE === 'true' ? 'sandbox' : 'production') + ' environment.')
    }
    
    return {
      success: false,
      message: 'Failed to initialize payment',
      error: errorData || error.message
    }
  }
})