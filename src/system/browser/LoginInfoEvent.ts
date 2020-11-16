import { Awaited } from "../../common/typings";
import { LoginInfo } from "../common/SystemApp";

type LoginInfoPayload = Awaited<LoginInfo>;

export class LoginInfoEvent {
  constructor(public payload: LoginInfoPayload) {}

  isSuccess(): this is any {
    return this.payload.type === "SUCCESS";
  }

  get success(): Extract<LoginInfoPayload, { type: "SUCCESS" }> | undefined {
    if (this.payload.type === "SUCCESS") {
      return this.payload;
    }
  }

  get isAdmin() {
    return this.success?.isAdmin || false;
  }
}

/*


  <ReactorProvider>

 */
