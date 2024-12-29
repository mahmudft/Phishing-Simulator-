import { Client } from "../ApiClient/client";
import { useEffect, useState } from "react";

import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import EmailIcon from '@mui/icons-material/Email';
import DraftsIcon from '@mui/icons-material/Drafts';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { AttemptInterface, EmailStatus } from "../interfaces/attempt.interfaces";

const Phisings: React.FC = () => {
  const [items, setItems] = useState<Array<AttemptInterface>>([]);


  const getStatusIcon = (status: EmailStatus | string) => {
    const emailStatus = typeof status === "string" ? parseInt(status, 10) : status; 
  
    switch (emailStatus) {
      case EmailStatus.SENT: 
        return <EmailIcon color={"primary"} />;
      case EmailStatus.OPENED:
        return <DraftsIcon color={"success"} />;
      case EmailStatus.FAILED:
        return <CloseIcon color={"error"} />;
      default:
        return null; 
    }
  };

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
                {getStatusIcon(row.status)}
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
