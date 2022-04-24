import React, { useEffect, useState, useRef } from "react";

import { db } from "../firebase";
import { collection, where, query, getDocs } from "firebase/firestore";

import Chart from "react-apexcharts";

const categories = [
  "固定費",
  "食料品",
  "外食",
  "日用品",
  "車",
  "その他",
  "旅行",
];

const DataSeries = (props) => {
  const { loading, setLoading } = props;
  // Chartのオプション、データを初期化
  const [state, setState] = useState({
    options: {
      chart: {
        type: "bar",
        stacked: true,
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      stroke: {
        width: 1,
        colors: ["#fff"],
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
        title: {
          text: undefined,
        },
      },
      fill: {
        opacity: 1,
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

        for (let category = 0; category < categories.length; category++) {
          // 生活費のカテゴリーごとの合計
          const q = query(
            collection(db, "daily"),
            where("month", ">=", startAt),
            where("month", "<", endAt),
            where("category", "==", categories[category])
          );
          const df = await getDocs(q);

          var tempSum = 0;
          df.forEach((doc) => {
            tempSum = tempSum + Number(doc.data().cost);
          });

          tempObject[categories[category]] = tempSum;
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
      // どうやってループ処理でこの形を作るのかわからん。。。
      const tempstate = [
        {
          name: categories[0],
          data: [
            sumData[0][categories[0]],
            sumData[1][categories[0]],
            sumData[2][categories[0]],
            sumData[3][categories[0]],
            sumData[4][categories[0]],
            sumData[5][categories[0]],
            sumData[6][categories[0]],
            sumData[7][categories[0]],
            sumData[8][categories[0]],
            sumData[9][categories[0]],
            sumData[10][categories[0]],
            sumData[11][categories[0]],
          ],
        },
        {
          name: categories[1],
          data: [
            sumData[0][categories[1]],
            sumData[1][categories[1]],
            sumData[2][categories[1]],
            sumData[3][categories[1]],
            sumData[4][categories[1]],
            sumData[5][categories[1]],
            sumData[6][categories[1]],
            sumData[7][categories[1]],
            sumData[8][categories[1]],
            sumData[9][categories[1]],
            sumData[10][categories[1]],
            sumData[11][categories[1]],
          ],
        },
        {
          name: categories[2],
          data: [
            sumData[0][categories[2]],
            sumData[1][categories[2]],
            sumData[2][categories[2]],
            sumData[3][categories[2]],
            sumData[4][categories[2]],
            sumData[5][categories[2]],
            sumData[6][categories[2]],
            sumData[7][categories[2]],
            sumData[8][categories[2]],
            sumData[9][categories[2]],
            sumData[10][categories[2]],
            sumData[11][categories[2]],
          ],
        },
        {
          name: categories[3],
          data: [
            sumData[0][categories[3]],
            sumData[1][categories[3]],
            sumData[2][categories[3]],
            sumData[3][categories[3]],
            sumData[4][categories[3]],
            sumData[5][categories[3]],
            sumData[6][categories[3]],
            sumData[7][categories[3]],
            sumData[8][categories[3]],
            sumData[9][categories[3]],
            sumData[10][categories[3]],
            sumData[11][categories[3]],
          ],
        },
        {
          name: categories[4],
          data: [
            sumData[0][categories[4]],
            sumData[1][categories[4]],
            sumData[2][categories[4]],
            sumData[3][categories[4]],
            sumData[4][categories[4]],
            sumData[5][categories[4]],
            sumData[6][categories[4]],
            sumData[7][categories[4]],
            sumData[8][categories[4]],
            sumData[9][categories[4]],
            sumData[10][categories[4]],
            sumData[11][categories[4]],
          ],
        },
        {
          name: categories[5],
          data: [
            sumData[0][categories[5]],
            sumData[1][categories[5]],
            sumData[2][categories[5]],
            sumData[3][categories[5]],
            sumData[4][categories[5]],
            sumData[5][categories[5]],
            sumData[6][categories[5]],
            sumData[7][categories[5]],
            sumData[8][categories[5]],
            sumData[9][categories[5]],
            sumData[10][categories[5]],
            sumData[11][categories[5]],
          ],
        },
      ];
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
