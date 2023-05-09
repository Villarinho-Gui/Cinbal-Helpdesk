import styled from 'styled-components'

export const AppContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;

  &:before {
    position: absolute;
    height: 2000px;
    width: 2000px;
    top: -10%;
    right: 48%;
    border-radius: 50%;
    transform: translateY(-50%);
    z-index: 0;

    content: '';
    background-image: linear-gradient(-45deg, #4481eb 0%, #04befe 100%);
    transition: 1.8s ease-in-out;
  }

  .image {
    width: 100%;
    height: 100%;
    margin: 40px auto;
    transition: transform 1.1s ease-in-out;
    transition-delay: 0.4s;
  }
  .panels-container {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0px;
    left: 0px;

    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
  .panel {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-around;
    text-align: center;
    z-index: 6;
    .content {
      color: white;
      transition: transform 0.9s ease-in-out;
      transition-delay: 0.6s;

      h3 {
        font-weight: 600;
        font-size: 1.5rem /** 24px */;
        line-height: 1;
        font-size: 1.5rem /** 24px */;
        line-height: 2rem /** 32px */;
      }

      p {
        padding-top: 0.75rem /** 12px */;
        padding-bottom: 0.75rem /** 12px */;
        padding-left: 0px;
        padding-right: 0px;
        font-size: 0.95rem;
      }
    }
  }
  .left-panel {
    pointer-events: all;
    padding: 3rem 17% 2rem 12%;
  }

  .right-panel {
    pointer-events: none;
    padding: 3rem 12% 2rem 17%;

    .image,
    .content {
      transform: translateX(800px);
    }
  }

  .btn.transparent {
    margin: 0;
    background: none;
    border: 2px solid #fff;
    width: 130px;
    height: 41px;
    font-weight: 600;
    font-size: 0.8rem;
  }

  .ouvidoria {
    position: absolute;
    display: flex;

    bottom: 2rem;
    right: 2rem;
    z-index: 50;
    width: 5rem;
    height: 5rem;
    border-radius: 9999px;
    border-width: 0px;
    align-items: center;
    justify-content: center;

    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);

    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;

    img {
      width: 4.5rem;
      height: 4.5rem;
      /* transform: rotate(45deg); */
    }

    &:hover {
      background: #3c8fef;
      cursor: pointer;
      transform: scale(1.25);
    }
  }

  @media (max-height: 900px) {
    .panels-container {
      height: 100vh;
      width: 100vw;
      overflow: hidden;
    }

    .ouvidoria {
      display: none;
    }
  }
  @media (max-height: 600px) {
    overflow: auto;
    height: 50px;
    .ouvidoria {
      display: none;
    }
  }

  @media (max-width: 570px) {
    .panels-container {
      height: 100vh;
      width: 100vw;
      margin: auto;
      overflow-y: none;
    }
    .image {
      display: none;
    }

    .panel {
      display: none;
    }

    h3 {
      font-size: 1.25rem /** 20px */ !important;
      line-height: 1.75rem /** 28px */ !important;
    }

    p {
      font-size: 0.875rem /** 14px */ !important;
      line-height: 1.25rem /** 20px */ !important;
    }

    &:before {
      display: none;
    }

    .ouvidoria {
      display: none;
    }
  }

  @media (max-width: 870px) {
    min-height: 800px;
    height: 100vh;
    /* padding: 1.5rem; */

    .image {
      display: none;
    }

    .panel {
      display: none;
    }

    h3 {
      font-size: 1.25rem /** 20px */ !important;
      line-height: 1.75rem /** 28px */ !important;
    }

    p {
      font-size: 0.875rem /** 14px */ !important;
      line-height: 1.25rem /** 20px */ !important;
    }

    &:before {
      display: none;
    }

    .ouvidoria {
      display: none;
    }
  }

  @media (max-width: 1024px) {
    .panels-container {
      display: grid;
      grid-template-columns: 1fr;
    }

    .panel .content {
      display: none;
    }
    .left-panel {
      display: none;
      width: 100%;
    }
    h3 {
      font-size: 1.25rem /** 20px */ !important;
      line-height: 1.75rem /** 28px */ !important;
    }
    p {
      font-size: 0.875rem /** 14px */ !important;
      line-height: 1.25rem /** 20px */ !important;
    }
    &:before {
      display: none;
    }
  }

  @media (max-width: 1280px) {
    .panel {
      height: 100vh;
    }
    /* .image {
      height: 450px;
      margin: 5px auto;
      top: 10px;
    } */
  }
`
