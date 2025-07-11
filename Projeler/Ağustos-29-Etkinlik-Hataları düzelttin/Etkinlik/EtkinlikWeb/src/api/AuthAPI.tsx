// import * as environment from "../config/environment"


import { BaseAPI } from "./BaseAPI";


class AuthAPI extends BaseAPI {
  

  constructor () {
    const baseUrl = "http://192.168.34.13:5262/api/" + "Auth";
    super(baseUrl);
  }



  login(model:any){
    return this.post("LoginControl",model);
  }

}
export default new AuthAPI();
