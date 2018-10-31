export default function loadImage(url, onProgress) {
    // Create new promise with the Promise() constructor;
    // This has as its argument a function with two parameters, resolve and reject
    return new Promise(function(resolve, reject) {
      const { location } = window
      // Standard XHR to load an image
      var request = new XMLHttpRequest()
      request.open(
        'GET',
        location.protocol + '//' + location.hostname + ':' + location.port + url
      )
      request.responseType = 'blob'
  
      // When the request loads, check whether it was successful
      request.onload = function() {
        if (request.status === 200) {
          // If successful, resolve the promise by passing back the request response
          const image = new Image()
          const imageURL = window.URL.createObjectURL(request.response)
          image.src = imageURL
          image.crossOrigin = ''
          image.onload = () => {
            resolve(image)
          }
          image.onerror = () => {
            reject(
              new Error(
                'Image was loaded over network but failed to render' + url
              )
            )
          }
        } else {
          // If it fails, reject the promise with a error message
          reject(
            new Error(
              "Image didn't load successfully; error code:" + request.statusText
            )
          )
        }
      }
  
      request.onprogress = function(evt) {
        if (onProgress) onProgress(evt.loaded, evt.total)
      }
  
      request.onerror = function() {
        // Also deal with the case when the entire request fails to begin with
        // This is probably a network error, so reject the promise with an appropriate message
        reject(new Error('There was a network error.'))
      }
  
      // Send the request
      request.send()
    })
  }