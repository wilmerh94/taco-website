import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { useState } from 'react';

// const columns = [
//   { id: 'name', label: 'Name', minWidth: 170 },
//   { id: 'email', label: 'Email', minWidth: 170 },
//   { id: 'subject', label: 'Subject', minWidth: 200 },
//   {
//     id: 'timestamp',
//     label: 'Date',
//     minWidth: 170,
//     align: 'right',
//     format: value => value.toDate().toDateString()
//   }
// ];
// function createData (name, email, subject, timestamp) {
//   return { name, email, subject, timestamp };
// }
export const EmailList = ({ emails }) => {
  //   const rows = [emails];
  return (
    <Paper>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ minWidth: 170 }}>Name</TableCell>
              <TableCell style={{ minWidth: 170 }}>Email</TableCell>
              <TableCell style={{ minWidth: 170 }}>
                Subject
              </TableCell>
              <TableCell style={{ minWidth: 170 }} align="right">
                Date
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {emails.map(email => (
              <TableRow
                key={email.id}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 }
                }}
              >
                <TableCell> {email.name} </TableCell>
                <TableCell>{email.email}</TableCell>
                <TableCell>{email.subject}</TableCell>
                <TableCell align="right">
                  {email.timestamp.toDate().toDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
