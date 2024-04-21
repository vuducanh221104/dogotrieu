const cloudinary = require('cloudinary').v2;
          
cloudinary.config({ 
  cloud_name: 'dalitwf9i', 
  api_key: '467721772433569', 
  api_secret: 'Nc6Zdio_QssCkhQr_dWTWkT--uQ' 
});

module.exports = cloudinary;