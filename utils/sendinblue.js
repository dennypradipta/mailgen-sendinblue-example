const SendInBlue = require("sib-api-v3-sdk");

// Inisiasi
const defaultClient = SendInBlue.ApiClient.instance;
const apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = "API_KEY_GOES_HERE";

// Membuat Instance untuk mengirim Email
const APIInstance = new SendInBlue.TransactionalEmailsApi();
const EmailInstance = new SendInBlue.SendSmtpEmail();

// Fungsi Mengirim Email
function sendEmail(data, callback) {
  EmailInstance.subject = data.subject;
  EmailInstance.sender = data.sender;
  EmailInstance.to = data.to;
  EmailInstance.htmlContent = data.htmlContent;
  APIInstance.sendTransacEmail(EmailInstance).then(
    function (result) {
      callback(null, JSON.stringify(result));
    },
    function (error) {
      callback(error, null);
    }
  );
}

module.exports = { sendEmail };
