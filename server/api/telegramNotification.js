import axios from "axios"
export default defineEventHandler(async(event) => {
    const TEL_BOT_TOKEN = process.env.TEL_BOT_TOKEN
    const TEL_CHATID = process.env.TEL_CHATID

    const body = await readBody(event)

    console.log(JSON.stringify(body))

    // CHECK IF THE KEYS ARE SET
    if(!TEL_BOT_TOKEN || !TEL_CHATID){
        console.log('Tokens are missing')
        return
    }
    console.log('about to send Telegram Message')

    try {
        const response = await axios.post(
            `https://api.telegram.org/bot${TEL_BOT_TOKEN}/sendMessage`,
            {
                chat_id: TEL_CHATID,
                text: body.message
            },
            {
                headers: { 'Content-Type': 'application/json' }
            }
        )
        
        console.log(response.data)
        return {
            success: true,
            data: response.data,
          }
    } catch (err) {
        console.log(err.message)
        return {
            success: false,
            error: err.response?.data?.message || err.message || 'Telegram sending failed',
          }
    }

})