import { localAxios } from "@/utils/http-commons"
import { useLoginInfoStore } from "@/stores/loginInfo";

const local = localAxios();

async function userConfirm(param, success, fail) {
  console.log("param", param);
  await local.post(`/auth/login`, param).then(success).catch(fail);
}

async function getGuild(success, fail) {
    const ulis = useLoginInfoStore();
  local.defaults.headers["Authorization"] = ulis.accessToken;
  await local.get(`/guild`).then(success).catch(fail);
}
// async function getPost(success, fail) {
//     local.defaults.headers["Authorization"] = loginInfoStore.accessToken;
//     await local.get(`/post`).then(success).catch(fail);
//   }


async function writePost(post, success, fail) {
  await local.post(`/post`, post).then(success).catch(fail);
}

async function getPostDetails(postId, success, fail) {
  await local.get(`/post/${postId}`).then(success).catch(fail);
}






// async function tokenRegeneration(user, success, fail) {
//   await local.post(`/auth/refresh`, user).then(success).catch(fail);
// }

// async function logout(userid, success, fail) {
//   await local.get(`/user/logout/${userid}`).then(success).catch(fail);
// }

export {getGuild  };