import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { TextField, Button, Typography } from '@material-ui/core';
import Checkbox from '@mui/material/Checkbox';
import { useCookies } from 'react-cookie';
const login = () => {
  const imports = useFormik({
    initialValues: {
      id: '',
      password: '',
    },
    onSubmit: (values) => {
      values.id = '';
      values.password = '';
    },
  });

  let savId = imports.values.id;

  const [idRemember, setIdRemember] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['rememberId']);

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIdRemember(event.target.checked);
    if (event.target.checked) {
      setCookie('rememberId', savId, { maxAge: 2000 });
    } else {
      removeCookie('rememberId');
    }
  };

  useEffect(() => {
    if (cookies.rememberId !== undefined) {
      setIdRemember(true);
    }
  }, []);
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          width: '90%',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box sx={{ width: '90%' }}>
          <Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <img src="./kbjlogo.jpg" />
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: 30,
                fontWeight: 'bold',
                color: '#198bd2',
                mb: 5,
              }}
            >
              김반장 통합업무 상환판
            </Box>
            <form onSubmit={imports.handleSubmit}>
              <label className="inputlabel" htmlFor="id">
                ID
              </label>
              <input
                autoComplete="off"
                value={
                  cookies.rememberId ? cookies.rememberId : imports.values.id
                }
                onChange={imports.handleChange}
                id="id"
                className="loginput"
              />
              <label className="inputlabel" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                autoComplete="off"
                value={imports.values.password}
                onChange={imports.handleChange}
                id="password"
                className="loginput"
              />

              <Box sx={{ display: 'flex' }}>
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Checkbox
                    checked={idRemember}
                    onChange={handleCheck}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                  <Box sx={{ mr: 10 }}>ID 저장</Box>
                  <Box>ID/PW 찾기</Box>
                </Box>
              </Box>

              <button className="loginB">로그인</button>
            </form>
            <Typography color="inherit" variant="caption">
              <span>
                본 사이트에는 중요한 영업비밀 등 회사 정보 및 개인정보가
                포함되어 있습니다.
              </span>
              <br />
              <span>
                이에 본 사이트를 이용함에 있어 ‘부정경쟁방지 및 영업비밀보호에
                관한 법률’,
                <br />
              </span>
              ‘개인정보보호법’을 성실히 준수하겠습니다.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default login;
