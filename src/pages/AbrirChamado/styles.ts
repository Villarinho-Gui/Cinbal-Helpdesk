import styled from 'styled-components'

export const Title = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'Source Sans Pro', sans-serif;
  border-bottom-width: 1px;
  margin-bottom: 0.75rem /** 12px */;
  font-size: 1.5rem /** 24px */;
  line-height: 2rem /** 32px */;
  font-size: 1.5rem /** 24px */;
  line-height: 2rem /** 32px */;
  font-weight: 700;
  padding-bottom: 0.5rem /** 8px */;
`

export const AbrirChamadoContainer = styled.div`
  margin: 10rem auto;
  display: flex;
  flex-direction: column;
  padding: 2rem /** 16px */;
  border-radius: 8px;
  border-width: 1px;
  width: 50%;
  border: 1px solid #dddddd;

  .formPrincipais {
    display: flex;
    gap: 1.25rem /** 20px */;
    width: 100%;
  }

  .ActionButtons {
    display: flex;
    padding: 20px 0px;
    gap: 10px;
  }

  .FileList {
    display: flex;
    gap: 10px;
    align-items: center;
    margin: auto;
    background: #fbfbfb;
    padding: 5px;
    border-radius: 8px;
    height: 100px;
    overflow: auto;
  }

  @media (max-width: 570px) {
    width: 100%;
    max-width: 100%;
    margin: 50px auto;
    height: 100vh;
    border: none;
    overflow: hidden;

    .FileList {
      border: 1px solid #ddd;
      margin-top: 10px;
    }
  }

  @media (max-width: 1024px) {
    .FileList {
      display: flex;
      flex-direction: column;
      padding: 0;
      ::-webkit-scrollbar {
        display: none;
      }
    }

    .formPrincipais {
      display: flex;
      flex-direction: column;
    }

    .ActionButtons {
      display: flex;
      flex-direction: column;
    }
  }
`
