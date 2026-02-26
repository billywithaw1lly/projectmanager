import Mailgen from "mailgen";
import nodemailer from "nodemailer"

const sendEmail = async(optios) => {
    new Mailgen({
        theme: "default",
        product: {
            name: "Task Manager",
            link: "https://taskmanagerlink.com"
        }
    })

    const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent)
    const emailtml  = mailGenerator.generate(options.mailgenContent)

    const tranporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_SMTP_HOST,
      port: process.env.MAILTRAP_SMTP_PORT,
      auth: {
        user: process.env.MAILTRAP_SMTP_USER,
        pass: process.env.MAILTRAP_SMTP_PASS
      }
    });

    const mail = {
        from: "mail@example.com",//replace this
        to: options.email,
        subject:options.subject,
        text: emailTextual,
        html: emailHtml
    }

    try{
        await transpoter.sendMail(mail)
    } catch(error){
        console.error("email service failed", error);
    }
}

const emailVerificationMailgenContent = (username, verificationUrl) => {
  return {
    body: {
      name: username,
      intro: "welcome to our App! We're excited to have you on board",
      actions: {
        instructions:
          "to verify your email please click on the following button",
        buttons: {
          color: "#22BC66",
          text: "verify your email",
          link: verificationUrl,
        },
      },

      outro:
        "Need help or have questions ? Just reply to this email we would love to help",
    },
  };
};

const forgotPasswordMailgenContent = (username, passwordResetUrl) => {
  return {
    body: {
      name: username,
      intro: "we got a request to reset the password of your account",
      actions: {
        instructions:
          "to reset the password click on the following button or link",
        buttons: {
          color: "#22BC66",
          text: "reset password",
          link: passwordResetUrl,
        },
      },

      outro:
        "Need help or have questions ? Just reply to this email we would love to help",
    },
  };
};

export { emailVerificationMailgenContent,
    forgotPasswordMailgenContent,
    sendEmail
};
