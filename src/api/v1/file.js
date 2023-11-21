import { localAxios } from "@/utils/http-commons";
import { useLoginInfoStore } from "@/stores/loginInfo";

const local = localAxios();

async function uploadImage(data, success, fail) {
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
