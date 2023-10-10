import Handler from "./handler";
import { v4 as uuidv4 } from "uuid";
import { WorkareaObject } from "@/types/utils";
class UtilsHandler {
  private handler: Handler;
  constructor(handler: Handler) {
    this.handler = handler;
  }
  getFileType(src: string) {
    if (!src) return;
    src = src.split("?")[0];
    if (src) {
      const number = src.lastIndexOf(".");
      const typeStr = src.substring(number + 1);
      return typeStr;
    }
    return "";
  }

  // 根据base64获取图片类型
  getBase64ImageType(src: string) {
    if (!src) return;
    const reg = /data:image\/([a-zA-Z]*);/;
    const res = src.match(reg);
    if (res && res[1]) {
      return res[1];
    } else {
      return "png";
    }
  }

  uuid() {
    return uuidv4();
  }

  find = (obj: WorkareaObject): WorkareaObject | null => this.findById(obj.id);

  findById = (id: string): WorkareaObject | null => {
    let findObject = null;
    const exist = this.handler.canvas
      .getObjects()
      .some((obj: WorkareaObject) => {
        if (obj.id === id) {
          findObject = obj;
          return true;
        }
        return false;
      });
    if (!exist) {
      return null;
    }
    return findObject;
  };
}

export default UtilsHandler;
