/* eslint-disable prettier/prettier */
import React from 'react'
import DefaultLayout from '../../shared/layouts/DefaultLayout'
import BarraFerramentasAbrirChamado from '../../shared/components/BarraFerramentasAbrirChamado'

const Dashboard: React.FC = () => {
  return <DefaultLayout tituloPagina="Abrir Chamado" barraDeFerramentas={(<BarraFerramentasAbrirChamado mostrarInputBusca />)}>Testando</DefaultLayout>
}

export default Dashboard
