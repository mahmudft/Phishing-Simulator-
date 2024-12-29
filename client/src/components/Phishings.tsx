import { Client } from "../ApiClient/client";
import { useEffect, useState } from "react";

import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { AttemptInterface } from "../interfaces/attempt.interfaces";

const Phisings: React.FC = () => {
  const [items, setItems] = useState<Array<AttemptInterface>>([]);

  useEffect(() => {
    async function getAllAttempts() {
      try {
        let { data } = await Client.get<Array<AttemptInterface>>("/attempts");
        console.log(data);
        setItems(data);
      } catch (error) {
        console.log((error as Error).message);
      }
    }
    getAllAttempts();
  }, []);
  console.log(items);

  return (
    <TableContainer
      component={Paper}
      sx={{
        width: "100%",
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Recipient</TableCell>
            <TableCell>Body</TableCell>
            <TableCell>Link Click Count</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items?.length ? (items?.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.recipient}</TableCell>
              <TableCell
                sx={{
                  maxWidth: "200px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {row.body}
              </TableCell>
              <TableCell>{row.clickCount}</TableCell>
              <TableCell>
                {row.status ? (
                  <DoneIcon color={"success"} />
                ) : (
                  <CloseIcon color={"error"} />
                )}
              </TableCell>
            </TableRow>
          ))): <TableRow key={1}>
             <TableCell>{"No-Data"}</TableCell>
            </TableRow>}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Phisings;
