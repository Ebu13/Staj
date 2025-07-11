import PaginationComponent from "./components/pagination/Pagination";
import { Formik, Form } from "formik";
import "./Home.css";
import { PencilSquare, Trash } from "react-bootstrap-icons";
import { showToast } from "./helper/ToastifyHelper";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SessionStorageService from "./services/StorageService";
import * as Yup from "yup";
import { TextField } from "@mui/material";
import TanimlarAPI from "./api/TanimlarAPI";
import { Button, Modal } from "react-bootstrap";

const BelediyePage = () => {
  const [belediyeListe, setBelediyeListe] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentRecords, setCurrentRecords] = useState<any[]>([]);
  const [pageNumbers, setPageNumbers] = useState<any[]>([]);
  const [recordsPerPage, setRecordsPerPage] = useState(
    getRecordsPerPage(window.innerWidth)
  );
  const [modalShow, setModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingTable, setIsLoadingTable] = useState(false);
  const [islemYapildi, setIslemYapildi] = useState(false);
  const [selectedUpdateItem, setSelectedUpdateItem] = useState<any>(null);
  const [selectedDeleteItem, setSelectedDeleteItem] = useState<any>(null);
  const [searchBelediyeAdi, setSearchBelediyeAdi] = useState<string>("");
  const navigate = useNavigate();
  let user = SessionStorageService.getUserInfo();
  console.log("user", user);

  function getRecordsPerPage(width: number): number {
    if (width >= 1200) return 11; // xl
    if (width >= 992) return 9; // lg
    if (width >= 768) return 9; // md
    if (width >= 576) return 6; // sm
    return 6; // default for smaller screens
  }

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
    for (
      let i = 1;
      i <= Math.ceil(belediyeListe.length / recordsPerPage);
      i++
    ) {
      newPageNumbers.push(i);
    }
    setPageNumbers(newPageNumbers);
  }, [belediyeListe, recordsPerPage]);

  useEffect(() => {
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    setCurrentRecords(
      belediyeListe.slice(indexOfFirstRecord, indexOfLastRecord)
    );
  }, [currentPage, belediyeListe, recordsPerPage]);

  useEffect(() => {
    if (user == null) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (searchBelediyeAdi === "") getBelediyeListe();
    else {
      let filterbelediyeListe = belediyeListe.filter((item: any) => {
        return item.belediyeAdi
          .toLowerCase()
          .includes(searchBelediyeAdi.toLowerCase());
      });
      setBelediyeListe(filterbelediyeListe);
    }
  }, [searchBelediyeAdi]);

  useEffect(() => {
    if (islemYapildi) {
      getBelediyeListe();
      setIslemYapildi(false);
    }
  }, [islemYapildi]);

  useEffect(() => {
    if (!modalShow) {
      setSelectedUpdateItem(null);
    }
  }, [modalShow]);

  useEffect(() => {
    if (!deleteModalShow) {
      setSelectedDeleteItem(null);
    }
  }, [deleteModalShow]);

  const getBelediyeListe = () => {
    setIsLoadingTable(true);
    TanimlarAPI.getBelediye(undefined, undefined, undefined)
      .then((response) => {
        setBelediyeListe(response.data);
        console.log(response.data);
      })
      .catch(() => {
        showToast("API isteği hatası", "warning");
      })
      .finally(() => {
        setIsLoadingTable(false);
      });
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchBelediyeAdi(e.target.value);
  };

  const handleFilterClear = () => {
    setSearchBelediyeAdi("");
    getBelediyeListe();
  };

  interface BelediyeFormValues {
    belediyeAdi: string;
    kullaniciAdi: string | null;
    belediyeKodu: number | null;
  }

  const initialValues: BelediyeFormValues = {
    belediyeAdi: "",
    kullaniciAdi: user.kullaniciKodu,
    belediyeKodu: null,
  };

  const belediyeRegisterSchema = Yup.object().shape({
    belediyeAdi: Yup.string().required(),
  });

  async function handleSaveBelediye(values: BelediyeFormValues) {
    setIsLoading(true);
    try {
      console.log("çalıstı", values);
      const response = await TanimlarAPI.saveBelediye(values);
      console.log(response.data);
      if (response.data.sonuc === 0) {
        await getBelediyeListe();
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

  async function handleUpdateBelediye(values: BelediyeFormValues) {
    setIsLoading(true);
    try {
      const response = await TanimlarAPI.saveBelediye(values);
      console.log(response.data);
      if (response.data.sonuc === 0) {
        setIslemYapildi(true);
        showToast("Güncelleme Başarılı", "success");
      } else {
        showToast(response.data.sonucAciklama, "warning");
      }
    } catch (err) {
      console.log(err);
      showToast("API isteği hatası", "warning");
    } finally {
      setIsLoading(false);
      setModalShow(false);
    }
  }

  async function handleDeleteBelediye(belediyeKodu: number) {
    setIsLoading(true);
    try {
      const response = await TanimlarAPI.deleteBelediye(belediyeKodu);
      if (response.data.sonuc === 0) {
        setIslemYapildi(true);
        showToast("Silme Başarılı", "success");
      } else {
        showToast(response.data.sonucAciklama, "warning");
      }
    } catch (err) {
      showToast("API isteği hatası", "warning");
    } finally {
      setIsLoading(false);
      setDeleteModalShow(false);
    }
  }

  return (
    <div className="container mt-4">
      <div className="card p-1 shadow">
        <Formik
          initialValues={initialValues}
          validationSchema={belediyeRegisterSchema}
          onSubmit={(values, { resetForm }) => {
            handleSaveBelediye(values);
            resetForm();
          }}
        >
          {(formikProps) => (
            <Form
              id="kayit-form"
              className="d-flex flex-column justify-content-center p-2"
            >
              <div className="row">
                <div className="form-group w-100 mb-2">
                  <TextField
                    fullWidth
                    size="small"
                    type="text"
                    {...formikProps.getFieldProps("belediyeAdi")}
                    label="Belediye Adı"
                    className={`form-control ${
                      formikProps.errors.belediyeAdi &&
                      formikProps.touched.belediyeAdi
                        ? "is-invalid"
                        : ""
                    }`}
                  />
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
        <div className="d-flex flex-row align-items-center gap-2">
          <button
            className="btn btn-sm btn-light border"
            onClick={getBelediyeListe}
          >
            Liste Yenile
          </button>
          <button
            onClick={handleFilterClear}
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
              <th></th>
              <th>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Belediye Adı"
                  value={searchBelediyeAdi}
                  onChange={handleFilterChange}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoadingTable ? (
              <tr>
                <td colSpan={2} className="text-center">
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                </td>
              </tr>
            ) : currentRecords.length > 0 ? (
              currentRecords.map((item: any, index: any) => (
                <tr key={index}>
                  <td>
                    <div className="d-flex flex-row justify-content-center gap-1">
                      <button
                        onClick={() => {
                          setModalShow(true);
                          setSelectedUpdateItem(item);
                        }}
                        className="btn btn-warning btn-sm"
                      >
                        <PencilSquare className="text-white" />
                      </button>
                      <button
                        onClick={() => {
                          setDeleteModalShow(true);
                          setSelectedDeleteItem(item);
                        }}
                        className="btn btn-danger btn-sm"
                      >
                       <Trash />
                      </button>
                    </div>
                  </td>
                  <td>{item.belediyeAdi}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2}>Kayıt Bulunamadı</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {belediyeListe.length > 0 && (
        <PaginationComponent
          data={belediyeListe}
          pageNumbers={pageNumbers}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      )}

      {modalShow && (
        <Modal show={modalShow} onHide={() => setModalShow(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Belediye Güncelle</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedUpdateItem && (
              <Formik
                initialValues={{
                  belediyeAdi: selectedUpdateItem.belediyeAdi,
                  kullaniciAdi: user.kullaniciKodu,
                  belediyeKodu: selectedUpdateItem.belediyeKodu,
                }}
                validationSchema={belediyeRegisterSchema}
                onSubmit={(values) => handleUpdateBelediye(values)}
              >
                {(formikProps) => (
                  <Form
                    id="guncelle-form"
                    className="d-flex flex-column justify-content-center p-2"
                  >
                    <div className="row">
                      <div className="form-group w-100 mb-2">
                        <TextField
                          fullWidth
                          size="small"
                          type="text"
                          {...formikProps.getFieldProps("belediyeAdi")}
                          label="Belediye Adı"
                          className={`form-control ${
                            formikProps.errors.belediyeAdi &&
                            formikProps.touched.belediyeAdi
                              ? "is-invalid"
                              : ""
                          }`}
                        />
                      </div>
                    </div>
                    <Button
                      type="submit"
                      className="mt-2 w-100"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      ) : (
                        "Güncelle"
                      )}
                    </Button>
                  </Form>
                )}
              </Formik>
            )}
          </Modal.Body>
        </Modal>
      )}

      {deleteModalShow && (
        <Modal show={deleteModalShow} onHide={() => setDeleteModalShow(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Belediye Sil</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Bu belediyeyi silmek istediğinizden emin misiniz?</p>
            <Button 
              onClick={() => handleDeleteBelediye(selectedDeleteItem.belediyeKodu)}
              className="btn btn-danger"
              disabled={isLoading}
            >
              {isLoading ? (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              ) : (
                "Sil"
              )}
            </Button>
            <Button
              onClick={() => setDeleteModalShow(false)}
              className="btn btn-secondary"
              disabled={isLoading}
            >
              Vazgeç
            </Button>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default BelediyePage;
