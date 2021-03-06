import { db } from "../../firebase";
import {
  collection,
  deleteDoc,
  where,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";

// from mui
import { DataGrid } from "@mui/x-data-grid";

import categories from "../../select-variables/categories";
import ways from "../../select-variables/ways";
import { Snackbar } from "@mui/material";

const GetList = (props) => {
  const { collectionName, month } = props;

  var selectCategories = [];
  if (collectionName == "kotei") {
    selectCategories = [
      {
        value: "固定費",
        label: "固定費",
      },
    ];
  } else {
    selectCategories = categories;
  }
  const selectWays = ways;

  const [dataList, setDataList] = useState([]);
  const [checkboxSelection, setCheckboxSelection] = useState(true);
  const [selectedItem, setSelectedItem] = useState([]);

  const [errorOpen, setErrorOpen] = useState(false);

  // テーブルデータ
  const currencyFormatter = new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
  });
  const columns = [
    {
      field: "title",
      headerName: "内容",
      type: "string",
      width: 160,
      editable: true,
    },
    {
      field: "cost",
      headerName: "金額",
      type: "number",
      valueFormatter: ({ value }) => currencyFormatter.format(Number(value)),
      width: 100,
      editable: true,
    },
    {
      field: "month",
      headerName: "日付",
      type: "date",
      width: 100,
      editable: false,
    },
    {
      field: "category",
      headerName: "カテゴリー",
      type: "singleSelect",
      width: 100,
      editable: true,
      valueOptions: selectCategories,
    },
    {
      field: "way",
      headerName: "支払方法",
      type: "singleSelect",
      width: 150,
      editable: true,
      valueOptions: selectWays,
    },
  ];
  const rows = dataList.map((item) => {
    var todayTimestamp = new Date(item.month.seconds * 1000);
    return {
      id: item.id,
      title: item.title,
      cost: item.cost,
      month: `${todayTimestamp.getMonth() + 1}/${todayTimestamp.getDate()}`,
      category: `${item.category ? item.category : "固定費"}`,
      way: item.way,
    };
  });

  // Create

  // Read
  useEffect(() => {
    const startAt = new Date(2022, month - 1, 1);
    const endAt = new Date(2022, month, 1);
    const q = query(
      collection(db, collectionName),
      where("month", ">=", startAt),
      where("month", "<", endAt)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = [];
      var temp = [];
      querySnapshot.forEach((doc) => {
        temp = doc.data();
        temp["id"] = doc.id;
        data.push(temp);
      });
      // console.log(data);
      setDataList(data);
    });
    return () => unsubscribe();
  }, [month]);

  // Update
  const processRowUpdate = async (newRow, oldRow) => {
    // console.log(newRow);
    // console.log(oldRow);
    const updateData = {
      title: newRow.title,
      cost: newRow.cost,
      category: newRow.category,
      way: newRow.way,
    };
    await updateDoc(doc(db, collectionName, newRow.id), updateData);
    return { ...newRow };
  };

  // Delete
  const DeleteItems = () => {
    selectedItem.splice(-1, 1);
    console.log(selectedItem);
    selectedItem.map((item) => {
      console.log(item);
      deleteDoc(doc(db, collectionName, item));
    });
    setCheckboxSelection(!checkboxSelection);
  };

  return (
    <div style={{ height: "80vh", width: "100%" }}>
      <Button onClick={() => setCheckboxSelection(!checkboxSelection)} />
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={100}
        rowsPerPageOptions={[100]}
        checkboxSelection
        onSelectionModelChange={(ids) => {
          setSelectedItem([...ids, { id: ids }]);
        }}
        experimentalFeatures={{ newEditingApi: true }}
        processRowUpdate={(newRow, oldRow) => processRowUpdate(newRow, oldRow)}
        onProcessRowUpdateError={(error) => setErrorOpen(true)}
      />
      <Button variant="contained" onClick={DeleteItems}>
        DELETE
      </Button>
      <Snackbar
        message="更新に失敗しました"
        open={errorOpen}
        onClose={() => setErrorOpen(false)}
        autoHideDuration={6000}
      />
    </div>
  );
};

export default GetList;
