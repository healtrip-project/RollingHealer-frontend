import { localAxios } from "@/utils/http-commons"
import { useLoginInfoStore } from "@/stores/loginInfo";

const local = localAxios();

async function userConfirm(param, success, fail) {
  console.log("param", param);
  await local.post(`/auth/login`, param).then(success).catch(fail);
}

async function findById(userid, success, fail) {
  const store = useLoginInfoStore();
  local.defaults.headers["Authorization"] = store.accessToken;
  await local.get(`/user/${userid}`).then(success).catch(fail);
}

async function tokenRegeneration(success, fail) {
  await local.post(`/auth/refresh`).then(success).catch(fail);
}

async function logout(userid, success, fail) {
  const store = useLoginInfoStore();
  local.defaults.headers["Authorization"] = store.accessToken;
  await local.get(`/user/logout`).then(success).catch(fail);
}

export { userConfirm, findById, tokenRegeneration, logout };