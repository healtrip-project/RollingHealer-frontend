import { localAxios } from "@/utils/http-commons";
import { useLoginInfoStore } from "@/stores/loginInfo";

const local = localAxios();

async function uploadImage(data, success, fail,progress) {
  const store = useLoginInfoStore();
  local.defaults.headers["Authorization"] = store.accessToken;
  const formData=new FormData();
  for (const file of data) {
    if (!file.type.startsWith("image/")) {
      continue;
    }
    console.log(file)
    formData.append("files", file);
  }
  await local
    .post(`/file/upload`, formData, {
      onUploadProgress: (progressEvent) => {
        let percentage = (progressEvent.loaded * 100) / progressEvent.total;
        //progressEvent.loaded는 현재까지 로드 된 수치를 나타내고
        //progressEvent.total은 전체 수치를 나타낸다.
        let percentCompleted = Math.round(percentage);
        progress( percentCompleted); //onUplodeProgress는 갱신될 때마다 수행한다.

      },
      headers: {
        "Content-Type": "multipart/form-data",
      },
      transformRequest: [
         ()=> {
          return formData;
        },
      ],
    })
    .then(success)
    .catch(fail);
}

async function previewImage(uri, success, fail) {
  await local.get(uri).then(success).catch(fail);
}

async function downloadImage(uri,success, fail) {
  await local.post(uri).then(success).catch(fail);
}



export { uploadImage, previewImage, downloadImage };
