// const BASE_URL = "http://52.15.236.233:5000/api/";
const BASE_URL = "http://localhost:5000/api/";
export const SALIDA_ENTRADA = "entrada-salida";
export const EMPLOYES = "employes";
export const VALIDATE_EMPLOYES = "validate-employes";
export const DELETE_EMPLOYES = "delte-employes";
export const DEPARTMENTS = "departments";
export const LOGIN = "login";
export const USERS = "users";
export const EN_TURNO = "enturno";
export const AUTORIZAR_EXTRAS = "autorizar-extras";
export const REPORTE = "reports";

class API {
  async post(data, enpoint) {
    const config = {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(data),
    };
    try {
      const result = await fetch(BASE_URL + enpoint, config);
      const res = await result.json();
      return res;
    } catch (error) {
      console.log(error);
      return 0;
    }
  }
  async get(enpoint, params = null) {
    const config = {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    };
    try {
      const url = params
        ? `${BASE_URL}${enpoint}/${params}`
        : BASE_URL + enpoint;
      const result = await fetch(url, config);
      const res = await result.json();
      return res;
    } catch (error) {
      console.log(error);
      return 0;
    }
  }
}

export default new API();
