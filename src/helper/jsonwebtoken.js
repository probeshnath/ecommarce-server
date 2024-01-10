const jwt = require('jsonwebtoken');

const createJsonWebToken = (payload, secretKey, expiresIn) =>{

    // error handle
    if(typeof payload !== 'object' || !payload ){
        throw new Error('Payload must be a non-empty object')
    }
    if(typeof secretKey !== 'string' || secretKey === "" ){
        throw new Error('secretKey must be a non-empty string')
    }

   try {

    const token = jwt.sign(payload, secretKey,{expiresIn})
    return token

   } catch (error) {
    console.error('Failed to sign the jwt', error)
    throw error;
   }
}

module.exports = {createJsonWebToken}