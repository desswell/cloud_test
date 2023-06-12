import styled from 'styled-components'
const Error = ({children, ...restProps}) => {
    return <StyledError {...restProps} >{children}</StyledError>
}
const StyledError = styled.span`
  display: block;
  font-size: 80%;
  margin-top: 6px;
  color: #eb5a5a;
  @media screen and (min-width: 1921px) {
  font-size: 130%;
  }
`
export default Error