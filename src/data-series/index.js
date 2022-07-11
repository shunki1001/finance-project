import React, { useEffect, useState } from "react";

import { db } from "../firebase";
import { collection, where, query, getDocs } from "firebase/firestore";

import Chart from "react-apexcharts";

import categories from "../select-variables/categories";

const categoriesOfLife = categories.map((item) => {
  return item.value;
});

const categoriesLIst = ["固定費"].concat(categoriesOfLife);

const DataSeries = (props) => {
  const { setLoading } = props;
  // Chartのオプション、データを初期化
  const [state, setState] = useState({
    options: {
      chart: {
        type: "bar",
        stacked: true,
      },
      colors: [
        "#33a8c7",
        "#52e3e1",
        "#a0e426",
        "#fdf148",
        "#ffab00",
        "#f77976",
        "#f050ae",
        "#d883ff",
        "#9336fd",
      ],
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      stroke: {
        width: 1,
        colors: ["rgba(0,0,0,0.4)"],
      },
      xaxis: {
        categories: [
          "1月",
          "2月",
          "3月",
          "4月",
          "5月",
          "6月",
          "7月",
          "8月",
          "9月",
          "10月",
          "11月",
          "12月",
        ],
      },
      yaxis: {
        min: 0,
        max: 450000,
      },
      fill: {
        opacity: 0.9,
      },
      legend: {
        position: "top",
        horizontalAlign: "left",
        offsetX: 40,
      },
    },
    series: [{ name: "初期値", data: [30, 20, 10] }],
  });

  // firebaseから直接フィルタをかけてデータを読み込む
  const [sumData, setSumData] = useState({});
  console.log("関数が呼ばれた");
  //
  useEffect(() => {
    const f = async () => {
      for (let month = 0; month < 12; month++) {
        var tempObject = {};
        const startAt = new Date(2022, month, 1);
        const endAt = new Date(2022, month + 1, 1);

        for (let category = 0; category < categoriesLIst.length; category++) {
          // 生活費のカテゴリーごとの合計
          const q = query(
            collection(db, "daily"),
            where("month", ">=", startAt),
            where("month", "<", endAt),
            where("category", "==", categoriesLIst[category])
          );
          const df = await getDocs(q);

          var tempSum = 0;
          df.forEach((doc) => {
            if (doc.data().way != "from楽天" && doc.data().way != "fromSBI") {
              tempSum = tempSum + Number(doc.data().cost);
            } else {
              console.log("補充したね～");
            }
          });

          tempObject[categoriesLIst[category]] = tempSum;
        }
        // 固定費の合計
        const q2 = query(
          collection(db, "kotei"),
          where("month", ">=", startAt),
          where("month", "<", endAt)
        );
        const df2 = await getDocs(q2);

        var tempSum = 0;
        df2.forEach((doc) => {
          tempSum = tempSum + Number(doc.data().cost);
        });

        tempObject["固定費"] = tempSum;
        sumData[month] = tempObject;
      }
      // 状態変数にセット
      setSumData(sumData);

      // グラフのSeriesにセット
      const tempstate = categoriesLIst.map((item) => {
        return {
          name: item,
          data: [
            sumData[0][item],
            sumData[1][item],
            sumData[2][item],
            sumData[3][item],
            sumData[4][item],
            sumData[5][item],
            sumData[6][item],
            sumData[7][item],
            sumData[8][item],
            sumData[9][item],
            sumData[10][item],
            sumData[11][item],
          ],
        };
      });

      console.log("useEffectが呼ばれた");
      setLoading(false);
      setState({ ...state, series: tempstate });
    };
    // useEffectの戻り値はクリーンアップ関数じゃないとダメ
    // 上のはasync関数で戻り値がPromise型だからこのように書く必要あり
    f();
  }, []);

  return (
    <Chart
      type="bar"
      height={800}
      options={state.options}
      series={state.series}
    />
  );
};

export default DataSeries;
