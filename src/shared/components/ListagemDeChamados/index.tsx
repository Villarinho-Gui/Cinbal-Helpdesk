/* eslint-disable react/jsx-key */
import React, { useMemo, useState, useEffect } from 'react'
import DefaultLayout from '../../layouts/DefaultLayout'
import { Chamado } from '../Chamado'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { useDebounce } from '../../hooks/UseDebounce'
import { LinearProgress, List, ListItem } from '@mui/material'
import { BarraFerramentasListagemDeChamados } from '../BarraFerramentasListagemDeChamados'

import api from '../../../service/api/config/configApi'

interface IListagemChamadoProp {
  id: number
  author: string
  title: string
  category: string
  sector: string
  description: string
  createdAt: Date
}

export const ListagemDeChamados: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const { debounce } = useDebounce()

  const navigate = useNavigate()

  const [chamados, setChamados] = useState([])
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
        .get('/chamados')
        .then((response) => {
          const { data } = response
          data.createdAt = new Date(data.createdAt)
          setIsLoading(false)
          setChamados(data)
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
        {chamados.map((chamado: IListagemChamadoProp) => (
          <ListItem disablePadding>
            <Chamado
              id={chamado.id}
              author={chamado.author}
              titulo={chamado.title}
              categoria={chamado.category}
              descricao={chamado.description}
              maxLines={2}
              createdAt={chamado.createdAt}
            />
          </ListItem>
        ))}
      </List>

      {isLoading && (
        <LinearProgress variant="indeterminate" sx={{ marginX: '10px' }} />
      )}
    </DefaultLayout>
  )
}
