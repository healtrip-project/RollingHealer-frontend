import { previewImage } from "@/api/v1/file";
const randomNum = Math.floor(Math.random() * 100);
const { VITE_API_BASE_URL } = import.meta.env;
const testImageParser = (json) => {
  for (const attr of json) {
    if (attr["type"] == "image") {
      return attr.attrs.src;
    }
    // } else {
    // console.log(json[attr]);
    //   return testImageParser(json[attr].content);
    // }
  }
};
const firstImageParingTest = (json1) => {
  if (!json1) {
    return null;
  }
  for (const attr in json1) {
    if (json1[attr] !== null && json1[attr] !== undefined && typeof json1[attr] === "object") {
      if (attr === "attrs") {
        return json1[attr].src;
      } else {
        return testImageParser(json1[attr]);
      }
    }
  }
};

// 여러 개의 기본 이미지 URL들을 배열로 정의
const defaultImageUrls = [
  "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D",
  "https://cdn.pixabay.com/photo/2022/11/14/10/37/chinese-lanterns-7591296_640.jpg",
  "https://cdn.pixabay.com/photo/2020/06/30/15/03/table-5356682_640.jpg",
  "https://cdn.pixabay.com/photo/2019/06/25/13/59/city-4298285_640.jpg",
  // 추가 이미지 URL들...
];

function contentImageParser(item,index) {


  return (
    (item?.userThumbnailFileUrl ? VITE_API_BASE_URL+item.userThumbnailFileUrl : null)||
    (item?.guildThumbnailFileUrl ? VITE_API_BASE_URL+item.guildThumbnailFileUrl : null) ||
    item.firstimage ||
    item.firstimage2 ||
    (item?.content?firstImageParingTest(item?.content && JSON.parse(item.content)):item?.raw?.content?firstImageParingTest(item?.raw?.content && JSON.parse(item?.raw?.content)):false) ||
    defaultImageUrls[(index || randomNum) % defaultImageUrls.length]
  );
}
async function asyncContentImageParser(item) {

   return (
       (item?.userThumbnailFileUrl ? VITE_API_BASE_URL + item.userThumbnailFileUrl : null) ||
       (item?.guildThumbnailFileUrl ? VITE_API_BASE_URL + item.guildThumbnailFileUrl : null) ||
       item.firstimage ||
       item.firstimage2 ||
       firstImageParingTest(item?.content && JSON.parse(item.content)) ||
       defaultImageUrls[(randomNum) % defaultImageUrls.length]
     );

}


export { firstImageParingTest, testImageParser, contentImageParser, asyncContentImageParser };
