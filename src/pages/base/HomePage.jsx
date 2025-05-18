import { Typography, Box, useTheme } from "@mui/material"
import { useEffect } from "react";
const appName = import.meta.env.VITE_APP_NAME
const appVersion = import.meta.env.VITE_APP_VERSION
//import { useRootContext } from "../../context/RootContext"; 
import { useRootContext } from '@RootContext'
/*******************************************************************************************	
@name HomePage.jsx
@description - 홈 화면  (공장 및 로그인 정보 제공)
*******************************************************************************************/
export default function HomePage () {    
    const { isTopBarVisible, setIsTopBarVisible, isSideMenuBarVisible, setIsSideMenuBarVisible } = useRootContext();
    useEffect(() => {
        if(!isTopBarVisible){
            setIsTopBarVisible(true)
        }
    }, []);

    const theme = useTheme(); // MUI Theme 가져오기

    return (
        <Box
            sx={{
                width: "80%",
                margin: "auto",
                marginTop: "80px",
                padding: "20px",
                backgroundColor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.primary.main}`,
                borderRadius: "5px",
                boxShadow: "2px 5px 15px 0px gray",
            }}
        >
            {/* 타이틀 */}
            <Typography
                variant="h4"
                component="h2"
                sx={{ textAlign: "center", fontWeight: "bold", color: theme.palette.text.primary }}
            >
                사용자 정보
            </Typography>

            {/* 정보 리스트 */}
            {[
                { label: "아이디", value: localStorage.getItem("userID") ?? "아이디 없음" },
                { label: "사용자", value: localStorage.getItem("userName") ?? "사용자 이름 없음" },
                { label: "공장", value: localStorage.getItem("userPlantName") ?? "공장명 없음"},
                { label: "프로그램", value: appName },
                { label: "프로그램 버전", value: appVersion },
            ].map((item, index) => (
                <Typography
                    key={index}
                    variant="body2"
                    component="p"
                    sx={{
                        fontSize: "1.5rem",
                        lineHeight: "3rem",
                        color: theme.palette.text.primary,
                    }}
                >
                    {`${item.label} : ${item.value || "None"}`}
                </Typography>
            ))}
        </Box>
    );
}