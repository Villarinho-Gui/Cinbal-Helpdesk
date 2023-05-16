/* eslint-disable react/jsx-key */
import React, { useMemo, useState, useEffect } from 'react'
import DefaultLayout from '../../layouts/DefaultLayout'
import { Chamado } from '../Chamado'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { useDebounce } from '../../hooks/UseDebounce'
import { Alert, LinearProgress, List, ListItem } from '@mui/material'
import { Environment } from '../../environment/export'

import { VscError } from 'react-icons/vsc'
import { BarraFerramentasListagemDeChamados } from '../BarraFerramentasListagemDeChamados'

import api from '../../../service/api/config/configApi'

export const ListagemDeChamados: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const { debounce } = useDebounce()

  const navigate = useNavigate()

  const [chamados, setChamados] = useState([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const busca = useMemo(() => {
    return searchParams.get('busca') || ''
  }, [searchParams])

  const pagina = useMemo(() => {
    return Number(searchParams.get('pagina') || '1')
  }, [searchParams])

  useEffect(() => {
    setIsLoading(true)
    debounce(async () => {
      await api
        .get('/chamados', {
          params: { pagina, busca },
        })
        .then((response) => {
          const { data } = response
          data.createdAt = new Date(data.createdAt)
          setIsLoading(false)
          console.log(data)
          setChamados(data)
          setTotalCount(Number(data.totalCount))
        })
        .catch((error) => {
          console.log(error)
          alert('Ocorreu um erro ao buscar os chamados')
        })
    })
  }, [busca, debounce, pagina])

  return (
    <DefaultLayout
      tituloPagina={''}
      mostrarTituloPagina={false}
      mostrarBotaoTema={false}
      barraDeFerramentas={
        <BarraFerramentasListagemDeChamados
          mostrarInputBusca
          textoBusca={busca}
          aoMudarTextoDeBusca={(texto) =>
            setSearchParams({ busca: texto }, { replace: true })
          }
          mostrarBotaoNovo
          mostrarBotaoFiltro
          aoClicarEmNovo={() => navigate('/abrir-chamado')}
          aoClicarEmFiltrar={() => {}}
        />
      }
    >
      <List sx={{ overflow: 'auto', padding: '0px' }}>
        {chamados.map((chamado) => (
          <ListItem disablePadding>
            <Chamado
              id={chamado.id}
              author={''}
              titulo={''}
              categoria={''}
              descricao={''}
              maxLines={0}
              createdAt={null}
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
