import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link, useLocation, useHistory } from "react-router-dom";
import { AuthContext } from '../../contexts';
import { setAuthToken } from '../../utils';
const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  padding: 0px 32px; 
`
const NavList = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
`
const Nav = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  height: 100%;
  width: 100px;
  cursor: pointer;
  color: blue;
  text-decoration: none;
  ${props=>props.$active && `
    background: rgba(0, 0, 0, 0.2);
  `}
`
const PrimaryContainer = styled.div`
  display: flex;
  align-items: center;
  ${NavList} {
    margin-left: 10px;
  }
`
const SecondaryContainer = styled.div`
  display: flex;
`
const TitleContainer = styled.div`
  font-size: 32px;
  font-weight:bold;
`
function Header() {
  const location = useLocation();
  const { user, setUser } = useContext(AuthContext);
  const history = useHistory();
  const handleLogout = () => {
    setAuthToken('');
    setUser(null);
    if(location.pathname !== '/'){
      history.push('/');
    }
  }
  return (
    <HeaderContainer>
      <PrimaryContainer>
        <TitleContainer>
          MediRyan
        </TitleContainer>
        <NavList>
          <Nav to='/' $active={location.pathname==='/'}>
            首頁
          </Nav>
          {user && <Nav to='/post' $active={location.pathname==='/post'}>
            發表文章
          </Nav>}
        </NavList>
      </PrimaryContainer>
      <SecondaryContainer>
        <NavList>
          {!user && <Nav to='/login' $active={location.pathname==='/login'}>
            登入
          </Nav>}
          {user && <Nav as='div' onClick={handleLogout}>
            登出
          </Nav>}
        </NavList>
      </SecondaryContainer>
    </HeaderContainer>
  )
}
export default Header;