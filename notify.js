var app = require('express')();
//var server = require('http').createServer(app);
//var io = require('socket.io').listen(server);

/* mail */
var nodemailer = require("nodemailer");
var smtpTransport = nodemailer.createTransport("SMTP", {
    service: "Gmail",
    auth: {
	user: "email@gmail.com",  // input valid email
	pass: "password"          // input password
    }
});

/* timing */
var cronJob = require('cron').CronJob;

//check for matches every day at 4 am
var job = new cronJob('* * 04 * * *', function() {
    console.log('tick');
    checkMatch();
job.start();

function checkMatch()
{
    /* TODO */
    // access firebase and check for matches in food preferences
    // and menus

    //for(go through each user) {
	//var match = false;
	//var data = new Object();
	//check for matches
	//if(match)
	    // data is in format
	    // {user:'netid', foods:['list', 'of, 'matches'], loc:'dhall'}
	    notify(data)});
}

function notify(data) {
    var date = new Date();
    var today = (date.getMonth()+1) + '/' + date.getDate();
    var recipient = data.user + "@princeton.edu";
    var note = "Today is a good day for " + data.loc;
    note += "!\nPreferred foods available: ";
    for(var i=0; i<data.foods.length-1; i++)
	note += data.foods[i] + ", ";
    note += data.foods[data.foods.length-1];
    // setup email data with unicode
    var mailOptions = {
	from: "Menu <menu@gmail.com>",
	to: recipient,
	subject: "Menu match for " + today,
	generateTextFromHTML:"true",
	text: note
    }
    // send mail with defined transport object
    smtpTransport.sendMail(mailOptions, function(error, response) {
	if(error) {
	    console.log(error);
	}else{
	    console.log("Message sent: " + response.message);
	}

	//shut down connection pool
	smtpTransport.close();
    });
    console.log('success');
}
