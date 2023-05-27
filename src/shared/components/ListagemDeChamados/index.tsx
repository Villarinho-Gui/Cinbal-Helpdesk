/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from 'react'
import DefaultLayout from '../../layouts/DefaultLayout'
import { Chamado } from '../Chamado'
import { useNavigate } from 'react-router-dom'

import { LinearProgress, List, ListItem, Typography } from '@mui/material'
import { BarraFerramentasListagemDeChamados } from '../BarraFerramentasListagemDeChamados'

import api from '../../../service/api/config/configApi'

interface IListagemChamadoProp {
  id: number
  autor: string
  titulo: string
  categoria: string
  setor: string
  descricao: string
  image: string
  createdAt: Date
}

export const ListagemDeChamados: React.FC = () => {
  const [chamados, setChamados] = useState<IListagemChamadoProp[]>([])
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const navigate = useNavigate()

  useEffect(() => {
    setIsLoading(true)

    api
      .get('/chamados')
      .then((response) => {
        const { data } = response
        const chamadosData = Array.isArray(data) ? data : [data]
        const chamadosFormatted = chamadosData.map((chamado) => ({
          ...chamado,
          createdAt: new Date(chamado.createdAt),
        }))
        setIsLoading(false)
        setChamados(chamadosFormatted)
      })
      .catch((error) => {
        console.log(error)
        alert('Ocorreu um erro ao buscar os chamados')
      })
  }, [])

  /**
   * Função para verificar se há algo escrito na caixa de pesquisa, e caso tenha, retorne o chamado de acordo com o título ou a descrição pelo mais recente primeiro.
   */

  const filteredChamados =
    search.length > 0
      ? chamados
          .filter((chamado) => {
            return (
              (chamado.titulo && chamado.titulo.includes(search)) ||
              (chamado.descricao && chamado.descricao.includes(search))
            )
          })
          .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      : []

  return (
    <DefaultLayout
      tituloPagina={''}
      mostrarTituloPagina={false}
      mostrarBotaoTema={false}
      barraDeFerramentas={
        // ...
        <BarraFerramentasListagemDeChamados
          mostrarInputBusca
          textoBusca={search}
          aoMudarTextoDeBusca={(value) => setSearch(value)}
          mostrarBotaoNovo
          mostrarBotaoFiltro
          aoClicarEmNovo={() => navigate('/home/abrir-chamado')}
          aoClicarEmFiltrar={() => {}}
        />
        // ...
      }
    >
      {isLoading && <LinearProgress variant="indeterminate" />}
      {search.length > 0 ? (
        filteredChamados.length === 0 ? (
          <Typography variant="body2" sx={{ marginLeft: '10px' }}>
            Nenhum chamado correspondente
          </Typography>
        ) : (
          <List sx={{ overflow: 'auto', padding: '0px' }}>
            {filteredChamados.map((chamado: IListagemChamadoProp) => (
              <ListItem key={chamado.id} disablePadding>
                <Chamado
                  id={chamado.id}
                  author={chamado.autor}
                  titulo={chamado.titulo}
                  categoria={chamado.categoria}
                  descricao={chamado.descricao}
                  maxLines={2}
                  createdAt={chamado.createdAt}
                  image={chamado.image}
                />
              </ListItem>
            ))}
          </List>
        )
      ) : (
        <List sx={{ overflow: 'auto', padding: '0px' }}>
          {chamados.map((chamado: IListagemChamadoProp) => (
            <ListItem key={chamado.id} disablePadding>
              <Chamado
                id={chamado.id}
                author={chamado.autor}
                titulo={chamado.titulo}
                categoria={chamado.categoria}
                descricao={chamado.descricao}
                maxLines={2}
                createdAt={chamado.createdAt}
                image={chamado.image}
              />
            </ListItem>
          ))}
        </List>
      )}
    </DefaultLayout>
  )
}
