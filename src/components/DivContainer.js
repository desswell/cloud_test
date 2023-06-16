import styled from 'styled-components'
export const Div = ({children, ...restProps}) => {
    return <StyledDiv {...restProps}>{children}</StyledDiv>
}
 const StyledDiv = styled.div`
  max-width: 900px;
  background: white;
  padding: 24px;
  margin: 0 auto;
  @media screen and (min-width: 1921px) {
    max-width: 1800px;
    padding: 16px;
  }
`

export const DivInput = ({children, ...restProps}) => {
    return <StyledDivInput {...restProps}>{children}</StyledDivInput>
}
const StyledDivInput = styled.div`
  position: relative;
  padding-top: 48px;
  margin-top: 3%;
  margin-bottom: ${p => p.textarea ? "10%" : p.selector ? "100px" : ''};
  @media screen and (min-width: 1921px) {
  }
`

export const DivButtons = ({children, ...restProps}) => {
    return <StyledDivButton {...restProps}>{children}</StyledDivButton>
}
const StyledDivButton = styled.div`
  display: flex;
  justify-content: space-between;
`