import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import AuthAPI from "./api/AuthAPI";
import { showToast } from "./helper/ToastifyHelper";
import { useEffect, useState } from "react";
import SessionStorageService from "./services/StorageService";

interface LoginFormValues {
  kullaniciKodu: string;
  sifre: string;
}

const initialValues: LoginFormValues = {
  kullaniciKodu: "",
  sifre: "",
};

const loginSchema = Yup.object().shape({
  kullaniciKodu: Yup.string().required(),
  sifre: Yup.string().required(),
});

const Login = () => {
  const navigate = useNavigate();
  let user = SessionStorageService.getUserInfo();
  useEffect(() => {
    if (user != null) {
      navigate("/home");
    }
  }, []);
  const [isLoading, setIsLoading] = useState(false);
  const handleLogin = (values: LoginFormValues) => {
    setIsLoading(true);
    console.log(values);
    AuthAPI.login(values)
      .then((response) => {
        if (response.data.sonuc === 0) {
          showToast("Giriş Başarılı", "success");
          console.log(response.data);
          
          localStorage.setItem('token',response.data.token);
          if(localStorage.getItem('token')!=null){
            SessionStorageService.setUserInfo(response.data);
          navigate("/home");
          }else{
            showToast("Token alınamadı", "warning");
          }
        } else {
          showToast(response.data.sonucAciklama, "warning");
        }
      })
      .catch((err) => {
        console.log(err);
        showToast(err.message, "warning");
        console.log(err.response.data.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div
      style={{
        height: "100vh",
        backgroundImage: "url(arkaplan.jpg)",
        backgroundSize: "cover",
      }}
      className="w-100 d-flex flex-column justify-content-center align-items-center"
    >
      <img
        style={{ position: "absolute", top: "20px", left: "20px" }}
        width={240}
        height={"auto"}
        src="sampas-logo.svg"
        alt=""
      />

      <div
        style={{ maxWidth: "500px"}}
        className="w-100 d-flex flex-column justify-content-center align-items-center card px-4 py-5 "
      >
        <div className="w-100 d-flex flex-column">
          <h2 className="mb-3">Etkinlik Sistem Giriş</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={loginSchema}
            onSubmit={handleLogin}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="form-group mb-2">
                  <label htmlFor="kullaniciKodu">Kullanıcı Adı</label>
                  <Field
                    name="kullaniciKodu"
                    type="text"
                    className={`form-control ${
                      errors.kullaniciKodu && touched.kullaniciKodu
                        ? "is-invalid"
                        : ""
                    }`}
                  />
                </div>

                <div className="form-group mb-2">
                  <label htmlFor="sifre">Parola</label>
                  <Field
                    name="sifre"
                    type="password"
                    className={`form-control ${
                      errors.sifre && touched.sifre ? "is-invalid" : ""
                    }`}
                  />
                </div>

                <button
                  style={{ backgroundColor: "#7266ba" }}
                  type="submit"
                  className="btn mt-3 w-100 text-white"
                >
                  {isLoading ? (
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  ) : (
                    "Giriş Yap"
                  )}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
