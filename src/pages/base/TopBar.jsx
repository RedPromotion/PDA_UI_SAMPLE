import { useState, useMemo  } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useLocation } from 'react-router-dom';
import { useRootContext } from '@RootContext'
/**
 * TopBar 컴포넌트
 * @param {string} pageName - 현재 페이지명
 * @param {function} onMenuClick - 사이드메뉴 오픈 함수
 */
export default function TopBar({ pagesData }) {

    const { isTopBarVisible, isSideMenuBarVisible, setIsSideMenuBarVisible } = useRootContext();

    const location = useLocation();
    
    const currentPageName = useMemo(() => {
        if (!Array.isArray(pagesData)) return '알 수 없는 페이지';
        const currentPath = location.pathname.replace(/^\//, '');
        const match = pagesData.find(page => page.path.toLowerCase() === currentPath.toLowerCase());
        return match ? match.name : '알 수 없는 페이지';
    }, [location.pathname, pagesData]);

    return (
    <>
    {isTopBarVisible && (
        <AppBar position="fixed" id="appbar">
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={() => {
                        setIsSideMenuBarVisible(!isSideMenuBarVisible);
                    }}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <MenuIcon sx={{ fontSize: '2rem' }} />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {currentPageName || 'PageName Mssing'}
                </Typography>
            </Toolbar>
        </AppBar>
    )}
    </>
    );
}
