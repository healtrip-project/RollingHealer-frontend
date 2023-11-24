import { localAxios } from "@/utils/http-commons"
import { useLoginInfoStore } from "@/stores/loginInfo";

const local = localAxios();

async function getPost(success, fail) {
    const ulis = useLoginInfoStore();
  local.defaults.headers["Authorization"] = ulis.accessToken;
  await local.get(`/post`).then(success).catch(fail);
}

async function getPostByGuildId(guildId, success, fail) {
  const ulis = useLoginInfoStore();
local.defaults.headers["Authorization"] = ulis.accessToken;
await local.get(`/post/guild/${guildId}`).then(success).catch(fail);
}


// async function getPost(success, fail) {
//     local.defaults.headers["Authorization"] = loginInfoStore.accessToken;
//     await local.get(`/post`).then(success).catch(fail);
//   }


async function postDelete( postId, success, fail) {
  const ulis = useLoginInfoStore();
  local.defaults.headers["Authorization"] = ulis.accessToken;
  await local.put(`/post/${postId}/delete` ).then(success).catch(fail);
}

async function writePost(post, success, fail) {
  await local.post(`/post`, post).then(success).catch(fail);
}

async function getPostDetails(postId, success, fail) {
  await local.get(`/post/${postId}`).then(success).catch(fail);
}



export { getPost, writePost, 
  getPostDetails , 
  getPostByGuildId,
  postDelete

};