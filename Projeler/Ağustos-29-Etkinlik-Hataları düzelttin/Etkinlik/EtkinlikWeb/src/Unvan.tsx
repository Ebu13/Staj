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

const UnvanPage = () => {
  const [unvanListe, setUnvanListe] = useState([]);
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
  const [searchUnvanAdi, setSearchUnvanAdi] = useState<string>("");
  const navigate = useNavigate();
  let user = SessionStorageService.getUserInfo();

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
    for (let i = 1; i <= Math.ceil(unvanListe.length / recordsPerPage); i++) {
      newPageNumbers.push(i);
    }
    setPageNumbers(newPageNumbers);
  }, [unvanListe, recordsPerPage]);

  useEffect(() => {
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    setCurrentRecords(unvanListe.slice(indexOfFirstRecord, indexOfLastRecord));
  }, [currentPage, unvanListe, recordsPerPage]);

  useEffect(() => {
    if (user == null) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (searchUnvanAdi === "") {
      getUnvanListe();
    } else {
      let filterUnvanListe = unvanListe.filter((item: any) => {
        return item.unvanAdi
          .toLowerCase()
          .includes(searchUnvanAdi.toLowerCase());
      });
      setUnvanListe(filterUnvanListe);
    }
  }, [searchUnvanAdi]);

  useEffect(() => {
    if (islemYapildi) {
      getUnvanListe();
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

  const getUnvanListe = () => {
    setIsLoadingTable(true);
    TanimlarAPI.getUnvan(undefined, undefined, undefined)
      .then((response) => {
        setUnvanListe(response.data);
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
    setSearchUnvanAdi(e.target.value);
  };

  const handleFilterClear = () => {
    setSearchUnvanAdi("");
    getUnvanListe();
  };

  interface UnvanFormValues {
    unvanAdi: string;
    kullaniciAdi: string | null;
    unvanKodu: number | null;
  }

  const initialValues: UnvanFormValues = {
    unvanAdi: "",
    kullaniciAdi: user.kullaniciKodu,
    unvanKodu: null,
  };

  const unvanRegisterSchema = Yup.object().shape({
    unvanAdi: Yup.string().required(),
  });

  async function handleSaveUnvan(values: UnvanFormValues) {
    setIsLoading(true);
    try {
      console.log("calıstı", values);
      const response = await TanimlarAPI.saveUnvan(values);
      console.log(response.data);
      if (response.data.sonuc === 0) {
        await getUnvanListe();
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

  async function handleUpdateUnvan(values: UnvanFormValues) {
    setIsLoading(true);
    try {
      const response = await TanimlarAPI.saveUnvan(values);
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

  async function handleDeleteUnvan(unvanKodu: number) {
    setIsLoading(true);
    try {
      const response = await TanimlarAPI.deleteUnvan(unvanKodu);
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
          validationSchema={unvanRegisterSchema}
          onSubmit={(values, { resetForm }) => {
            handleSaveUnvan(values);
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
                    {...formikProps.getFieldProps("unvanAdi")}
                    label="Unvan Adı"
                    className={`form-control ${
                      formikProps.errors.unvanAdi &&
                      formikProps.touched.unvanAdi
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
            onClick={getUnvanListe}
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
                  placeholder="Unvan Adı"
                  value={searchUnvanAdi}
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
                  <td>{item.unvanAdi}</td>
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

      {unvanListe.length > 0 && (
        <PaginationComponent
          data={unvanListe}
          pageNumbers={pageNumbers}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      )}

      {modalShow && (
        <Modal show={modalShow} onHide={() => setModalShow(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Unvan Güncelle</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedUpdateItem && (
              <Formik
                initialValues={{
                  unvanAdi: selectedUpdateItem.unvanAdi,
                  kullaniciAdi: user.kullaniciKodu,
                  unvanKodu: selectedUpdateItem.unvanKodu,
                }}
                validationSchema={unvanRegisterSchema}
                onSubmit={(values) => handleUpdateUnvan(values)}
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
                          {...formikProps.getFieldProps("unvanAdi")}
                          label="Unvan Adı"
                          className={`form-control ${
                            formikProps.errors.unvanAdi &&
                            formikProps.touched.unvanAdi
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
            <Modal.Title>Unvan Sil</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Bu unvanı silmek istediğinizden emin misiniz?</p>
            <Button
              onClick={() => handleDeleteUnvan(Number(selectedDeleteItem.unvanKodu))}
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

export default UnvanPage;
