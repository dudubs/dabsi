import { commandSystemRpcOnBrowser } from "@dabsi/system/core/browser";
import { catchSystemCommand } from "@dabsi/system/core/SystemRpc";
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
