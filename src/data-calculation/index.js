import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, where, onSnapshot, query } from "firebase/firestore";

const currencyFormatter = new Intl.NumberFormat("ja-JP", {
  style: "currency",
  currency: "JPY",
});

const DataReading = () => {
  var today = new Date();
  var month = today.getMonth() + 1;

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

  var sumKotei = 0;
  koteiList.map((item) => {
    sumKotei += Number(item.cost);
  });

  var sumDaily = 0;
  dailyList.map((item) => {
    sumDaily += Number(item.cost);
  });

  return [sumKotei, sumDaily];
};

const DataCalculation = () => {
  const data = DataReading();

  const sumKotei = data[0];
  const sumDaily = data[1];

  return <>{currencyFormatter.format(Number(260000 - sumKotei - sumDaily))}</>;
};

export const KoteiSum = () => {
  const data = DataReading();

  const sumKotei = data[0];

  return <>{currencyFormatter.format(Number(sumKotei))}</>;
};

export const DailySum = () => {
  const data = DataReading();

  const sumDaily = data[1];

  return <>{currencyFormatter.format(Number(sumDaily))}</>;
};

export default DataCalculation;
