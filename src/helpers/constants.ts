export const DeviceInfo = {
  PlatformCode: "WEB",
  deviceId: "",
  set Name(id: string) {
    this.deviceId = id;
    if(window.localStorage) {
      window.localStorage.setItem("deviceID", id);
    }
  },
  get Name() {
    let id: any = "";
    if(window.localStorage) {
      id = window.localStorage.getItem("deviceID");
    }
    this.deviceId = id;
    return this.deviceId;
  }
}