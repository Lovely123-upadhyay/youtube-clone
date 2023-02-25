var menuIcon = document.querySelector(".menu_icon")
var sidebar = document.querySelector(".sidebar")
var bada = document.querySelector(".container")

menuIcon.onclick = function () {
    sidebar.classList.toggle("small-sidebar");
    bada.classList.toggle("large-container")

}
let q;

let popular=async()=>{
    let url=`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=20&key=AIzaSyAEu1A260aZeViZRqZeXIfjIaXMlySStUY`
    let data=await getData(url)
    let data1=data=data.items
    q=data1
    append(data1)
}

let search = async () => {
    let query = document.getElementById("query").value
    let url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${query}&key=AIzaSyAEu1A260aZeViZRqZeXIfjIaXMlySStUY`
    // let res = await fetch(url)
    let data = await getData(url);
    let data1=data=data.items
    q=data1
    append(data1)
    // getData(query)
}

let getData = async (url) => {
   let res = await fetch(url)
   let data = await res.json()
    // console.log(data)
    return data
  
}
let append = (data) => {
    let cont = document.querySelector(".list-container")
    cont.innerHTML = null;
    data.forEach((el) => {
        let img = document.createElement("img");
        img.src = el.snippet.thumbnails.medium.url;
        let h3 = document.createElement("h3")
        h3.innerText = el.snippet.title;
        let p = document.createElement("p")
        p.innerText = el.snippet.channelTitle;
        let div = document.createElement("div");
        div.onclick = () => {
            saveVideo(el)
        }
        div.setAttribute("class", "video")
        div.append(img, h3, p)
        cont.append(div)
    })
}

let saveVideo = (data) => {
    localStorage.setItem("video", JSON.stringify(data));
    window.location.href = "video.html"
}
let sort=()=>{
    let data=q
        data=data.sort(function(a,b){
          if(a.snippet.title>b.snippet.title) return 1;
          if(a.snippet.title<b.snippet.title) return -1;
          return 0
        });
    append(data)
}
popular()
// {
//     "kind": "youtube#searchResult",
//     "etag": "uA_mUMOsZQ7rysG9CwD2ADHIEYI",
//     "id": {
//         "kind": "youtube#video",
//         "videoId": "qSHZxNR_qmA"
//     },
//     "snippet": {
//         "publishedAt": "2021-07-15T05:14:56Z",
//         "channelId": "UCjX8LVXq46L30vPgTQJk84A",
//         "title": "Chris Hemsworth  reaction to frog Thor (Thorg) in Loki",
//         "description": "Chris Hemsworth reaction to frog Thor (Thorg) in Loki.",
//         "thumbnails": {
//             "default": {
//                 "url": "https://i.ytimg.com/vi/qSHZxNR_qmA/default.jpg",
//                 "width": 120,
//                 "height": 90
//             },
//             "medium": {
//                 "url": "https://i.ytimg.com/vi/qSHZxNR_qmA/mqdefault.jpg",
//                 "width": 320,
//                 "height": 180
//             },
//             "high": {
//                 "url": "https://i.ytimg.com/vi/qSHZxNR_qmA/hqdefault.jpg",
//                 "width": 480,
//                 "height": 360
//             }
//         },
//         "channelTitle": "MrBeast2",
//         "liveBroadcastContent": "none",
//         "publishTime": "2021-07-15T05:14:56Z"
//     }
// }