import styled from 'styled-components'
import { colors } from '../tokens'

const Wrapper = styled.main.attrs({
  role: 'main',
})`
  position: relative;
  border-radius: 5px;
  max-width: 1100px;
  word-wrap: break-word;
  background-color: ${colors.backgroundArticle};
  margin: 0px auto 0px auto;
  top: 8px;
  padding: 8px 50px 8px 50px;

  @media (max-width: 780px) {
    width: 100%;
    padding: 25px;
  }
`

export default Wrapper
