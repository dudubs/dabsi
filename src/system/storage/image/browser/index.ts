import { commandSystemRpcOnBrowser } from "@dabsi/system/browser";
import { catchSystemCommand } from "@dabsi/system/common/SystemRpc";
import { ImageRpcConnection } from "@dabsi/system/storage/image/ImageRpc";

commandSystemRpcOnBrowser(
  {
    formData: (() => {
      const fd = new FormData();
      fd.set("test", "hello");
      return fd;
    })(),
  },
  () =>
    ImageRpcConnection({
      field: "test",
    })
);

console.log("x");
