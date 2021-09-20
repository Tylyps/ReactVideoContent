import { makeAutoObservable, reaction } from "mobx";
import { history } from "..";
import agent from "../api/agent";
import { SignInModel, TokenModel } from "../models/signIn";
import { UserModel } from "../models/user";
// import moment from "moment";

export default class UserStore {
  user?: UserModel;
  token?: string | null = window.localStorage.getItem("jwt");
  tokenExpDate?: string | null = window.localStorage.getItem("expDate");
  streamType?: "TRIAL" | "MAIN";

  constructor() {
    makeAutoObservable(this);
    reaction(
      () => this.token,
      token => {
        if(token){
          window.localStorage.setItem("jwt", token);
        } else {
          window.localStorage.removeItem("jwt");
        }
      }
    )
    reaction(
      () => this.tokenExpDate,
      tokenExpDate => {
        if(tokenExpDate){
          window.localStorage.setItem("expDate", tokenExpDate);
        } else {
          window.localStorage.removeItem("expDate");
        }
      }
    )
  }

  setToken = (token?: TokenModel) => {
    if(token) {
      this.token = token.Token;
      this.tokenExpDate = token.TokenExpires;
    } else {
      this.token = undefined;
      this.tokenExpDate = undefined;
    }
  }

  get isLoggedIn() {
    return !!this.user;
  }

  get hasValidToken() {
    return !!this.token;
    // Returned token is always 19-09-2021 so form that day is imposible to get fresh token
    // if(this.tokenExpDate){
    //   const validDate = moment(this.tokenExpDate, "YYYY-MM-DDThh:mm:ss");
    //   return validDate.isAfter(moment());
    // }
    // return false;
  }

  getUser = async () => {
    try {
      const user = await agent.Account.refreshToken();
      this.setToken(user.AuthorizationToken);
      this.user = user.User;
      history.push("/home");
    } catch (err) {
      throw(err);
    }
  }

  logout = () => {
    this.setToken(undefined);
    window.localStorage.removeItem("jwt");
    this.user = undefined;
    history.push("/");
  }

  login = async (data: SignInModel) => {
    try {
      const user = await agent.Account.login(data);
      this.setToken(user.AuthorizationToken);
      this.user = user.User;
      this.streamType = "MAIN";
      history.push("/home");
    } catch (err) {
      throw(err);
    }
  }

  loginAnonymously = async () => {
    try {
      const user = await agent.Account.loginAnonymously();
      this.setToken(user.AuthorizationToken);
      this.streamType = "TRIAL";
      this.user = user.User;
      history.push("/home");
    } catch (err) {
      throw(err);
    }
  }
}