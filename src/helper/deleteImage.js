const fs = require('fs').promises

// delete image 
const deleteImage = async (userImagePath) =>{

    try {
        // access the image
        await fs.access(userImagePath)
        // delete the img
        await fs.unlink(userImagePath)
        console.log("user image was deleted")
    } catch (error) {
        console.error("User image does not exist")
    }


}

module.exports ={ deleteImage }