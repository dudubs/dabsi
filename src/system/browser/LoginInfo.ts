import { Awaited } from "../../common/typings";
import { SystemApp } from "../common/SystemApp";

type LoginInfoPayload = Awaited<
  ReturnType<typeof SystemApp.service.getLoginInfo>
>;

export class LoginInfo {
  constructor(public payload: LoginInfoPayload) {}

  get isSuccess() {
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
