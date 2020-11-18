var express = require("express");
var router = express.Router();
var Mailgen = require("mailgen");
var sendinblue = require("../utils/sendinblue");

/* GET home page. */
router.get("/send-mail", async function (_, res) {
  // Membuat Instance Mailgen
  let mailGenerator = new Mailgen({
    theme: "default",
    product: {
      // Membuat Header dan Footer Email
      name: "COMPANY_NAME",
      link: "COMPANY_WEBSITE",
      copyright: "COMPANY_COPYRIGHT",
    },
  });

  // Membuat Isi Email
  let email = {
    body: {
      greeting: "GREETING",
      name: "NAME",
      intro: "INTRO",
      action: {
        instructions: "INSTRUCTIONS",
        button: {
          color: "#222222",
          text: "CLICK HERE",
          link: `LINK`,
        },
      },
      outro: "OUTRO",
      signature: "SIGNATURE",
    },
  };

  // Generate HTML untuk Email
  let emailBody = await mailGenerator.generate(email);

  // Kirim Email
  sendinblue.sendEmail(
    {
      subject: "SUBJECT",
      sender: { name: "SENDER_NAME", email: "SENDER_EMAIL" },
      to: [{ email: "RECEIVER_EMAIL" }],
      htmlContent: emailBody,
    },
    function (error, result) {
      if (error) console.log(error);
      if (result) console.log(result);
    }
  );

  return res.status(200).send("OK");
});

module.exports = router;
