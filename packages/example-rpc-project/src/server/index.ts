import { Resolver } from "../../../../src/typedi";
import { Consumer } from "../../../../src/typedi/Consumer";
import { RpcConfigResolver } from "../../../../src/typerpc/RpcConfigResolver";
import { RpcProject } from "../../../../src/typerpc/RpcProject";
import { RpcRequest } from "../../../../src/typerpc/RpcRequest";
import { TodoListRpc } from "../common/TodoListRpc";
import { TodoListEntity } from "./TodoListEntity";

export default new RpcProject(
  TodoListRpc,
  Consumer(
    {
      rpcReq: RpcRequest,
    },
    c => $ => {
      c.rpcReq.push(async next => {
        console.log("before");
      });

      return $({
        async add(description) {
          const { id } = await TodoListEntity.create({
            description,
          }).save();
          return id;
        },
        get: ($, id) =>
          $({
            async update(description) {
              await TodoListEntity.update(id, { description });
              throw new Error();
            },
            async delete() {
              await TodoListEntity.delete(id);
            },
          }),
        getAll() {
          return TodoListEntity.find({ select: ["id", "description"] }).then(
            rows =>
              rows.map(({ id, description }) => ({
                id,
                description,
              }))
          );
        },
      });
    }
  )
);
