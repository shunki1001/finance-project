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

const GetList = (props) => {
  const { collectionName, month } = props;

  const [dataList, setDataList] = useState([]);
  const [checkboxSelection, setCheckboxSelection] = useState(true);
  const [selectedItem, setSelectedItem] = useState([]);

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
  ];
  const rows = dataList.map((item) => {
    var todayTimestamp = new Date(item.month.seconds * 1000);
    return {
      id: item.id,
      title: item.title,
      cost: item.cost,
      month: `${todayTimestamp.getMonth() + 1}/${todayTimestamp.getDate()}`,
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
    <div style={{ height: 600, width: "100%" }}>
      <Button onClick={() => setCheckboxSelection(!checkboxSelection)} />
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        onSelectionModelChange={(ids) => {
          setSelectedItem([...ids, { id: ids }]);
        }}
        experimentalFeatures={{ newEditingApi: true }}
        // processRowUpdate={(newRow, oldRow) => {
        //     console.log(newRow);
        //     console.log(oldRow);
        // }}
        onCellEditCommit={(params) => {
          console.log(params);
          var updateData = {};
          updateData[params.field] = params.value;
          updateDoc(doc(db, collectionName, params.id), updateData);
        }}
      />
      <Button variant="contained" onClick={DeleteItems}>
        DELETE
      </Button>
    </div>
  );
};

export default GetList;
