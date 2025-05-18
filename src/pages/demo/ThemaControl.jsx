import { useEffect, useState, useRef } from "react"; 
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
//Logo
import node from '../../assets/symbols/node.png';
import react from '../../assets/symbols/react.png';
import vite from '../../assets/symbols/vite.png';
import javaScript from '../../assets/symbols/javascript.png';
import mui from '../../assets/symbols/mui.png';
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
 * @name Introduce.jsx
 * @description 소개 페이지
*******************************************************************************************/
export default function ThemaControl({ 
  globalThemeMode,
  setGlobalThemeMode,
  globalFontStyle,
  setGlobalFontStyle
}) {

  const { setPopup, setOnLoading } = useRootContext();

  const themeChange = (event) => {
    const newThemeMode = event.target.value;
    setGlobalThemeMode(newThemeMode);
    localStorage.setItem('themeMode', newThemeMode);
  };

  const fontStyleChange = (event) => {
    const newFontStyle = event.target.value;
    setGlobalFontStyle(newFontStyle);
    localStorage.setItem('fontStyle', newFontStyle);
  };

  return (
    <Stack gap={1} m={2}>
      <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
        {/* 이미지들 */}
      </Stack>
      <Typography variant="h4" align="center" sx={{ marginTop: 2 }}>
        테마 컨트롤 페이지
      </Typography>
      <Typography sx={{ marginTop: 2 }}>
        아래를 선택하여 PDA 전체 테마를 변경할 수 있습니다.
      </Typography>
      <CatSelect
        label={'테마 모드'}
        value={globalThemeMode}
        option={THEME_MODES}
        onChange={themeChange}
      />
      <CatSelect
        label={'폰트 스타일'}
        value={globalFontStyle}
        option={FONT_STYLES}
        onChange={fontStyleChange}
      />
    </Stack>
  );
}

// 테마 모드 옵션
const THEME_MODES = [
  { value: 'default', label: 'Default' },
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'dark_Blue', label: 'Dark Blue' },
  { value: 'light_Yellow', label: 'Light Yellow' },
  { value: 'light_Red', label: 'Light Red' },
  { value: 'dark_khaki', label: 'Dark Khaki' },
];

// 폰트 스타일 옵션
const FONT_STYLES = [
  { value: 'default', label: 'Default' },
  { value: 'comic', label: 'Comic Sans' },
  { value: 'impact', label: 'Impact' },
  { value: 'serif', label: 'Serif' },
  { value: 'sansSerif', label: 'Sans Serif' },
  { value: 'monospace', label: 'Monospace' },
  { value: 'fantasy', label: 'Fantasy' },
  { value: 'cursive', label: 'Cursive' },
  { value: 'systemDefault', label: 'System Default' },
  { value: 'ridibatang', label: '리디바탕체' },
];