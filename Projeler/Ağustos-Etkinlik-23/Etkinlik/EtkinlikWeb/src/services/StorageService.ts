export class SessionStorageService{
   
  constructor () {    
  }


  public setUserInfo (userInfo:any) {
    return sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
    
  }

  public getUserInfo ():any {
    return JSON.parse(sessionStorage.getItem('userInfo') as any);
  }

  public clearAll () {
    sessionStorage.clear();
  }
} 

export default new SessionStorageService();