import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';

export const Body = styled('div')`
  text-align: center;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
`;

export const Title = styled('h1')`
  font-family: sans-serif;
  font-weight: 100;
  margin: 30px 30px 20px 30px;
`;

export const Message = styled('h2')`
  font-family: sans-serif;
  font-weight: 100;
  margin-top: 30vh;
`;

export const Blue = styled('span')`color: rgb(0, 128, 255);`;

export const FormTitle = styled('h1')`
  font-family: sans-serif;
  font-weight: 100;
  margin-top: 22vh;
  margin-bottom: 50px;
  @media (max-width: 500px) {
    margin-top: 15vh;
  }
`;

export const TextField = styled('input')`
  display: block;
  height: 42px;
  width: 300px;
  margin: 10px auto;
  padding: 0 12px;
  border-radius: 3px;
  border: 1px solid lightgrey;
  outline: none;
  font-size: 17px;
  box-sizing: border-box;
  appearance: none;
  &:focus {
    border-color: rgb(0, 128, 255);
  }
`;

const BaseButton = styled('button')`
  border: 1px solid;
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 17px;
  background: none;
  outline: none;
  cursor: pointer;
  margin-top: 10px;
`;

export const Button = styled(BaseButton)`
  color: rgb(0, 128, 255);
  border-color: rgb(0, 128, 255);
`;

export const ButtonLight = styled(BaseButton)`
  color: #FFF;
  border-color: #FFF; 
`;

export const Link = styled(NavLink)`
  color: #FFF;
  text-decoration: none;
  margin: 22px 0 8px 20px;
  padding: 10px;
  line-height: 2em;
  vertical-align: bottom;
  &:hover {
    color: rgba(255, 255, 255, 0.5);
  }
  &.active {
    color: #C9F;
  }
`;

export const FooterLink = styled(NavLink)`
  position: fixed;
  left: 0;
  bottom: 15px;
  width: 100%;
  font-size: 14px;
  font-family: sans-serif;
  font-weight: 100;
  text-decoration: none;
  color: rgb(10, 10, 10);
  &:hover {
    color: rgb(0, 0, 0);
  }
`;

export const TooltipBackground = styled('div')`
  background-color: #FFF;
  padding: 5px;
  border: 1px solid #CCC;
  width: 350px;
  text-align: left;
`;

export const TooltipHeader = styled('div')`
  font-size: 1.5em;
  color: #444;
`;

export const Navbar = styled('div')`
  display: flex;
  align-items: center;
  background-color: blueviolet;
  color: #FFF;
`;

export const Screen = styled('div')`
  margin: 20px 40px;
`;
