import { useEffect, useState, useRef } from "react"; 
import { DataGrid } from '@mui/x-data-grid';
import { useRootContext } from '@RootContext'
/*******************************************************************************************/
import CatTextFieldBigOne from '../../components/CatTextFieldBigOne';
import CatBarcodeSimple from '../../components/CatBarcodeSimple';
import CatDataGrid from '../../components/CatDataGrid';
import CatButtonBigOne from '../../components/CatButtonBigOne';
/*******************************************************************************************/
/*******************************************************************************************/
//mui
import { Close, Description, Folder, ExpandMore, DeleteOutline   } from '@mui/icons-material';
import { 
    Drawer, Button, Box, Typography, Stack,
    ListItem, ListItemText, ListItemIcon, ListItemButton,
    Accordion, AccordionSummary, AccordionDetails, List, TextField, IconButton,    
} from '@mui/material';
/*******************************************************************************************/
/*******************************************************************************************
 * @name DemoInput.jsx
 * @description PDA 기본 입력 데모 페이지
*******************************************************************************************/
export default function DemoInput({ }) {

  const { setPopup, setOnLoading } = useRootContext();
  const [barcode, setBarcode] = useState('');
  const [rows, setRows] = useState([]);

  const handleBarcodeChange = (event) => {
    setBarcode(event.target.value);
  };

  const handleRegister = () => {
    if (barcode.trim() === '') {
      setPopup('경고', '바코드를 입력해주세요.');
      return;
    }

    const newRow = {
      id: rows.length,
      barcode: barcode.trim(),
      registrationTime: new Date().toLocaleTimeString(),
    };
    setRows((prevRows) => [...prevRows, newRow]);
    setBarcode('');    
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleRegister();
    }
  };

  const handleDeleteRow = (idToDelete) => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== idToDelete));
  };

  const handleSaveAll = () => {
    setOnLoading(true); // 로딩 시작

    if (rows.length === 0) {
      setPopup('알림', '저장할 데이터가 없습니다.');
      setOnLoading(false); // 로딩 종료
      return;
    }

    // 2초 동안 로딩 시뮬레이션
    setTimeout(() => {
      setRows([]); // 데이터 그리드 배열 전체 비우기
      setPopup('성공', '저장 성공'); // 성공 팝업 표시
      setOnLoading(false); // 로딩 종료
    }, 2000);
  };

  const handleDeleteAll = () => {
    if (rows.length === 0) {
      setPopup('알림', '삭제할 데이터가 없습니다.');
      return;
    }
    setRows([]);
  };


  return (
    <Box m={2}>
      <Typography variant="h5" gutterBottom>
        PDA 입고 처리
      </Typography>
      <Box mb={2} display="flex" alignItems="center" gap={2}>
        <TextField
          label="바코드 입력"
          value={barcode}        
          onChange={handleBarcodeChange}
          onKeyDown={handleKeyDown} 
          variant="outlined"
          size="small"
          fullWidth
        />
        <Button variant="contained" onClick={handleRegister} fullWidth>
          등록
        </Button>
      </Box>

      <Box sx={{ height: 400, width: '100%', mt: 2 }}>
        <DataGrid
          rows={rows}
          columns={[
            {
                field: 'actions',
                headerName: '',
                width: 60,
                renderCell: (params) => (
                    <IconButton
                    aria-label="delete"
                    size="small"
                    color="error"
                    onClick={() => handleDeleteRow(params.row.id)}
                    >
                <DeleteOutline fontSize="small" />
                </IconButton>
                ),
            },
            { field: 'barcode', headerName: '바코드', width: 150 },
            { field: 'registrationTime', headerName: '등록 시간', width: 150 },
        ]}
          getRowId={(row) => row.id} // getRowId prop을 통해 id를 명시적으로 설정
          disableColumnMenu
          density="compact"
          disableSelectionOnClick
        />
      </Box>

      <Stack mt={2} gap={2}>        
        <CatButtonBigOne
          buttonLabel="전체 등록"
          onClick={handleSaveAll} // handleSaveAll 함수 연결
        />
        <CatButtonBigOne
            buttonLabel="전체 삭제" 
            onClick={handleDeleteAll} 
        />
      </Stack>
    </Box>
  );
}
