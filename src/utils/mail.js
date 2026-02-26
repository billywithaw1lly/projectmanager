import Mailgen from "mailgen";

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

export { emailVerificationMailgenContent, forgotPasswordMailgenContent };
