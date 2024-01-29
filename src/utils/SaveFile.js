import { saveAs } from "file-saver";

export const SaveFile = (filePath , fileName) => {
  saveAs(filePath, fileName);
};
