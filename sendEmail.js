const sgMail = require('@sendgrid/mail')
const fs = require('fs')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendEmails = (name, email)=>{
  pathToAttachment = `${__dirname}/Resume.pdf`
  attachment = fs.readFileSync(pathToAttachment).toString("base64")
  const body ="Hi,\nI'm XYZ. I'm a recent grad from fast. I am currently looking for a position as a software engineer with an esteemed organization like " +name+". I'm looking to work on the latest tools and technologies with focused interest towards the backend. I have worked on Node.js,Flutter,.Net, C++ and Python. I am confident that my background and knowledge in the Information Technology arena coupled with my strong technical skills in software languages will prove an asset to your organization and add immediate value to your organization.\nI have attached my resume and I'd love to hear from you if there is an opportunity for me.\nBest Regards\nXYZ"
  const msg = {
    to:email,
    from: {
        name: 'XYZ',
        email: 'xyz@gmail.com'
    },
    subject: 'Software Engineer',
    text:body,
    attachments :[
        {
            content: attachment,
            filename: "Resume.pdf",
            type: "application/pdf",
            disposition: "attachment"
        }
    ]
}
//sgMail.sendMultiple()
    sgMail.send(msg).catch(error=>{
        console.log(error.status)
        addEmail(name,email)
     })

}
const sendBccEmails = (name, email,bccE)=>{
    pathToAttachment = `${__dirname}/Resume.pdf`
    attachment = fs.readFileSync(pathToAttachment).toString("base64")
    const body ="Hi,\nI'm xyz. I'm a recent grad from fast. I am currently looking for a position as a software engineer with an esteemed organization like " +name+". I'm looking to work on the latest tools and technologies with focused interest towards the backend. I have worked on Node.js,Flutter,.Net, C++ and Python. I am confident that my background and knowledge in the Information Technology arena coupled with my strong technical skills in software languages will prove an asset to your organization and add immediate value to your organization.\nI have attached my resume and I'd love to hear from you if there is an opportunity for me.\nBest Regards\nxyz"
    const msg = {
      to:email,
      bcc:bccE,
      from: {
          name: 'xyz',
          email: 'xyz@gmail.com'
      },
      subject: 'Software Engineer',
      text:body,
      attachments :[
          {
              content: attachment,
              filename: "Resume.pdf",
              type: "application/pdf",
              disposition: "attachment"
          }
      ]
  }
  //sgMail.sendMultiple()
    if(bccE.length==1){
      sgMail.send(msg).catch(error=>{
          console.log(error.status)
          addEmail(name,email)
       })
    }
    else if(bccE.length>1){
         sgMail.sendMultiple(msg).catch(error=>{
          console.log(error.status)
          addEmail(name,email) 
       })
    }
    
  
}


const loadEmails= ()=>{
    try{
        const dataBuffer = fs.readFileSync('unsent.json')
        const dataJSON= dataBuffer.toString()
        return JSON.parse(dataJSON)

    } catch(e){
          return [];
    }

}
const addEmail=(name,email,content)=>{
    const emails=loadEmails()
    emails.push({
          name:name,
          allEmails:email,
          body:content
        })
    const dataJSON=JSON.stringify(emails)
    fs.writeFileSync('unsent.json',dataJSON)
}
      

module.exports={sendEmails,loadEmails,sendBccEmails}
