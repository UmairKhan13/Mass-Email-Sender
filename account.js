const companyAndEmails = require('./excelReader')
const {sendEmails,loadEmails,sendBccEmails}= require('./sendEmail')

for (let i=0;i<companyAndEmails.length;i++){
    if(companyAndEmails[i].allEmails.length>1){
        const email = companyAndEmails[i].allEmails.shift()
        sendBccEmails(companyAndEmails[i].companyName,email,companyAndEmails[i].allEmails)
    }
    else if(companyAndEmails[i].allEmails.length==1){
        sendEmails(companyAndEmails[i].companyName,companyAndEmails[i].allEmails)
    }
    
}
//To see the the list of faied sent emails
// console.log(loadEmails())



