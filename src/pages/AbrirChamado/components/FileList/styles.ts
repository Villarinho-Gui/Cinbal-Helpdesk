import styled from 'styled-components'

export const FileListContainer = styled.div`
  li {
    background: #edf2fc;
    overflow: hidden;
    display: flex;
    align-items: center;
    width: 350px;
    justify-content: space-between;
    align-items: center;
    color: #444;
    padding: 0.5rem /** 8px */;
    border-radius: 8px /** 4px */;
  }

  @media (max-width: 1024px) {
    width: 100%;
    margin: 0;
    li {
      margin: 8px auto 0px;
    }

    li::last-child {
      margin-bottom: 10px;
    }
  }
`

export const FileInfo = styled.div`
  display: flex;

  align-items: center;
  gap: 1rem /** 16px */;

  img {
    margin-left: 5px;
    border-radius: 8px;
  }

  div {
    display: flex;
    width: 200px;
    justify-content: center;
    flex-direction: column;
    strong {
      max-width: 30ch;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    span {
      font-size: 12px;
      color: #999;
      margin-top: 4px;
      max-width: 30ch;
      width: 70%;
    }
  }

  @media (max-width: 570px) {
    div {
      display: flex;
      width: 150px;
      justify-content: center;
      flex-direction: column;
      strong {
        max-width: 15ch;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      span {
        font-size: 12px;
        color: #999;
        margin-top: 4px;
        max-width: 30ch;
        width: 70%;
      }
    }
  }
`
