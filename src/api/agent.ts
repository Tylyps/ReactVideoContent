import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { history } from "..";
import { DeviceInfo } from "../helpers/constants";
import { MediaRequest, MediaResponse, SingleMediaResponse } from "../models/media";
import { SignedUserModel, SignInModel } from "../models/signIn";
import { store } from "../stores/store";

const requestWithDeviceInfo = (requestBody?: any) => {
  const requestWithDevice = {
    Device: {
      PlatformCode: DeviceInfo.PlatformCode,
      Name: DeviceInfo.Name
    },
    ...requestBody
  }
  return requestWithDevice;
}

axios.defaults.baseURL = "https://thebetter.bsgroup.eu/";

axios.interceptors.response.use(undefined, (error: AxiosError) => {
  const { data, status, config, headers } = error.response!;

  switch(status) {
    case 400:
      if (typeof data === "string") {
        toast.error(data);
      }

      if(config.method === "get" && data.errors.hasOwnProperty("id")) {
        history.push("/not-found");
      }

      if(data.errors) {
        const modalStateErrors = [];
        for(const key in data.errors) {
          if(data.errors[key]){
            modalStateErrors.push(data.errors[key]);
          }
        }
        throw modalStateErrors.flat();
      }
      break;
    case 401:
      if(headers['www-authenticate']?.startsWith('Bearer error="invalid_token"')) {
        store.userStore.logout();
        toast.error("Session expired - please login again");
      } else if (data.Message) {
        toast.error(data.Message);
      }
      break;
    case 404:
      toast.error("Not found");
      history.push("/not-found");
      break;
    case 500:
      toast.error("Server error");
      break;
  }
  return Promise.reject(error);

})

axios.interceptors.request.use((config) => {
  const token = store.userStore.token;
  if(token) config.headers.Authorization = `Bearer ${token}`;
  return config;
})

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T> (url: string) => axios.get<T>(url).then(responseBody),
  post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
  put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody)
}

const Account = {
  login: (user: SignInModel) => {
    return requests.post<SignedUserModel>("/Authorization/SignIn", requestWithDeviceInfo(user))
  },
  loginAnonymously: () => {
    return requests.post<SignedUserModel>("/Authorization/SignIn", requestWithDeviceInfo());
  },
  refreshToken: () => {
    const token = {
      Token: store.userStore.token
    }
    return requests.post<SignedUserModel>("/Authorization/RefreshToken", requestWithDeviceInfo(token));
  }
}

const Media = {
  getList: (mediaListInfo: MediaRequest) => requests.post<MediaResponse>("/Media/GetMediaList", mediaListInfo),
  getMediaPlay: (id: string) => {
    const dataToSend = {
      MediaId: parseInt(id),
      StreamType: store.userStore.streamType
    }
    return requests.post<SingleMediaResponse>("/Media/GetMediaPlayInfo", dataToSend);
  }
}

const agent = {
  Account,
  Media
};

export default agent;