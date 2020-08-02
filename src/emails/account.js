const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'joliverestampador@gmail.com',
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    })
}

const sendCancellationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'joliverestampador@gmail.com',
        subject: 'I\'m sorry for cancelling your account',
        text: 'Thank you for being part of the team'
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
}