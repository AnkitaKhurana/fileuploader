const aws = require('aws-sdk');
const s3 = new aws.S3();

var getFiles = ()=>{    
    return new Promise((resolve,reject)=>{
        try{
            var getParams = {
                Bucket: process.env.BUCKET_NAME
            };
            s3.listObjects(getParams, function(err, data) {
                if (err){
                        console.log(err);        
                        reject([]);
                    }
                 resolve(data.Contents);      
            });
        }
        catch{
            reject('Error counting letters');
        }
    });  
}
 
module.exports = getFiles;