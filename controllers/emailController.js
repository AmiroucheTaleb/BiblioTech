import nodemailer from "nodemailer";

export async function sendEmail(recipient, text) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "wati.boss45@gmail.com",
      pass: "lwopvaosvoykaswg",
    },
  });
  // send mail with defined transport object
  let info = await transporter.sendMail(
    {
      from: "wati.boss45@gmail.com", // sender address
      to: recipient, // list of receivers
      subject: "Bibliotech", // Subject line
      text: text,
    },
    (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("email sent : " + info.response);
      }
    }
  );
}
