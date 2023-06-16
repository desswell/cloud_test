import styled from "styled-components";

export const LabelTitle = ({children}) => {
    return <StyledLabel>{children}</StyledLabel>
}
const StyledLabel= styled.label`
  font-size: 14px;
  color: #333333;
  font-weight: 400;
  line-height: 20px;
  @media screen and (min-width: 1921px) {
      font-size: 24px;
      color: #333333;
      margin-bottom: 30px;
  }
`
export default LabelTitle