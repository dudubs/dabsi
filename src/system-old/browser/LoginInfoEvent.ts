import { Awaited } from "../../common/typings2/Async";
import { LoginInfo } from "../common/SystemApp";

type LoginInfoData = Awaited<LoginInfo>;

export class LoginInfoEvent {
  constructor(public data: LoginInfoData) {}

  isSuccess(): this is any {
    return this.data.type === "SUCCESS";
  }

  get success(): Extract<LoginInfoData, { type: "SUCCESS" }> | undefined {
    if (this.data.type === "SUCCESS") {
      return this.data;
    }
  }

  get isAdmin() {
    return this.success?.isAdmin || false;
  }
}

/*


  <ReactorProvider>

 */
