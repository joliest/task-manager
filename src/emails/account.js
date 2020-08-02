const sendgridApiKey = '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'

const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(sendgridApiKey)

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