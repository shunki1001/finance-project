import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, where, onSnapshot, query } from "firebase/firestore";

const currencyFormatter = new Intl.NumberFormat("ja-JP", {
  style: "currency",
  currency: "JPY",
});

// Firebaseからのデータ読み込み
export const DataReading = (month) => {
  const [koteiList, setKoteiList] = useState([]);
  const [dailyList, setDailyList] = useState([]);

  useEffect(() => {
    const startAt = new Date(2022, month - 1, 1);
    const endAt = new Date(2022, month, 1);
    const q = query(
      collection(db, "kotei"),
      where("month", ">=", startAt),
      where("month", "<", endAt)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      var data = [];
      var temp = [];
      querySnapshot.forEach((doc) => {
        temp = doc.data();
        temp["id"] = doc.id;
        data.push(temp);
      });
      // console.log(data);
      setKoteiList(data);
    });

    const q2 = query(
      collection(db, "daily"),
      where("month", ">=", startAt),
      where("month", "<", endAt)
    );
    const unsubscribe2 = onSnapshot(q2, (querySnapshot) => {
      var data2 = [];
      var temp2 = [];
      querySnapshot.forEach((doc) => {
        temp2 = doc.data();
        temp2["id"] = doc.id;
        data2.push(temp2);
      });
      // console.log(data);
      setDailyList(data2);
    });
    return () => {
      unsubscribe();
      unsubscribe2();
    };
  }, [month]);

  return [koteiList, dailyList];
};

// 毎月の残高計算
const DataCalculation = (props) => {
  const { month } = props;

  const yosan = 260000;
  const data = DataReading(month);

  var sumKotei = 0;
  data[0].map((item) => {
    sumKotei += Number(item.cost);
  });

  var sumDaily = 0;
  data[1].map((item) => {
    sumDaily += Number(item.cost);
  });

  return <>{currencyFormatter.format(Number(yosan - sumKotei - sumDaily))}</>;
};

// 固定費の合計
export const KoteiSum = (props) => {
  const { month } = props;

  const data = DataReading(month);

  var sumKotei = 0;
  data[0].map((item) => {
    sumKotei += Number(item.cost);
  });

  return <>{currencyFormatter.format(Number(sumKotei))}</>;
};

// 生活費の合計
export const DailySum = (props) => {
  const { month } = props;
  const data = DataReading(month);

  var sumDaily = 0;
  data[1].map((item) => {
    sumDaily += Number(item.cost);
  });
  return <>{currencyFormatter.format(Number(sumDaily))}</>;
};

export default DataCalculation;
