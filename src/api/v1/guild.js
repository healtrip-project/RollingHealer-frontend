import { localAxios } from "@/utils/http-commons"
import { useLoginInfoStore } from "@/stores/loginInfo";

const local = localAxios();

async function getGuild(success, fail) {
    const ulis = useLoginInfoStore();
  local.defaults.headers["Authorization"] = ulis.accessToken;
  await local.get(`/guild`).then(success).catch(fail);
}
// async function getPost(success, fail) {
//     local.defaults.headers["Authorization"] = loginInfoStore.accessToken;
//     await local.get(`/post`).then(success).catch(fail);
//   }


async function makeGuild(guild, success, fail) {
  const ulis = useLoginInfoStore();
local.defaults.headers["Authorization"] = ulis.accessToken;
console.dir(guild);
await local.post(`/guild`, guild).then(success).catch(fail);
}

async function getGuildDetails(guildAlias, success, fail) {
  await local.get(`/guild/${guildAlias}`).then(success).catch(fail);
}






// async function tokenRegeneration(user, success, fail) {
//   await local.post(`/auth/refresh`, user).then(success).catch(fail);
// }

// async function logout(userid, success, fail) {
//   await local.get(`/user/logout/${userid}`).then(success).catch(fail);
// }

export {getGuild , makeGuild, getGuildDetails };