var calculate = (data)=>{
    return new Promise((resolve,reject)=>{
        try{
          resolve(data.length);      
        }
        catch{
            console.log('Error')
            reject('Error counting letters');
        }

    });
}
 
module.exports = calculate;