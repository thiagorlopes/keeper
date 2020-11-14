module.exports = function(token, user, done){
    const smtpTransporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.EMAIL_ADRESS,
            pass: process.env.EMAIL_PASSWORD
        }
    });


    const mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: req.body.email, 
        subject: "Password Reset",
        html: `<h2>Hi, ${req.body.username}\n</h2>`
        `<h3>You recently requested to reset your password for your Keeper account.\n
        Click the link below to reset it.\n\n 

        <a href="http://${req.headers.host}/reset/${token}">Reset password</a>\n\n

        If you did not request a password reset, please ignore this email or reply to let us know.\n
        This password reset is only valid for the next hour.\n\n 

        Thanks,\n
        Thiago Rodrigues\n
        <hr />

        <h4>If you are having trouble clicking the password reset link, copy and paste the URL below
        into your browser</h4>
        http://${req.headers.host}/reset/${token}`
    }; 

    smtpTransporter.sendMail(mailOptions, function(err, req){
        console.log("mail sent");
        console.log ("success", "An e-mail has been sent to " + user.email + " with further instructions to reset password.");
        done(err, "done");
    });
}