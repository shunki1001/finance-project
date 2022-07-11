import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, where, onSnapshot, query } from "firebase/firestore";

export const currencyFormatter = new Intl.NumberFormat("ja-JP", {
  style: "currency",
  currency: "JPY",
});
const yosan = 260000;

// Firebaseからのデータ読み込み
export const DataReading = (month) => {
  const [koteiList, setKoteiList] = useState([]);
  const [dailyList, setDailyList] = useState([]);
  const [cardList, setCardList] = useState([]);

  useEffect(() => {
    const startAt = new Date(2022, month - 1, 1);
    const endAt = new Date(2022, month, 1);
    // 固定費のデータ
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
    // 生活費のデータ
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
    // カード明細のデータ
    const q3 = query(collection(db, "card"), where("month", "==", month + 1));
    const unsubscribe3 = onSnapshot(q3, (querySnapshot) => {
      var data3 = [];
      var temp3 = [];
      querySnapshot.forEach((doc) => {
        temp3 = doc.data();
        temp3["id"] = doc.id;
        data3.push(temp3);
      });
      console.log(data3);
      setCardList(data3);
    });

    return () => {
      unsubscribe();
      unsubscribe2();
      unsubscribe3();
    };
  }, [month]);

  return [koteiList, dailyList, cardList];
};

// 毎月の残高計算
const DataCalculation = (props) => {
  const { month } = props;

  const data = DataReading(month);

  var sumKotei = 0;
  data[0].map((item) => {
    sumKotei += Number(item.cost);
  });

  var sumDaily = 0;
  data[1].map((item) => {
    sumDaily += Number(item.cost);
  });

  return (
    <>
      {Number(yosan - sumKotei - sumDaily) > 0 ? (
        <>{currencyFormatter.format(Number(yosan - sumKotei - sumDaily))} </>
      ) : (
        <span style={{ color: "red" }}>
          {currencyFormatter.format(Number(yosan - sumKotei - sumDaily))}
        </span>
      )}
    </>
  );
};

// 補充金額の合計
export const TemporarySumFromRakuten = (props) => {
  const { month } = props;
  const data = DataReading(month);

  var sumTemporaryRakuten = Number(0);
  data[1].map((item) => {
    if (item.way == "from楽天") {
      sumTemporaryRakuten -= Number(item.cost);
    } else {
    }
  });
  return <>{currencyFormatter.format(Number(sumTemporaryRakuten))}</>;
};
export const TemporarySumFromSbi = (props) => {
  const { month } = props;
  const data = DataReading(month);

  var sumTemporarySbi = Number(0);
  data[1].map((item) => {
    if (item.way == "fromSBI") {
      sumTemporarySbi -= Number(item.cost);
    } else {
    }
  });
  return <>{currencyFormatter.format(Number(sumTemporarySbi))}</>;
};

export default DataCalculation;
