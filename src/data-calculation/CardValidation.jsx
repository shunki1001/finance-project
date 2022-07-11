import { TableRows } from "@mui/icons-material";
import {
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { DataReading } from ".";
import { currencyFormatter } from ".";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "rgba(0,0,0,0.2)",
    color: "rgba(0,0,0,0.9)",
  },
}));

// 会員ページとの整合
export const CardValidation = (props) => {
  const { month } = props;
  const data = DataReading(month);

  // 入力データの合計
  var sumRakuten = 0;
  var sumT = 0;
  data[0].map((item) => {
    if (item.way == "楽天") {
      sumRakuten += Number(item.cost);
    } else if (item.way == "Tカード") {
      sumT += Number(item.cost);
    }
  });

  data[1].map((item) => {
    if (item.way == "楽天") {
      sumRakuten += Number(item.cost);
    } else if (item.way == "Tカード") {
      sumT += Number(item.cost);
    }
  });

  // カードのご利用明細
  var sumRakutenCard = 0;
  var sumTCard = 0;
  data[2].map((item) => {
    if (item.way == "楽天カード") {
      sumRakutenCard = item.cost;
    } else if (item.way == "Tカード") {
      sumTCard = item.cost;
    }
  });

  return (
    <>
      <TableContainer component={Paper} sx={{ width: "40vw" }}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>種類</StyledTableCell>
              <StyledTableCell>入力値</StyledTableCell>
              <StyledTableCell>明細</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <StyledTableCell>楽天</StyledTableCell>
              <StyledTableCell>
                {currencyFormatter.format(Number(sumRakuten))}
              </StyledTableCell>
              <StyledTableCell>
                {currencyFormatter.format(Number(sumRakutenCard))}
              </StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell>Tカード</StyledTableCell>
              <StyledTableCell>
                {currencyFormatter.format(Number(sumT))}
              </StyledTableCell>
              <StyledTableCell>
                {currencyFormatter.format(Number(sumTCard))}
              </StyledTableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CardValidation;
