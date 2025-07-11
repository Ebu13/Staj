import { Formik, Form } from "formik";
import "./Home.css";
//import QRCode from "react-qr-code";
import { Trash, PencilSquare, Printer } from "react-bootstrap-icons";
import { showToast } from "./helper/ToastifyHelper";
import "react-toastify/dist/ReactToastify.css";
import PopupModal from "./components/popup/Popup";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MisafirListeAPI from "./api/MisafirListeAPI";
import SessionStorageService from "./services/StorageService";
import * as Yup from "yup";
import PaginationComponent from "./components/pagination/Pagination";
import { MenuItem, TextField } from "@mui/material";
import TanimlarAPI from "./api/TanimlarAPI";

function MisafirPage() {
  const [misafirListe, setMisafirListe] = useState<any[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [currentRecords, setCurrentRecords] = useState<any[]>([]);
  const [pageNumbers, setPageNumbers] = useState<any[]>([]);
  const [unvanListe, setUnvanListe] = useState<any[]>([]);
  const [belediyeListe, setBelediyeListe] = useState<any[]>([]);

  const [recordsPerPage, setRecordsPerPage] = useState(
    getRecordsPerPage(window.innerWidth)
  );

  function getRecordsPerPage(width: number): number {
    if (width >= 1200) return 11; // xl
    if (width >= 992) return 9; // lg
    if (width >= 768) return 9; // md
    if (width >= 576) return 6; // sm
    return 6; // default for smaller screens
  }
  useEffect(() => {
    TanimlarAPI.getBelediye(undefined, undefined, undefined)
      .then((response) => {
        setBelediyeListe(response.data.sort((a:any, b:any) => a.belediyeAdi.localeCompare(b.belediyeAdi)))
        console.log(response.data);
      })
      .catch(() => {
        showToast("Tanımlar Belediye API isteği hatası", "warning");
      });
    TanimlarAPI.getUnvan(undefined, undefined, undefined)
      .then((response) => {
        setUnvanListe(response.data.sort((a:any, b:any) => a.unvanAdi.localeCompare(b.unvanAdi)))
        console.log(response.data);
      })
      .catch(() => {
        showToast("Tanımlar Unvan API isteği hatası", "warning");
      });
  }, []);
  useEffect(() => {
    const handleResize = () => {
      setRecordsPerPage(getRecordsPerPage(window.innerWidth));
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    const newPageNumbers = [];
    for (let i = 1; i <= Math.ceil(misafirListe.length / recordsPerPage); i++) {
      newPageNumbers.push(i);
    }
    setPageNumbers(newPageNumbers);
  }, [misafirListe, recordsPerPage]);
  useEffect(() => {
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    setCurrentRecords(
      misafirListe.slice(indexOfFirstRecord, indexOfLastRecord)
    );
  }, [currentPage, misafirListe, recordsPerPage]);

  const [modalShow, setModalShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingTable, setIsLoadingTable] = useState(false);
  const [islemYapildi, setIslemYapildi] = useState(false);
  const [personelMi, setPersonelMi] = useState(false);
  const [modalType, setModalType] = useState<string>("");
  const [selectedUpdateItem, setSelectedUpdateItem] = useState<any>(null);
  const [qrData, setQrData] = useState<any>(null);
  const [searchAdi, setSearchAdi] = useState<string>("");
  const [searchKod, setSearchKod] = useState<string>("");
  const [originalMisafirListe, setOriginalMisafirListe] = useState<any[]>([]);

  const [searchSoyadi, setSearchSoyadi] = useState<string>("");
  const [searchbelediyeAdi, setSearchbelediyeAdi] = useState<string>("");
  const [searchUnvan, setSearchUnvan] = useState<string>("");
  const navigate = useNavigate();
  let user = SessionStorageService.getUserInfo();
  const getMisafirListe = () => {
    setIsLoadingTable(true);
    console.log(personelMi);
    MisafirListeAPI.getMisafirListe(
      undefined,
      "",
      "",
      "",
      personelMi ? "E" : "H"
    )
      .then((response) => {
        console.log("listeler()", response.data);
        setOriginalMisafirListe(response.data); // Orijinal verileri sakla

        setMisafirListe(
          response.data.sort((a: any, b: any) => {
            // Eğer 'a.adi' veya 'b.adi' null ise, onları sıralamada sona atar
            if (a.adi === null) return 1; // a null ise b'den sonra gelir
            if (b.adi === null) return -1; // b null ise a'dan sonra gelir

            // Eğer ikisi de null değilse, normal bir şekilde karşılaştırır
            return a.adi.localeCompare(b.adi);
          })
        );
      })
      .catch(() => {
        showToast("API isteği hatası", "warning");
      })
      .finally(() => {
        setIsLoadingTable(false);
      });
  };
  useEffect(() => {
    if (user == null) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    console.log("filtrelendi");
    if (
      searchAdi == "" &&
      searchSoyadi == "" &&
      searchUnvan == "" &&
      searchbelediyeAdi == "" && searchKod==""
    ) {
      getMisafirListe();
    } else {
      let filterMisafirListe = originalMisafirListe.filter((item: any) => {
      // Her bir alan için, null veya undefined olup olmadığını kontrol edip, güvenli bir şekilde küçük harfe çevirip başladığını kontrol et
      const kodMatch = searchKod === "" || (item.misafirKodu && item.misafirKodu.toString().toLowerCase().startsWith(searchKod.toLowerCase()));
      const adiMatch = searchAdi === "" || (item.adi && item.adi.toLowerCase().startsWith(searchAdi.toLowerCase()));
      const soyadiMatch = searchSoyadi === "" || (item.soyadi && item.soyadi.toLowerCase().startsWith(searchSoyadi.toLowerCase()));
      const belediyeAdiMatch = searchbelediyeAdi === "" || (item.belediyeAdi && item.belediyeAdi.toLowerCase().startsWith(searchbelediyeAdi.toLowerCase()));
      const unvanMatch = searchUnvan === "" || (item.unvan && item.unvan.toLowerCase().startsWith(searchUnvan.toLowerCase()));
  
      // Tüm koşulların true olduğu durumları döndür
      return kodMatch && adiMatch && soyadiMatch && belediyeAdiMatch && unvanMatch;
    });
  
    setMisafirListe(filterMisafirListe);}

    setCurrentPage(1);
  }, [
    searchKod,
    searchAdi,
    searchSoyadi,
    searchbelediyeAdi,
    searchUnvan,
    
  ]);
  
  
  
  /* useEffect(() => {
    if (
      searchAdi == "" &&
      searchSoyadi == "" &&
      searchUnvan == "" &&
      searchbelediyeAdi == ""
    ) {
      getMisafirListe();
    } else {
      let filterMisafirListe = misafirListe.filter((item: any) => {
        return (
          item.adi.toLowerCase().includes(searchAdi.toLowerCase()) &&
          item.soyadi.toLowerCase().includes(searchSoyadi.toLowerCase()) &&
          item.belediyeAdi
            .toLowerCase()
            .includes(searchbelediyeAdi.toLowerCase()) &&
          item.unvan.toLowerCase().includes(searchUnvan.toLowerCase())
        );
      });
      setMisafirListe(filterMisafirListe);
    }
  }, [searchAdi, searchSoyadi, searchbelediyeAdi, searchUnvan,searchKod]); */

  useEffect(() => {
    if (modalType != "yazdir") {
      modalShow ? null : setSelectedUpdateItem(null);
    }
  }, [modalShow]);
  useEffect(() => {
   getMisafirListe()
  }, [ islemYapildi]);
 
  interface GuestFormValues {
    adi: string;
    soyadi: string;
    belediyeKodu: number | null;
    kullaniciAdi: string;
    misafirKodu?: number | null;
    unvanKodu: number | null;
    unvanAdi: string | null;
    belediyeAdi: string | null;
  }

  const initialValues: GuestFormValues = {
    adi: "",
    soyadi: "",
    belediyeKodu: null,
    kullaniciAdi: user.kullaniciKodu,
    belediyeAdi: "",
    misafirKodu: null,
    unvanKodu: null,
    unvanAdi: "",
  };
  const guestRegisterSchema = Yup.object().shape({
    adi: Yup.string().required(),
    soyadi: Yup.string().required(),
    belediyeKodu: Yup.string().required(),
    unvanKodu: Yup.string().required(),
  });

  async function handleSaveMisafir(values: GuestFormValues) {
    setIsLoading(true);
    try {
      const response = await MisafirListeAPI.saveMisafir(values);
      if (response.data.sonuc === 0) {
        console.log("response misafirkodu", response.data.misafirKodu);

        await getMisafirListe(); // Güncellenmiş listeyi çek

        values.misafirKodu = response.data.misafirKodu;

        setQrData(values);
        setModalType("yazdir");
        setModalShow(true);

        showToast("Kayıt Başarılı", "success");
      } else {
        showToast(response.data.sonucAciklama, "warning");
      }
    } catch (err) {
      console.log(err);
      showToast("API isteği hatası", "warning");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="container mt-4">
      <div className="card p-1 shadow">
        <Formik
          initialValues={initialValues}
          validationSchema={guestRegisterSchema}
          onSubmit={(values, { resetForm }) => {
            handleSaveMisafir(values);
            resetForm();
          }}
        >
          {(formikProps) => (
            <Form
              id="kayit-form"
              className="d-flex flex-column justify-content-center p-2"
            >
              <div className="row">
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                  <div className="form-group w-100 mb-2">
                    <TextField
                      size="small"
                      type="text"
                      {...formikProps.getFieldProps("adi")}
                      label="Ad"
                      className={`form-control ${
                        formikProps.errors.adi && formikProps.touched.adi
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                  </div>
                </div>
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                  <div className="form-group w-100 mb-2">
                    <TextField
                      size="small"
                      type="text"
                      {...formikProps.getFieldProps("soyadi")}
                      label="Soyad"
                      className={`form-control ${
                        formikProps.errors.soyadi && formikProps.touched.soyadi
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                  </div>
                </div>
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                  <div className="form-group w-100 mb-2">
                    <TextField
                      size="small"
                      select
                      value={formikProps.values.belediyeKodu}
                      onChange={(event) => {
                        const selectedOption = belediyeListe.find(
                          (option) => option.belediyeKodu === event.target.value
                        );
                        console.log(selectedOption);
                        formikProps.setFieldValue(
                          "belediyeAdi",
                          selectedOption.belediyeAdi
                        );
                        formikProps.setFieldValue(
                          "belediyeKodu",
                          Number(event.target.value)
                        );
                      }}
                      variant="outlined"
                      label="Belediye"
                      className={`form-control ${
                        formikProps.errors.belediyeKodu &&
                        formikProps.touched.belediyeKodu
                          ? "is-invalid"
                          : ""
                      }`}
                    >
                      <MenuItem value="" disabled>
                        Seçiniz..
                      </MenuItem>
                      {belediyeListe.map((option: any) => (
                        <MenuItem
                          key={option.belediyeKodu}
                          value={option.belediyeKodu}
                        >
                          {option.belediyeAdi}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                  <div className="form-group w-100 mb-2">
                    <TextField
                      size="small"
                      select
                      value={formikProps.values.unvanKodu}
                      onChange={(event) => {
                        const selectedOption = unvanListe.find(
                          (option) => option.unvanKodu === event.target.value
                        );
                        formikProps.setFieldValue(
                          "unvanAdi",
                          selectedOption.unvanAdi
                        );
                        formikProps.setFieldValue(
                          "unvanKodu",
                          Number(event.target.value)
                        );
                      }}
                      variant="outlined"
                      label="Ünvan"
                      className={`form-control ${
                        formikProps.errors.unvanKodu &&
                        formikProps.touched.unvanKodu
                          ? "is-invalid"
                          : ""
                      }`}
                    >
                      <MenuItem value="" disabled>
                        Seçiniz..
                      </MenuItem>
                      {unvanListe.map((option: any) => (
                        <MenuItem
                          key={option.unvanKodu}
                          value={option.unvanKodu}
                        >
                          {option.unvanAdi}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="btn bg-primary mt-2 w-100 text-white"
              >
                {isLoading ? (
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                ) : (
                  "Kaydet"
                )}
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <div className="d-flex flex-row justify-content-end mt-4 align-items-center">
        <div className="d-flex flex-row align-items-center gap-2  ">
          <div className="d-flex flex-row align-items-center gap-2">
            <input
              type="checkbox"
              id="personel-checkbox"
              checked={personelMi}
              onChange={(e) => setPersonelMi(e.target.checked)}
            />
            <label htmlFor="personel-checkbox">Personel</label>
          </div>
          <button
            className="btn btn-sm btn-light border"
            onClick={getMisafirListe}
          >
            Liste Yenile
          </button>
          <button
            onClick={() => {
              setSearchAdi("");
              setSearchSoyadi("");
              setSearchbelediyeAdi("");
              setSearchUnvan("");
              setSearchKod("");
            }}
            className="btn btn-sm btn-light border"
          >
            Filtre Temizle
          </button>
        </div>
      </div>
      <div className="scroll-div w-100">
        <table className="table table-striped mt-3 border">
          <thead>
            <tr>
              <th>
                <h4>Kayıt Listesi</h4>
              </th>
              <th>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Kod"
                  value={searchKod}
                  onChange={(e) => setSearchKod(e.target.value)}
                />
              </th>
              <th>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Ad"
                  value={searchAdi}
                  onChange={(e) => setSearchAdi(e.target.value)}
                />
              </th>
              <th>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Soyad"
                  value={searchSoyadi}
                  onChange={(e) => setSearchSoyadi(e.target.value)}
                />
              </th>
              <th>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Belediye Adı"
                  value={searchbelediyeAdi}
                  onChange={(e) => setSearchbelediyeAdi(e.target.value)}
                />
              </th>
              <th>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Unvan"
                  value={searchUnvan}
                  onChange={(e) => setSearchUnvan(e.target.value)}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoadingTable ? (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            ) : currentRecords.length > 0 ? (
              currentRecords.map((item: any, index: any) => {
                return (
                  <tr key={index}>
                    <td>
                      <div className="d-flex flex-row justify-content-center gap-1">
                        <button
                          onClick={() => {
                            setSelectedUpdateItem(item);
                            setModalType("sil");
                            setModalShow(true);
                          }}
                          className="btn btn-danger btn-sm"
                        >
                          <Trash />
                        </button>
                        <button
                          onClick={() => {
                            const selectedUnvan = unvanListe.find(
                              (unvan) => unvan.unvanAdi === item.unvan
                            );
                            const unvanKodu = selectedUnvan
                              ? selectedUnvan.unvanKodu
                              : null;

                            // Belediye kodunu bul
                            const selectedBelediye = belediyeListe.find(
                              (belediye) =>
                                belediye.belediyeAdi === item.belediyeAdi
                            );
                            const belediyeKodu = selectedBelediye
                              ? selectedBelediye.belediyeKodu
                              : null;

                            // Yeni item objesi oluştur
                            const updatedItem = {
                              ...item,
                              unvanKodu: unvanKodu,
                              belediyeKodu: belediyeKodu,
                            };

                            // Modal için gerekli state'leri güncelle
                            setSelectedUpdateItem(updatedItem);
                            setModalType("guncelle");
                            setModalShow(true);
                          }}
                          className="btn btn-warning btn-sm"
                        >
                          <PencilSquare className="text-white" />
                        </button>
                        <button
                          onClick={() => {
                            const modifiedItem = {
                              ...item,
                              unvanAdi: item.unvan,
                            };
                            delete modifiedItem.unvan;
                            setQrData(modifiedItem);
                            setModalType("yazdir");
                            setModalShow(true);
                          }}
                          className="btn btn-primary btn-sm"
                        >
                          <Printer />
                        </button>
                      </div>
                    </td>
                    <td>{item.misafirKodu}</td>
                    <td>{item.adi == null ? "-" : item.adi}</td>
                    <td>{item.soyadi == null ? "-" : item.soyadi}</td>
                    <td>{item.belediyeAdi == null ? "-" : item.belediyeAdi}</td>
                    <td>{item.unvan == null ? "-" : item.unvan}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6}>Kayıt Bulunamadı</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <PopupModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        type={modalType}
        unvanListe={unvanListe}
        belediyeListe={belediyeListe}
        islemYapildi={() => setIslemYapildi(!islemYapildi)}
        selectedItem={selectedUpdateItem}
        qrData={qrData}
      />

      {misafirListe.length > 0 ? (
        <PaginationComponent
          data={misafirListe}
          pageNumbers={pageNumbers}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      ) : null}
    </div>
  );
}

export default MisafirPage;
