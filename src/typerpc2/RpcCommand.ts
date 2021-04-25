import { Reflector } from "@dabsi/common/reflection/Reflector";
import { inspect } from "@dabsi/logging/inspect";
import { RpcMemberType, RpcMembers } from "@dabsi/typerpc2/RpcMembers";
import { RpcError } from "@dabsi/typerpc2/RpcError";
import { capitalize } from "@material-ui/core";

export type RpcCommand = (payload: any[]) => Promise<any>;
