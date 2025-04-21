import { Resend } from 'resend';

export default defineEventHandler(async (event) => {
    // Explicitly check for the environment variable
    const resendKey = process.env.RESEND_KEY;
    if (!resendKey) {
        console.error('RESEND_KEY environment variable is not set');
        return { error: 'Missing API key configuration' };
    }
    
    const resend = new Resend(resendKey);
    
    try {
        const body = await readBody(event);
        const { to, from, subject, text } = body;
    
        if (!to || !from || !subject || !text) {
            return {
                error: 'Missing required fields: to, from, subject, and text are all required.',
            };
        }
    
        console.log('Sending email with data:', { to, from, subject });
        
        const data = await resend.emails.send({
            from,
            to: Array.isArray(to) ? to : [to],
            subject,
            text,
        });
        
        console.log('Resend API response:', data);
        return data;
    } catch (error) {
        console.error('Detailed error:', error);
        return { 
            error: error.message || 'An error occurred while sending the email.',
            details: error.toString()
        };
    }
});