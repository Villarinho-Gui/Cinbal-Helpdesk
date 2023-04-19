import React, { useEffect, useMemo } from 'react'
import DefaultLayout from '../../layouts/DefaultLayout'
import BarraFerramentasAbrirChamado from '../BarraFerramentasAbrirChamado'
import { Chamado } from '../Chamado'
import { useSearchParams } from 'react-router-dom'
import { ChamadosService } from '../../services/api/Chamados/ChamadosServices'

import { useDebounce } from '../../hooks/UseDebounce'

// import { Container } from './styles';

export const ListagemDeChamados: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const { debounce } = useDebounce(3000, false)

  const busca = useMemo(() => {
    return searchParams.get('busca') || ''
  }, [searchParams])

  useEffect(() => {
    debounce(() => {
      ChamadosService.getAll(1, busca).then((result) => {
        if (result instanceof Error) {
          alert(result.message)
        }
        console.log(result)
      })
    })
  }, [busca])

  return (
    <DefaultLayout
      tituloPagina={''}
      mostrarTituloPagina={false}
      mostrarBotaoTema={false}
      barraDeFerramentas={
        <BarraFerramentasAbrirChamado
          textoBotaoNovo=""
          mostrarInputBusca
          textoBusca={busca}
          aoMudarTextoDeBusca={(texto) =>
            setSearchParams({ busca: texto }, { replace: true })
          }
        />
      }
    >
      <Chamado />
    </DefaultLayout>
  )
}
