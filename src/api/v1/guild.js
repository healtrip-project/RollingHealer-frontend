import { localAxios } from "@/utils/http-commons"
import { useLoginInfoStore } from "@/stores/loginInfo";

const local = localAxios();

/// 길드 Alias 체크 부분
async function checkAliasAvailability (guildAlias, success, fail) {
  const ulis = useLoginInfoStore();
  local.defaults.headers["Authorization"] = ulis.accessToken;
  await local.get(`/guild/checkalias/${guildAlias}`).then(success).catch(fail);
}


// 길드 부분
async function getGuild(success, fail) {
    const ulis = useLoginInfoStore();
  local.defaults.headers["Authorization"] = ulis.accessToken;
  await local.get(`/guild`).then(success).catch(fail);
}

async function makeGuild(guild, success, fail) {
  const ulis = useLoginInfoStore();
local.defaults.headers["Authorization"] = ulis.accessToken;
console.dir(guild);
await local.post(`/guild`, guild).then(success).catch(fail);
}

async function getGuildDetails(guildAlias, success, fail) {
  await local.get(`/guild/${guildAlias}`).then(success).catch(fail);
}




// 길드 포스트 부분
async function getGuildPosts(guildAlias, success, fail) {
  await local.get(`/guild/${guildAlias}/guildpost`).then(success).catch(fail);
}

async function guildPostWrite(guildAlias, guildPost, success, fail) {
  const ulis = useLoginInfoStore();
local.defaults.headers["Authorization"] = ulis.accessToken;
await local.post(`/guild/${guildAlias}/guildpost`, guildPost).then(success).catch(fail);
}

async function guildPostDelete(guildAlias, postId, guild, success, fail) {
  const ulis = useLoginInfoStore();
  local.defaults.headers["Authorization"] = ulis.accessToken;
  await local.put(`/guild/${guildAlias}/guildpost/${postId}/delete`, guild).then(success).catch(fail);
}

async function getGuildPostDetails(guildAlias, postId, success, fail) {
  await local.get(`/guild/${guildAlias}/guildpost/${postId}`).then(success).catch(fail);
}

//Guild join
async function joinGuild (guildId, userId, success, fail) {
  const ulis = useLoginInfoStore();
  local.defaults.headers["Authorization"] = ulis.accessToken;
  await local.put(`/guild/${guildId}/join/${userId}`).then(success).catch(fail);
}

async function getGuildMemberList (guildId, success, fail) {
  const ulis = useLoginInfoStore();
  local.defaults.headers["Authorization"] = ulis.accessToken;
  await local.get(`/guild/${guildId}/members`).then(success).catch(fail);
}

export {
  checkAliasAvailability, 
  getGuild , 
  makeGuild, 
  getGuildDetails, 
  getGuildPosts, 
  guildPostWrite, 
  guildPostDelete, 
  getGuildPostDetails,
  joinGuild, 
  getGuildMemberList,
};