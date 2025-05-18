import { useEffect, useState, useRef } from "react"; 
import { DataGrid } from '@mui/x-data-grid';
import { useRootContext } from '@RootContext'
/*******************************************************************************************/
//mui
import { Close, Description, Folder, ExpandMore, } from '@mui/icons-material';
import { Drawer, Button, Box, Typography,
    ListItem, ListItemText, ListItemIcon, ListItemButton,
    Accordion, AccordionSummary, AccordionDetails, List,
    Stack
} from '@mui/material';
/*******************************************************************************************/
/*******************************************************************************************/
//커스텀컴포넌트
import CatTextFieldBigOne from '../../components/CatTextFieldBigOne';
import CatBarcodeSimple from '../../components/CatBarcodeSimple';
import CatDataGrid from '../../components/CatDataGrid';
import CatButtonBigOne from '../../components/CatButtonBigOne';
import CatSelect from '../../components/CatSelect';
/*******************************************************************************************/
/*********************************************
 * @name DemoHistory.jsx
 * @description 이력 샘플 페이지
**********************************************/
export default function DemoHistory() {
  
  const { setPopup, setOnLoading } = useRootContext();

  // 가짜 데이터 생성
  const initialRows = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    barcode: `BCODE-${1000 + i}`,
    date: new Date(2025, 4, i + 1).toLocaleDateString(),
  }));

  const [rows, setRows] = useState(initialRows);
  const [selectionModel, setSelectionModel] = useState({
    type: "include",
    ids: new Set(),
  });

  // 삭제 버튼 클릭 핸들러
  const handleDeleteRow = (id) => {
    setRows(prev => prev.filter(row => row.id !== id));
    // 선택 모델에서도 제거 (선택된 상태에서 삭제했을 경우)
    setSelectionModel(prev => {
      const newIds = new Set(prev.ids);
      newIds.delete(id);
      return { ...prev, ids: newIds };
    });
  };

  // 컬럼 정의
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "barcode", headerName: "바코드", width: 150 },
    { field: "date", headerName: "입고일자", width: 150 },
    {
      field: "actions",
      headerName: "삭제",
      width: 100,
      renderCell: (params) => (
        <Button
          size="small"
          color="error"
          onClick={() => handleDeleteRow(params.row.id)}
        >
          삭제
        </Button>
      ),
    },
  ];

  // 선택 변경 핸들러
  const handleSelectionChange = (newSelection) => {
    setSelectionModel(Array.isArray(newSelection)
      ? { type: "include", ids: new Set(newSelection) }
      : newSelection
    );
  };

  // 부분 삭제 (선택된 행들 삭제)
  const handleDeleteSelected = () => {
    if (!selectionModel.ids || selectionModel.ids.size === 0) {
      setPopup("삭제 실패", "선택된 삭제 대상이 없습니다.");
      return;
    }
    setRows(prev => prev.filter(row => !selectionModel.ids.has(row.id)));
    setSelectionModel({ type: "include", ids: new Set() });
  };

  // 전체 삭제
  const handleDeleteAll = () => {
    if (rows.length === 0) {
      setPopup("삭제 실패", "삭제할 데이터가 없습니다.");
      return;
    }
    setRows([]);
    setSelectionModel({ type: "include", ids: new Set() });
  };

  useEffect(() => {
    console.log("현재 선택된 ID:", Array.from(selectionModel.ids));
  }, [selectionModel]);

  return (
    <Box m={2}>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          checkboxSelection
          rowSelectionModel={selectionModel}
          onRowSelectionModelChange={handleSelectionChange}
          getRowId={(row) => row.id}
          disableColumnMenu
          density="compact"
        />
      </Box>
      <Stack mb={2} display="row" gap={1} mt={2}>
        <CatButtonBigOne  
          buttonLabel = "선택 삭제"
          onClick={handleDeleteSelected}
        />
        <CatButtonBigOne  
          buttonLabel = "전체 삭제"
          onClick={handleDeleteAll}
          buttonStyle={{ height: 50, fontSize: 24, backgroundColor: "#f44336" }}
        />
      </Stack>
    </Box>
  );
}