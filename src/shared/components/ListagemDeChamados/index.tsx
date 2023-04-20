import React, { useEffect, useMemo, useState } from 'react'
import DefaultLayout from '../../layouts/DefaultLayout'
import BarraFerramentasAbrirChamado from '../BarraFerramentasAbrirChamado'
import { Chamado } from '../Chamado'
import { useSearchParams } from 'react-router-dom'
import {
  ChamadosService,
  IListagemChamados,
} from '../../services/api/Chamados/ChamadosServices'

import { useDebounce } from '../../hooks/UseDebounce'
import { Alert, LinearProgress, List, ListItem } from '@mui/material'
import { Environment } from '../../environment/export'

import { VscError } from 'react-icons/vsc'

export const ListagemDeChamados: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const { debounce } = useDebounce()

  const [chamados, setChamados] = useState<IListagemChamados[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const busca = useMemo(() => {
    return searchParams.get('busca') || ''
  }, [searchParams])

  useEffect(() => {
    setIsLoading(true)
    debounce(() => {
      ChamadosService.getAll(1, busca).then((result) => {
        setIsLoading(false)
        if (result instanceof Error) {
          alert(result.message)
        } else {
          console.log(result)
          setChamados(result.data)
          setTotalCount(Number(result.totalCount))
        }
      })
    })
  }, [busca, debounce])

  return (
    <DefaultLayout
      tituloPagina={''}
      mostrarTituloPagina={false}
      mostrarBotaoTema={false}
      barraDeFerramentas={
        <BarraFerramentasAbrirChamado
          mostrarInputBusca
          textoBusca={busca}
          aoMudarTextoDeBusca={(texto) =>
            setSearchParams({ busca: texto }, { replace: true })
          }
        />
      }
    >
      <List sx={{ overflow: 'auto' }}>
        {chamados.map((chamado) => (
          <ListItem key={chamado.id}>
            <Chamado
              titulo={chamado.titulo}
              categoria={chamado.categoria}
              descricao={chamado.descricao}
              id={chamado.id}
            />
          </ListItem>
        ))}
      </List>

      {totalCount === 0 && !isLoading && (
        <Alert
          variant="standard"
          color="error"
          icon={<VscError />}
          sx={{ width: 'auto', marginX: '16px' }}
        >
          {Environment.LISTAGEM_VAZIA}
        </Alert>
      )}

      {isLoading && (
        <LinearProgress variant="indeterminate" sx={{ marginX: '10px' }} />
      )}
    </DefaultLayout>
  )
}
