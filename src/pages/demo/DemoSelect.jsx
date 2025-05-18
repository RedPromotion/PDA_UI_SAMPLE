import { useEffect, useState, useRef } from "react"; 
import { useRootContext } from '@RootContext'
/*******************************************************************************************/
//mui
import { Close, Description, Folder, ExpandMore, } from '@mui/icons-material';
import { Drawer, Button, Box, Typography, TextField,
    ListItem, ListItemText, ListItemIcon, ListItemButton,
    Accordion, AccordionSummary, AccordionDetails, List,
    Stack
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
/*******************************************************************************************/
/*******************************************************************************************/
//커스텀컴포넌트
import CatTextFieldBigOne from '../../components/CatTextFieldBigOne';
import CatBarcodeSimple from '../../components/CatBarcodeSimple';
import CatDataGrid from '../../components/CatDataGrid';
import CatButtonBigOne from '../../components/CatButtonBigOne';
import CatSelect from '../../components/CatSelect';
/*******************************************************************************************/
/*******************************************************************************************
 * @name DemoSelect.jsx
 * @description 선택 기능 시연 페이지 
*******************************************************************************************/

export default function DemoSelect({ }) {
  const { setPopup, setOnLoading } = useRootContext();
  const [barcodeInput, setBarcodeInput] = useState('');
  const [shipmentCompany, setShipmentCompany] = useState(COMPANIES[0].value); // 초기값 첫 번째 회사
  const [transportVehicle, setTransportVehicle] = useState(VEHICLES[0].value); // 초기값 첫 번째 차량
  const [gridRows, setGridRows] = useState([]);

  const handleBarcodeInputChange = (event) => {
    setBarcodeInput(event.target.value);
  };

  const handleAddBarcode = () => {
    if (barcodeInput.trim() === '') {
      setPopup('경고', '바코드를 입력해주세요.');
      return;
    }

    const now = new Date();
    const selectedCompany = COMPANIES.find((c) => c.value === shipmentCompany);
    const selectedVehicle = VEHICLES.find((v) => v.value === transportVehicle);

    const newRow = {
      id: gridRows.length, // 간단한 ID
      barcode: barcodeInput.trim(),
      shipmentCompany: selectedCompany ? selectedCompany.label : '',
      transportVehicle: selectedVehicle ? selectedVehicle.label : '',
      inputDate: now.toLocaleDateString(),
      inputTime: now.toLocaleTimeString(),
    };
    setGridRows((prevRows) => [...prevRows, newRow]);
    setBarcodeInput('');
  };

  const handleBarcodeInputKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleAddBarcode();
    }
  };

  const handleShipmentCompanyChange = (event) => {
    setShipmentCompany(event.target.value);
  };

  const handleTransportVehicleChange = (event) => {
    setTransportVehicle(event.target.value);
  };

  const handleShipment = () => {
    if (gridRows.length === 0) {
      setPopup('경고', '출하할 데이터가 없습니다.');
      return;
    }

    setOnLoading(true);
    setTimeout(() => {
      setGridRows([]);
      setPopup('성공', '출하되었습니다.');
      setOnLoading(false);
    }, 2000);
  };

  const columns = [
    { field: 'barcode', headerName: '바코드', width: 150 },
    { field: 'shipmentCompany', headerName: '출하 대상 업체', width: 180 },
    { field: 'transportVehicle', headerName: '운송 차량 (최대 무게)', width: 200 },
    { field: 'inputDate', headerName: '입력 날짜', width: 120 },
    { field: 'inputTime', headerName: '입력 시간', width: 120 },
  ];

  return (
    <Stack gap={1} ml={1} mr={1}>

      <Box display="flex" gap={1} alignItems="center">
        <TextField
          label="바코드 입력"
          value={barcodeInput}
          onChange={handleBarcodeInputChange}
          onKeyDown={handleBarcodeInputKeyDown}
          variant="outlined"
          size="small"
          fullWidth
        />
        <Button variant="contained" onClick={handleAddBarcode} size="small">
          추가
        </Button>
      </Box>

      <CatSelect
        label="출하 대상 업체"
        value={shipmentCompany}
        option={COMPANIES}
        onChange={handleShipmentCompanyChange}
      />
      <CatSelect
        label="운송 차량"
        value={transportVehicle}
        option={VEHICLES}
        onChange={handleTransportVehicleChange}
      />

      <Box sx={{ height: 400, width: '100%', mt: 2 }}>
        <DataGrid rows={gridRows} columns={columns} getRowId={(row) => row.id} />
      </Box>

      <CatButtonBigOne buttonLabel="출하" onClick={handleShipment} />
    </Stack>
  );
}

const COMPANIES = [
  { value: '1', label: '팔성전자' },
  { value: '2', label: 'NG화학' },
  { value: '3', label: '고대자동차' },
  { value: '4', label: 'KS로우닉스' },
  { value: '5', label: '코스코' },
];

const VEHICLES = [
  { value: '1', label: '1톤 트럭 (최대 1톤)' },
  { value: '2', label: '3.5톤 트럭 (최대 3.5톤)' },
  { value: '3', label: '5톤 트럭 (최대 5톤)' },
  { value: '4', label: '11톤 트럭 (최대 11톤)' },
  { value: '5', label: '25톤 트럭 (최대 25톤)' },
];