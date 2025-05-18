import { useEffect, useState } from "react"; 
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { getTheme } from "./theme/theme.js"
import { Box } from '@mui/material';
import { Home } from "@mui/icons-material";
import { RootProvider } from "./context/RootContext.jsx"; // 공용 컨텍스트
import { useRootContext } from '@RootContext'
/*******************************************************************************************/
//베이스  페이지
import Login from './pages/base/Login'; 
import HomePage from './pages/base/HomePage';
import TopBar from './pages/base/TopBar';
import SideMenubar from "./pages/base/SideMenubar.jsx";
//일반 페이지
import Introduce from './pages/demo/Introduce';
import ThemaControl from './pages/demo/ThemaControl.jsx';
import DemoHistory from './pages/demo/DemoHistory';
import TestPage from './pages/test/TestPage';
import DemoInput from "./pages/demo/DemoInput.jsx";
import DemoSelect from "./pages/demo/DemoSelect.jsx";
/*******************************************************************************************/
/*******************************************************************************************	 
@Page App.jsx
@Name 메인 페이지
@description 객체로 구성된 페이지를 라우팅하여 SPA 앱을 구성함
*******************************************************************************************/
export default function App() {

  //테마 스타일 전역변수 저장
  const [globalThemeMode, setGlobalThemeMode] = useState( localStorage.getItem('themeMode') || 'default');
  const [globalFontStyle, setGlobalFontStyle] = useState( localStorage.getItem('fontStyle') || 'default');

  const pages = [
    { path:'HomePage', name:'HomePage', element:<HomePage/>, icon:<Home/>},
    { path:'Introduce', name:'소개 페이지', element:<Introduce/>},
    { path:'testPage', name:'실험용 페이지', element:<TestPage/>},
    { path:'DemoInput', name:'PDA 입고 처리 (데모)', element:<DemoInput/>},
    { path:'DemoHistory', name:'입고 이력 (데모)', element:<DemoHistory/>},
    { path:'DemoSelect', name:'출하 처리 (데모)', element:<DemoSelect/>},
    { path:'ThemaControl', 
      name:'테마 변경 페이지', 
      element:
      <ThemaControl
        globalThemeMode={globalThemeMode}
        setGlobalThemeMode={setGlobalThemeMode}
        globalFontStyle={globalFontStyle}
        setGlobalFontStyle={setGlobalFontStyle}
      />
    },
  ]

  const onRoute = (pages) => {
    return(
      <>
        {pages.map((page) => (
          <Route
            exact
            key={page.path}
            path={page.path}
            element={<>{page.element}</>}
          />
        ))}
      </>
    )
  }

  return ( 
    <ThemeProvider theme={getTheme({ 
      themeMode: localStorage.getItem('themeMode') || 'default', 
      fontStyle: localStorage.getItem('fontStyle') || "default",
      })}>
      <RootProvider>
        <CssBaseline />
          <BrowserRouter basename="/">
            <TopBar pagesData={pages}/>
            <SideMenubar pagesData={pages}/>
            <Box sx={{ marginTop: '65px' }}>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/PDA_UI_SAMPLE" element={<Login />} />
                <Route path="/PDA_UI_SAMPLE/" element={<Login />} />
                {onRoute(pages)}
              </Routes>
            </Box>
          </BrowserRouter>
      </RootProvider>
    </ThemeProvider> 
  );
}