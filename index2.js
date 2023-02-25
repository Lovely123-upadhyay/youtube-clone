var menuIcon = document.querySelector(".menu_icon")
var sidebar = document.querySelector(".sidebar")
var bada = document.querySelector(".container")

menuIcon.onclick = function () {
    sidebar.classList.toggle("small-sidebar");


}

// let popular=async()=>{
//     let url=`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=20&key=AIzaSyAVMQmBfoZ0QDULYztGSSirJ6YU6VkK12s`
//     let data=await getData(url)
//     let data1=data=data.items
//     q=data1
//     append(data1)
// }

let search = async () => {
    let query = document.getElementById("query").value
    getData(query)
}

let getData = async (query) => {
    let url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${query}g&key=AIzaSyAEu1A260aZeViZRqZeXIfjIaXMlySStUY`
    let res = await fetch(url)
    let data = await res.json();
    // console.log(data)
    append(data.items)
    localStorage.setItem("trenddata",JSON.stringify(data.items))
}
let append = (data) => {
    let cont = document.querySelector(".list-container")
    cont.innerHTML = "";
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
