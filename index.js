

let images = [];

/*
 * getRecentInstagramPhotos
 * 
 */

function getRecentInstagramPhotos(profile, number) {
  return new Promise((resolve, reject) => {
    return axios.get(`https://www.instagram.com/${profile}/`)
      .then(function (htmlString) {
        console.log(htmlString)
        var instagramPage = JSON.parse(htmlString.data.match(/<script\stype="text\/javascript">window._sharedData\s?=\s?(.*)(?=<\/script>)/g)[0].substring(52).replace(/;/g, ''), null, 4);

        
        images = instagramPage['entry_data'].ProfilePage[0].user.media.nodes // jshint ignore:line
          .map(function(item) {
            return item['display_src']; // jshint ignore:line
          })
          .slice(0, number)

        resolve(images);
      })
      .catch(function (err) {
        console.error(`ERROR Instagram Scrape ${ err }`);
        console.error('Instagram Scrape Failed, Returning Default images.');
        reject();
      });
  })
}

function setRandomOffsets(img) {
  let variance = 400;

  img.style.top = `${Math.round(Math.random() * variance)}px`
  img.style.left = `${Math.round(Math.random() * variance)}px`
  img.style.bottom = `${Math.round(Math.random() * variance)}px`
  img.style.right = `${Math.round(Math.random() * variance)}px`

  img.style.zIndex = `${Math.round(Math.random() * variance)}`

  return img
}

function addImagesToScreen () {

  images.forEach((url) => {

    var img = document.createElement("IMG");
    img.src = url;
    img.classList.add('insta-img');
    img = setRandomOffsets(img);

    document.getElementById("mount").appendChild(img); 
  })

}

getRecentInstagramPhotos('stemmlerjs', 15)
  .then(addImagesToScreen)
  .catch((err) => {
    console.log(err)
  })