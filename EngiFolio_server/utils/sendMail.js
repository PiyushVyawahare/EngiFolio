const mailjet = require ('node-mailjet');

const transporter = mailjet.connect(
    '02b9d8a25662b14707fb5b9bc8d85d75', 
    'da986939cf876267dcbda799c8b4eccb'
)

module.exports = function sendMail(email, title, otp, msg, callback){

    var url = "<p><b>Welcome to EngiFolio,</b><p>Your OTP to "+msg+" is :"+otp+"</p></p>"

    const request = transporter
    .post("send", {'version': 'v3.1'})
    .request({
    "Messages":[
        {
        "From": {
            "Email": "vyawaharepb@gmail.com",
            "Name": "EngiFolio"
        },
        "To": [
            {
            "Email": email,
            "Name": "Piyush"
            }
        ],
        "Subject": title,
        "TextPart": "",
        "HTMLPart": url,
        "CustomID": "AppGettingStartedTest"
        }
    ]
    })
    request
    .then((result) => {
        console.log(result.body);
        callback(null);
    })
    .catch((err) => {
        console.log(err.statusCode);
        callback("error occured");
    })
}