class useImg{
    static imageZoomHeightUtil(originalWidth,originalHeight,imageWidth){ 
        let imageSize = {}; 
        if(imageWidth){ 
          imageSize.imageWidth = imageWidth; 
          imageSize.imageHeight = (imageWidth * originalHeight) / originalWidth; 
        }else{//如果没有传imageWidth,使用屏幕的宽 
          wx.getSystemInfo({  
            success: function (res) {  
              imageWidth = res.windowWidth;  
              imageSize.imageWidth = imageWidth; 
              imageSize.imageHeight = (imageWidth * originalHeight) / originalWidth; 
            }  
          }); 
        } 
        return imageSize; 
      }

      static imageZoomWidthUtil(originalWidth,originalHeight,imageHeight){ 
        let imageSize = {}; 
        if(imageHeight){ 
          imageSize.imageWidth = (imageHeight *originalWidth) / originalHeight; 
          imageSize.imageHeight = imageHeight; 
        }else{//如果没有传imageHeight,使用屏幕的高 
          wx.getSystemInfo({  
            success: function (res) {  
              imageHeight = res.windowHeight; 
              imageSize.imageWidth = (imageHeight *originalWidth) / originalHeight; 
              imageSize.imageHeight = imageHeight; 
            }  
          }); 
        } 
        return imageSize; 
      } 
}

export default useImg;