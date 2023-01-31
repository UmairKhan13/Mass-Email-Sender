const XLSX = require('xlsx')
const book =XLSX.readFile("Software-Houses.xlsx")

let sheet = book.Sheets[book.SheetNames[0]]

let email 
let companyAndEmails = []

// console.log('a\nb')
for(let index=2;index<10;index++){
    
    email=sheet[`C${index}`].v
    if( email.includes(',') ){
        let arr2=[]    
        arr2=email.split(',')
        for( i=0;i<arr2.length;i++){     
        arr2[i]=arr2[i].trimStart()   
    }
    companyAndEmails.push({
        companyName:sheet[`A${index}`].v,
        allEmails:arr2  })       
    }
    else{
        companyAndEmails.push({
            companyName:sheet[`A${index}`].v,
            allEmails:[email]})       
        }
}


module.exports=companyAndEmails


