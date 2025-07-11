// import * as environment from "../config/environment"


import { BaseAPI } from "./BaseAPI";


class MisafirListeAPI extends BaseAPI {
  

  constructor () {
    const baseUrl = "http://localhost:5262/api/" + "Misafir";
    super(baseUrl);
  }


  getMisafirListe(misafirKodu?:number,adi?:string,soyadi?:string,barkodNo?:string,personelMi?:string){
    
    return this.get("GetMisafirListe", { params: { misafirKodu: misafirKodu,adi: adi,soyadi: soyadi,barkodNo: barkodNo,personelMi: personelMi } });
   
  }
  saveMisafir(model:any){
    return this.post("SaveOrUpdateMisafir",model);
  }
  deleteMisafir(misafirKodu:number){
    return this.get("DeleteMisafir?"+"MisafirKodu="+misafirKodu);
}

}
export default new MisafirListeAPI();
class MisafirListeRequest {
  public misafirKodu?: number;
  public adi?: string;
  public soyadi?: string;
  public barkodNo?: string;
  public personelMi?:string;


  constructor( misafirKodu?:number,adi?:string,soyadi?:string,barkodNo?:string,personelMi?:string) {
    this.misafirKodu=misafirKodu
    this.adi=adi
    this.personelMi=personelMi
    this.soyadi=soyadi
    this.barkodNo=barkodNo
   

  }
}
export { MisafirListeRequest };