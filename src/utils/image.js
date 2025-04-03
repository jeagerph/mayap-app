export const ImageHandler = {
    readFile: (file, callback) =>
    {
        const reader = new FileReader();

        reader.onload = function(file)
        {
            ImageHandler.processFile(file.target.result, file.type, function(response)
            {
                callback(response);
            });
        }
    
        reader.onerror = function()
        {
			// Toast({
			// 	message: 'JPEG or PNG formats are only accepted.',
			// 	status: "danger",
			// });
        }
    
        reader.readAsDataURL(file);
    },

    processFile: (dataURL, fileType, callback) =>
    {
        var maxWidth = 1000;
        var maxHeight = 1000;
    
        var image = new Image();
        image.src = dataURL;
    
        image.onload = function ()
        {
            var width = image.width;
            var height = image.height;
            var shouldResize = (width > maxWidth) || (height > maxHeight);

            if (!shouldResize) callback(dataURL);
    
            var newWidth;
            var newHeight;
    
            if (width > height)
            {
                newHeight = height * (maxWidth / width);
                newWidth = maxWidth;
            }
            else
            {
                newWidth = width * (maxHeight / height);
                newHeight = maxHeight;
            }
    
            var canvas = document.createElement('canvas');
    
            canvas.width = newWidth;
            canvas.height = newHeight;
    
            var context = canvas.getContext('2d');
    
            context.drawImage(this, 0, 0, newWidth, newHeight);
    
            dataURL = canvas.toDataURL(fileType);

            callback(dataURL);
        };
    
        image.onerror = function () {
            // Toast({
			// 	message: 'JPEG or PNG formats are only accepted.',
			// 	status: "danger",
			// });
        };
    },

    compressFile: (file, callback) =>
    {
        ImageHandler.readFile(file, function(response)
        {
            var arr = response.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), index = bstr.length, newUint8Array = new Uint8Array(index);
            while(index--)
            {
                newUint8Array[index] = bstr.charCodeAt(index);
            }
            const newFile = new File([newUint8Array], file.name, {type:mime});

            callback(newFile);
        });
    },

    toBase64: (file, callback) =>
    {
        const reader = new FileReader();
        reader.onload = function(file) {
            callback(file.target.result)
        };
        reader.readAsDataURL(file);
    },

    toBase64Image: (url, callback, outputFormat) => 
    {
        var canvas = document.createElement('CANVAS');
        var ctx = canvas.getContext('2d');
        var img = new Image;
        img.crossOrigin = 'Anonymous';
        img.onload = function(){
            canvas.height = img.height;
            canvas.width = img.width;
            ctx.drawImage(img,0,0);
            var dataURL = canvas.toDataURL(outputFormat || 'image/png');
            callback.call(this, dataURL);
            // Clean up
            canvas = null; 
        };
        img.src = url;
    },

    fileType: (fileType) =>
    {
        let icon = '';

        if (fileType.search('spreadsheet') > 0 || fileType.search('excel') > 0)
        {
            icon = 'excel';
        }
        else if (fileType.search('wordprocessing') > 0 || fileType.search('word') > 0)
        {
            icon = 'word';
        }
        else if (fileType.search('pdf') > 0)
        {
            icon = 'pdf';
        }
        else if (fileType.search('presentation') > 0)
        {
            icon = 'powerpoint';
        }
        else if (fileType.search('jpeg') > 0 || fileType.search('png') > 0)
        {
            icon = 'image';

        }
        else {
            icon = 'unknown';
        }

        return icon;
    }
};