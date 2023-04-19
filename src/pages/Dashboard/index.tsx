/* eslint-disable prettier/prettier */
import React from 'react'
import DefaultLayout from '../../shared/layouts/DefaultLayout'
// import BarraFerramentas from '../../shared/components/BarraFerramentas'
import BarraFerramentasDetalhesChamado from '../../shared/components/BarraFerramentasDetalhesChamado'

const Dashboard: React.FC = () => {
  return <DefaultLayout tituloPagina="Abrir Chamado" mostrarBotaoTema barraDeFerramentas={(<BarraFerramentasDetalhesChamado />)}>Testando</DefaultLayout>
}

export default Dashboard
