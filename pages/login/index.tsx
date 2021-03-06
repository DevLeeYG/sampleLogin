import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { TextField, Button, Typography } from '@material-ui/core';
import Checkbox from '@mui/material/Checkbox';
import { useCookies } from 'react-cookie';
import { loginsty } from '../../makestyles/loginstyles';
import { NoSsr } from '@mui/base';

const login = () => {
  const classes = loginsty();

  useEffect(() => {
    if (cookies.rememberId !== undefined) {
      setIdRemember(true);
    }
  }, []);

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
  const [state, setState] = useState({
    open: false,
    defer: false,
  });
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

  return (
    <NoSsr defer={state.open}>
      <Container maxWidth="sm">
        <Box className={classes.Cbox}>
          <Box sx={{ width: '90%' }}>
            <Box>
              <Box className={classes.Mbox}>
                <img src="./kbjlogo.jpg" />
              </Box>
              <Box className={classes.Ibox}>김반장 통합업무 상환판</Box>
              <form onSubmit={imports.handleSubmit}>
                <label className="inputlabel" htmlFor="id">
                  ID
                </label>
                <input
                  autoComplete="off"
                  defaultValue={
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
                  <Box className={classes.checkBox}>
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
    </NoSsr>
  );
};

export default login;
