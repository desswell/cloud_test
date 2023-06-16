import styled from 'styled-components'
const Input = ({...restProps}) => {
    return <StyledInput {...restProps}></StyledInput>
}
const StyledInput = styled.input`
  box-sizing: border-box;
  transition: width 0.5s ease-in-out;
  padding: 12px;
  height: 44px;
  background: rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.16);
  border-radius: 4px;
  outline: none;
  width: ${p => p.outline ? "300px" : '400px'};
  margin-bottom: ${p => p.advantage ? "8px" : '0'};
  @media screen and (min-width: 1921px) {
    height: 64px;
    padding: 24px;;
    width: 800px;
    font-size: 24px;
  }
  @media screen and (max-width: 800px) {
    width: 50%;
  }
`
export default Input