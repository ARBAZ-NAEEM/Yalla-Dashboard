export const checkUGdocumentsList = (documentData) => {
  let cond = false;
  if (documentData.some((x) => x.DocumentTypeID === 3246)) {
    if (documentData.some((x) => x.DocumentTypeID === 3247)) {
      if (documentData.some((x) => x.DocumentTypeID === 3248)) {
        if (documentData.some((x) => x.DocumentTypeID === 3249)) {
          cond = true;
        } else {
          cond = false;
        }
      } else {
        cond = false;
      }
    } else {
      cond = false;
    }
  } else {
    cond = false;
  }
  return cond;
};
