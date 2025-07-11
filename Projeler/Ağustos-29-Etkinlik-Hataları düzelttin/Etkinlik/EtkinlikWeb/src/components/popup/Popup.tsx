import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import QRCode from "react-qr-code";
import { Formik, Form } from "formik";
import styled, { createGlobalStyle } from "styled-components";
import MisafirListeAPI from "../../api/MisafirListeAPI";
import { showToast } from "../../helper/ToastifyHelper";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { MenuItem, TextField } from "@mui/material";
import SessionStorageService from "../../services/StorageService";

interface PopupModalProps {
  show: boolean;
  onHide: () => void;
  type: string;
  selectedItem?: any;
  qrData: any;
  islemYapildi: () => void;
  unvanListe: any[];
  belediyeListe: any[];
}

const GlobalStyle = createGlobalStyle<{ isimBastir: boolean }>`
  @media print {
    body * {
      visibility: hidden;
    }
    #printContainer, #printContainer * {
      visibility: visible;
    }
    #printContainer {
      position: absolute;
      margin-top:-250px;
      left: %50;
      transform: ${(props) => (props.isimBastir ? " translate(-50%, -50%)" : "translate(-38%, -70%)")}
      margin: 0;
      padding: 0;
      width: ${(props) => (props.isimBastir ? '100%' : '104mm')};
      height: ${(props) => (props.isimBastir ? '100%' : '154mm')};
    }
    #qrCodePrint {
      position: relative;
      margin: auto;
      padding: 0;
      width: ${(props) => (props.isimBastir ? '150mm' : '104mm')};
      height: ${(props) => (props.isimBastir ? '100mm' : '154mm')};
    }
  }
`;

const QRCodePrintContainer = styled.div<{ isimBastir: boolean }>`
  overflow: hidden;
  width: ${(props) => (props.isimBastir ? '150mm' : '104mm')};
  height: ${(props) => (props.isimBastir ? '100mm' : '154mm')};
`;

const PopupModal: React.FC<PopupModalProps> = ({
  show,
  onHide,
  type,
  selectedItem,
  qrData,
  islemYapildi,
  unvanListe,
  belediyeListe,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPersonel, setIsPersonel] = useState(false);
  const [isimBastir, setIsimBastir] = useState(false);

  const user = SessionStorageService.getUserInfo();

  const mmToPx = (mm: any) => mm * 3.7795275591;

  const downloadPdf = (misafirKodu: any) => {
    const printContainer = document.getElementById("printContainer");

    const pdfWidth = isimBastir ? 90 : 104;
    const pdfHeight = isimBastir ? 50 : 154;
    const pdfWidthPx = mmToPx(pdfWidth);
    const pdfHeightPx = mmToPx(pdfHeight);

    html2canvas(printContainer!, {
      useCORS: true,
      scale: 2,
      width: pdfWidthPx,
      height: pdfHeightPx,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: [pdfWidth, pdfHeight],
      });

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${misafirKodu}.pdf`);
    });
  };

  const deleteMisafir = (misafirKodu: number) => {
    setIsLoading(true);
    MisafirListeAPI.deleteMisafir(misafirKodu)
      .then((response) => {
        if (response.data.sonuc === 0) {
          showToast("Silme işlemi başarılı", "success");
          islemYapildi();
          onHide();
        } else {
          showToast(response.data.sonucAciklama, "warning");
        }
      })
      .catch(() => {
        showToast("API isteği hatası", "error");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const renderContent = () => {
    switch (type) {
      case "sil":
        return (
          <>
            <Modal.Body>Bu kayıtı silmek istediğinizden emin misiniz?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={onHide}>
                Hayır
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  deleteMisafir(Number(selectedItem.misafirKodu));
                }}
              >
                Evet
              </Button>
            </Modal.Footer>
          </>
        );
      case "guncelle":
        return (
          <Modal.Body>
            {selectedItem != null ? (
              <Formik
                initialValues={{
                  adi: selectedItem.adi || "",
                  soyadi: selectedItem.soyadi || "",
                  belediyeAdi: selectedItem.belediyeAdi || "",
                  kullaniciAdi: user.kullaniciKodu,
                  misafirKodu: selectedItem.misafirKodu,
                  unvan: selectedItem.unvan || "",
                  unvanKodu: selectedItem.unvanKodu || null,
                  belediyeKodu: selectedItem.belediyeKodu || null,
                }}
                onSubmit={(values, { resetForm }) => {
                  setIsLoading(true);
                  MisafirListeAPI.saveMisafir(values)
                    .then((response) => {
                      if (response.data.sonuc === 0) {
                        showToast("Güncelleme Başarılı", "success");
                        islemYapildi();
                        onHide();
                      } else {
                        showToast(response.data.sonucAciklama, "warning");
                      }
                    })
                    .catch(() => {
                      showToast("API isteği hatası", "warning");
                    })
                    .finally(() => {
                      setIsLoading(false);
                      resetForm();
                    });
                }}
              >
                {({
                  isSubmitting,
                  values,
                  setFieldValue,
                  errors,
                  touched,
                  getFieldProps,
                }) => (
                  <Form
                    id="kayit-form"
                    className="d-flex flex-column justify-content-center p-2"
                  >
                    <div className="d-flex justify-content-between flex-column w-100 gap-1">
                      <div className="form-group w-100 mb-2">
                        <TextField
                          size="small"
                          type="text"
                          {...getFieldProps("adi")}
                          label="Ad"
                          className={`form-control ${
                            errors.adi && touched.adi ? "is-invalid" : ""
                          }`}
                        />
                      </div>
                      <div className="form-group w-100 mb-2">
                        <TextField
                          size="small"
                          type="text"
                          {...getFieldProps("soyadi")}
                          label="Soyad"
                          className={`form-control ${
                            errors.soyadi && touched.soyadi ? "is-invalid" : ""
                          }`}
                        />
                      </div>
                      <div className="form-group w-100 mb-2">
                        <TextField
                          size="small"
                          select
                          value={values.belediyeKodu}
                          onChange={(event) => {
                            const selectedOption = belediyeListe.find(
                              (option: any) =>
                                option.belediyeKodu === event.target.value
                            );
                            setFieldValue("belediyeAdi", selectedOption ? selectedOption.belediyeAdi : "");
                            setFieldValue("belediyeKodu", event.target.value === "" ? null : Number(event.target.value));
                          }}
                          variant="outlined"
                          label="Belediye"
                          className={`form-control ${
                            errors.belediyeKodu && touched.belediyeKodu
                              ? "is-invalid"
                              : ""
                          }`}
                        >
                          <MenuItem value="">Seçiniz..</MenuItem>
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
                      <div className="form-group w-100 mb-2">
                        <TextField
                          size="small"
                          select
                          value={values.unvanKodu}
                          onChange={(event: any) => {
                            const selectedOption = unvanListe.find(
                              (option) => option.unvanKodu === event.target.value
                            );
                            setFieldValue("unvan", selectedOption ? selectedOption.unvanAdi : "");
                            setFieldValue("unvanKodu", event.target.value === "" ? null : Number(event.target.value));
                          }}
                          variant="outlined"
                          label="Ünvan"
                          className={`form-control ${
                            errors.unvanKodu && touched.unvanKodu
                              ? "is-invalid"
                              : ""
                          }`}
                        >
                          <MenuItem value="">Seçiniz..</MenuItem>
                          {unvanListe.map((option: any) => (
                            <MenuItem key={option.unvanKodu} value={option.unvanKodu}>
                              {option.unvanAdi}
                            </MenuItem>
                          ))}
                        </TextField>
                      </div>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={onHide}>
                          Vazgeç
                        </Button>
                        <Button type="submit" variant="primary" disabled={isSubmitting}>
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
                      </Modal.Footer>
                    </div>
                  </Form>
                )}
              </Formik>
            ) : (
              <p>Item not found.</p>
            )}
          </Modal.Body>
        );
      case "yazdir":
        return (
          <>
            <Modal.Body>
              <div
                onClick={() => setIsPersonel(!isPersonel)}
                style={{ width: "400px", margin: "auto" }}
                className="form-control mb-1"
              >
                <input
                  className="me-2"
                  checked={isPersonel}
                  onChange={(e) => setIsPersonel(e.target.checked)}
                  type="checkbox"
                />
                <label htmlFor="">Personel Kartı mı?</label>
              </div>
              <div
                onClick={() => setIsimBastir(!isimBastir)}
                style={{ width: "400px", margin: "auto" }}
                className="form-control mb-1"
              >
                <input
                  className="me-2"
                  checked={isimBastir}
                  onChange={(e) => setIsimBastir(e.target.checked)}
                  type="checkbox"
                />
                <label htmlFor="">Yalnız İsim Bastır ?</label>
              </div>

              <div id="printContainer">
                <QRCodePrintContainer
                  id="qrCodePrint"
                  isimBastir={isimBastir}
                  className="text-center d-flex flex-column justify-content-between"
                >
                  {isimBastir ? null : (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        height: "5%",
                        backgroundColor: "#203a77",
                        alignItems: "center",
                        width: "100%",
                        marginBottom: "10px",
                      }}
                    >
                      {(qrData.unvan === "BAŞKAN" || qrData.unvan === "BAŞKAN YARDIMCISI" || qrData.unvanAdi === "EŞ BAŞKAN") ? (
                        <div
                          style={{
                            backgroundColor: "white",
                            borderRadius: "50%",
                            height: "12px",
                            width: "12px",
                          }}
                        ></div>
                      ) : null}
                    </div>
                  )}
                  {isimBastir ? null : (
                    <div className="d-flex flex-row w-100 justify-content-end pe-4">
                      <img width={180} height={"auto"} src="sampas-logo.svg" alt="" />
                    </div>
                  )}

                  <div
                    className={
                      !isPersonel
                        ? "flex-grow-1 d-flex flex-column justify-content-evenly mx-3"
                        : "flex-grow-1 d-flex flex-column justify-content-center gap-3 mx-3"
                    }
                  >
                    <p className="break-word" style={isimBastir?{ fontSize: "64px", fontWeight: "bold", lineHeight: 1 }:qrData.misafirKodu!==1300?{ fontSize: "46px", fontWeight: "bold", lineHeight: 1 }:{ fontSize: "44px", fontWeight: "bold", lineHeight: 1 }}>
                      {qrData.adi != null ? qrData.adi.toUpperCase() : null}{" "}
                      {qrData.soyadi != null ? qrData.soyadi.toUpperCase() : null}
                    </p>
                    <p className="break-word" style={isimBastir?{ fontSize: "40px", fontWeight: "600", lineHeight: 1 }:{ fontSize: "28px", fontWeight: "600", lineHeight: 1 }}>
                      {qrData.unvanAdi != null ? qrData.unvanAdi.toUpperCase() : null}
                    </p>
                    <p className="break-word" style={isimBastir?{ fontSize: "40px", fontWeight: "600", lineHeight: 1 }:{ fontSize: "28px", fontWeight: "600", lineHeight: 1 }}>
                      {qrData.belediyeAdi != null ? qrData.belediyeAdi.toUpperCase() : null}
                    </p>
                  </div>

                  {isimBastir ? null : !isPersonel && (
                    <div className="p-3 d-flex justify-content-center">
                      <QRCode size={140} value={qrData.misafirKodu.toString()} />
                    </div>
                  )}
                  {isimBastir ? null : (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        height: "5%",
                        backgroundColor: "#203a77",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      {(qrData.unvanAdi === "BAŞKAN" || qrData.unvanAdi === "BAŞKAN YARDIMCISI" || qrData.unvanAdi === "EŞ BAŞKAN") ? (
                        <div
                          style={{
                            backgroundColor: "white",
                            borderRadius: "50%",
                            height: "12px",
                            width: "12px",
                          }}
                        ></div>
                      ) : null}
                    </div>
                  )}
                </QRCodePrintContainer>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={onHide}>
                Vazgeç
              </Button>
              <Button variant="danger" onClick={() => downloadPdf(qrData.misafirKodu.toString())}>
                Pdf İndir
              </Button>
              <Button variant="primary" onClick={() => window.print()}>
                Yazdır
              </Button>
            </Modal.Footer>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <GlobalStyle isimBastir={isimBastir} />
      <Modal.Header closeButton>
        <Modal.Title>
          {type === "sil"
            ? "Kayıt Sil"
            : type === "guncelle"
            ? "Kayıt Güncelle"
            : "Qr Code"}
        </Modal.Title>
      </Modal.Header>
      {renderContent()}
    </Modal>
  );
};

export default PopupModal;
