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
/*******************************************************************************************
 * @name Introduce.jsx
 * @description 소개 페이지
*******************************************************************************************/
export default function Introduce({ }) {

    const { setPopup, setOnLoading } = useRootContext();

    return(
        <Stack gap={1}>
            <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
                <img src={node} alt="Node.js" style={{ width: '50px', height: '50px' }} />
                <img src={react} alt="React" style={{ width: '50px', height: '50px' }} />
                <img src={vite} alt="Vite" style={{ width: '50px', height: '50px' }} />
                <img src={javaScript} alt="JavaScript" style={{ width: '50px', height: '50px' }} />
                <img src={mui} alt="MUI" style={{ width: '50px', height: '50px' }} />
            </Stack>
            <Typography variant="h4" align="center" sx={{ marginTop: 2 }}>
                REACT . PDA . APP 소개
            </Typography>
            <Typography m={1}>
                이 페이지는 React, Material UI(MUI), Vite, JavaScript, SWC 등 최신 웹 기술 스택을 활용하여 개발된 MES(제조 실행 시스템)용 PDA 하이브리드 웹 애플리케이션의 UI 샘플을 보여줍니다.
            </Typography>
            <Typography m={1}>
                빠르고 효율적인 개발 경험을 제공하는 Vite와 사용자 친화적인 컴포넌트 라이브러리인 MUI를 통해 생산성 향상에 기여하는 인터페이스를 구현하고자 했습니다.
            </Typography>
        </Stack>
    )
}