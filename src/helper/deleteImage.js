const fs = require('fs').promises

// delete image 
const deleteImage = async (userImagePath) =>{

    try {
        await fs.access(userImagePath)
        await fs.unlink(userImagePath)
        console.log("user image was deleted")
    } catch (error) {
        console.error("User image does not exist")
    }


}

module.exports ={ deleteImage }