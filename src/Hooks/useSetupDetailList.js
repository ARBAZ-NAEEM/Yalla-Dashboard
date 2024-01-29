import React from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

/**
 * Get Setup Detail List from Setup Master
 * @param {int} id Setup Master Id for Filter
 * @param {?int} parentId ParentId for Master Selection
 * @returns [state, setState]
 */
const useSetupDetailList = (id, parentId = null) => {
  const {
    SupportingTables: { MasterDropdown }
  } = useSelector((state) => state.CrudFormReducer);

  const [value, setValue] = useState([]);

  const getTableList = useCallback(() => {
    let tableList = MasterDropdown?.filter(
      (x) =>
        x.SetupMasterId == id && (x.parentid == parentId || parentId === null)
    );
    setValue(tableList);
  }, [parentId, id, MasterDropdown]);

  useEffect(() => {
    getTableList();
  }, [parentId, getTableList]);

  return [value, setValue];
};

export default useSetupDetailList;
