import {  useEffect, useState, useRef } from "react"; 
import { useNavigate  } from 'react-router-dom';
import { TextField, Button, Box, Typography, Container, InputAdornment, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import sampleLogo from '../../assets/logo/sampleLogo2.png';
import { useRootContext } from '@RootContext'
const appVersion = import.meta.env.VITE_APP_VERSION
/*******************************************************************************************
@verison
VER         DATE        AUTHOR            DESCRIPTION
----------  ----------	---------------		------------------------------- 
1.00        2025-05-18  sj_hong           신규생성
*******************************************************************************************/
/*******************************************************************************************	 
@Page login.jsx
@Name 로그인 페이지
@description (기능) 이미 로그인 되어 있는 상태 시 메인페이지로 이동함, 공장 추가 시 프론트 페이지에서 수정필요함 10.240.111.40
*******************************************************************************************/
export default function Login () {

  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const userIdRef = useRef(null);
  const userPasswordRef = useRef(null);

  const navigate = useNavigate(); 

  const { 
    isTopBarVisible, 
    setIsTopBarVisible,
    setPopup, 
    setOnLoading, 
    isSideMenuBarVisible,
    setIsSideMenuBarVisible 
  } = useRootContext();

  useEffect(() => {
    //로그인여부검사
    if( localStorage.getItem('userID') && localStorage.getItem('userPlant') ){      
      setIsSideMenuBarVisible(true);
      navigate('/HomePage');
    }
    // 로그인화면에서 탑바 숨기기
    if(isTopBarVisible){
      setIsTopBarVisible(false);
    }
    // 로그인화면에서 메뉴 숨기기
    if(isSideMenuBarVisible){
      setIsSideMenuBarVisible(false);
    }
  }, []);

  /** 로그인 시도 */
  const onLogin = ()  => {
    try {
      setOnLoading(true);
      if( !userId ){
        setPopup(`아이디 미입력`, `아이디가 입력되지 않았습니다.`)
        userIdRef.current?.focus();
        return
      }
      if( !password ){
        setPopup(`비밀번호 미입력`, `비밀번호가 입력되지 않았습니다.`)
        userPasswordRef.current?.focus();
        return
      }
      // 로그인 성공
      localStorage.setItem('userID', userId);
      localStorage.setItem('userName', 'Test User');
      localStorage.setItem('userPlant', 'Test Plant');
      localStorage.setItem('userPlantName', '가상 공장');
      navigate('/HomePage');      
    } 
    catch (error) {
      setPopup('로그인 실패', `${error}`);
      localStorage.clear();
      userIdRef.current.focus();       
    }
    finally{
      setOnLoading(false);
    }
  };

  return (
    <Box>
      <Container
        component="main"
        maxWidth="sm"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          minHeight: '100vh',
          pt: 1,
          pb: 3,
        }}
      >
        <Box sx={{m: 1, p: 1, textAlign: 'center', width: '100%', maxWidth: 600, }}>
          <img src={sampleLogo} alt="Motras Logo" style={{ width: '100%' }} />
          <Typography variant="subtitle1">
            PDA SYSTEM ver.{appVersion}
          </Typography>
          <Typography variant="subtitle1">
            *시연용 페이지입니다.*
          </Typography>
           <Typography variant="subtitle1">
            *무작위 아이디&비밀번호 로그인 가능*
          </Typography>
        </Box>

        <Box sx={{ m: 1, p: 1, width: '100%', maxWidth: 600 }}>
          <TextField
            fullWidth
            inputRef={userIdRef}
            autoFocus
            id="IdInputTextField"
            label="ID"
            variant="outlined"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            autoComplete="off"
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                userPasswordRef.current.focus();
              }
            }}
            slotProps={{
              input: {
                endAdornment: userId && (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="clear input"
                      onClick={() => setUserId('')}
                      edge="end"
                    >
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>

        <Box sx={{ m: 1, p: 1, width: '100%', maxWidth: 600 }}>
          <TextField
            fullWidth
            id="PwInputTextField"
            inputRef={userPasswordRef}
            label="PASSWORD"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                onLogin();
              }
            }}
            slotProps={{
              input: {
                endAdornment: password && (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="clear input"
                      onClick={() => setPassword('')}
                      edge="end"
                    >
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}          
          />
        </Box>

        <Box sx={{ m: 1, p: 1, width: '100%', maxWidth: 600 }}>
          <Button
            variant="contained"
            fullWidth
            onClick={onLogin}
            sx={{ height: 50, fontSize: 24 }}
          >
            로그인
          </Button>
        </Box>
      </Container>
    </Box>
  );
}