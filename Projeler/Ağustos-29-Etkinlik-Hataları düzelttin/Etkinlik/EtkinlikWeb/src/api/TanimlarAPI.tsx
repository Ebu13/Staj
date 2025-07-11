// import * as environment from "../config/environment"


import { BaseAPI } from "./BaseAPI";


class TanimlarAPI extends BaseAPI {
  

  constructor () {
    const baseUrl = "http://192.168.34.13:5262/api/" + "Tanimlar";
    super(baseUrl);
  }


  getBelediye(belediyeKodu?:string,belediyeAdi?:string,kullaniciAdi?:string){
    
        var request= new BelediyeRequest(belediyeKodu,belediyeAdi,kullaniciAdi);
    return this.get("GetBelediyeTanimlariListe", request);
   
  }
  saveBelediye(model:any){
    return this.post("SaveBelediyeTanim",model);
  }
  deleteBelediye(belediyeKodu?:number){
    
return this.get("DeleteBelediye",  { params: { belediyeKodu: belediyeKodu } });

}
  getUnvan(unvanKodu?:string,unvanAdi?:string,kullaniciAdi?:string){
    
    var request= new UnvanRequest(unvanKodu,unvanAdi,kullaniciAdi);
return this.get("GetUnvanTanimlariListe", request);

}
saveUnvan(model:any){
return this.post("SaveUnvanTanim",model);
}
deleteUnvan(unvanKodu?:number){
    
  
return this.get("DeleteUnvan", { params: { unvanKodu: unvanKodu } });

}

}
export default new TanimlarAPI();
class BelediyeRequest {
  public belediyeKodu?: string;
  public belediyeAdi?: string;
  public kullaniciAdi?: string;



  constructor( belediyeKodu?:string,belediyeAdi?:string,kullaniciAdi?:string) {
    this.belediyeKodu=belediyeKodu
    this.belediyeAdi=belediyeAdi
    this.kullaniciAdi=kullaniciAdi
   
   

  }
}
class UnvanRequest {
    public unvanKodu?: string;
    public unvanAdi?: string;
    public kullaniciAdi?: string;
  
  
  
    constructor( unvanKodu?:string,unvanAdi?:string,kullaniciAdi?:string) {
      this.unvanKodu=unvanKodu
      this.unvanAdi=unvanAdi
      this.kullaniciAdi=kullaniciAdi
     
     
  
    }
  }
export { BelediyeRequest };
