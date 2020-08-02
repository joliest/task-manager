const sendgridApiKey = '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'

const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(sendgridApiKey)
sgMail.send({
    to: 'joliverestampador@gmail.com',
    from: 'joliverestampador@gmail.com',
    subject: 'This is my first email',
    text: 'I hope this will be sent to you.'
}).then(() => {
    console.log('Test')
}).catch((e) => {
    console.log(e)
})

