import { useEffect, useState, useRef } from "react"; 
import { Box, Typography, Button } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { useRootContext } from '@RootContext'
/*********************************************
 * @name testPage.jsx
 * @description  
 * - 기능 테스트 페이지
**********************************************/
export default function TestPage() {
 
  const { setPopup, setOnLoading } = useRootContext();

  return (
    <Box m={2}>
      <Typography variant="h5" gutterBottom>
        테스트 페이지
      </Typography>
    </Box>
  );
}