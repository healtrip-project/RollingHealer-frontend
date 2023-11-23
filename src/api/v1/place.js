import { localAxios } from "@/utils/http-commons";
import { useLoginInfoStore } from "@/stores/loginInfo";

const local = localAxios();


async function getPlaceData(query, success, fail) {
  console.log(query)
  await local.get("/place/search",{params:query}).then(success).catch(fail);
}



export { getPlaceData };
