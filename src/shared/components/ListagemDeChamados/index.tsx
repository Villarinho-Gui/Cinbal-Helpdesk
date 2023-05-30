/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from 'react'
import DefaultLayout from '../../layouts/DefaultLayout'
import { Chamado, HelpDeskDataProps } from '../Chamado'
import { useNavigate } from 'react-router-dom'

import { LinearProgress, List, ListItem, Typography } from '@mui/material'
import { BarraFerramentasListagemDeChamados } from '../BarraFerramentasListagemDeChamados'

import api from '../../../service/api/config/configApi'

interface HelpDeskListProp extends HelpDeskDataProps {
  id: string
  author: string
  title: string
  category: string
  // sector: string
  description: string
  files?: string[]
  createdAt: Date
}

export const ListagemDeChamados: React.FC = () => {
  const [helpDesks, setHelpDesks] = useState<HelpDeskListProp[]>([])
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const navigate = useNavigate()

  useEffect(() => {
    setIsLoading(true)

    api
      .get('/chamados')
      .then((response) => {
        const { data } = response
        const helpDeskData = Array.isArray(data) ? data : [data]
        const formattedHelpDesks = helpDeskData.map((helpDesk) => ({
          ...helpDesk,
        }))

        setIsLoading(false)
        setHelpDesks(formattedHelpDesks[0].allCallHelpDesk)
      })
      .catch((error) => {
        console.log(error)
        alert('Ocorreu um erro ao buscar os chamados')
      })
  }, [])

  /**
   * Função para verificar se há algo escrito na caixa de pesquisa, e caso tenha, retorne o chamado de acordo com o título ou a descrição pelo mais recente primeiro.
   */

  const filteredHelpDesks =
    search.length > 0
      ? helpDesks
          .filter((helpDesk) => {
            return (
              (helpDesk.title && helpDesk.title.includes(search)) ||
              (helpDesk.description && helpDesk.description.includes(search))
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
          aoMudarTextoDeBusca={(value) => {
            setSearch(value)
          }}
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
        filteredHelpDesks.length === 0 ? (
          <Typography variant="body2" sx={{ marginLeft: '10px' }}>
            Nenhum chamado correspondente
          </Typography>
        ) : (
          <List sx={{ overflow: 'auto', padding: '0px' }}>
            {filteredHelpDesks.map((UniqueHelpDesk) => (
              <ListItem key={UniqueHelpDesk.id} disablePadding>
                <Chamado
                  id={UniqueHelpDesk.id}
                  author={UniqueHelpDesk.author}
                  title={UniqueHelpDesk.title}
                  category={UniqueHelpDesk.category}
                  description={UniqueHelpDesk.description}
                  maxLines={2}
                  createdAt={new Date(UniqueHelpDesk.createdAt)}
                  files={UniqueHelpDesk.files}
                />
              </ListItem>
            ))}
          </List>
        )
      ) : (
        <List sx={{ overflow: 'auto', padding: '0px' }}>
          {helpDesks.map((UniqueHelpDesk) => (
            <ListItem key={UniqueHelpDesk.id} disablePadding>
              <Chamado
                id={UniqueHelpDesk.id}
                author={UniqueHelpDesk.author}
                title={UniqueHelpDesk.title}
                category={UniqueHelpDesk.category}
                description={UniqueHelpDesk.description}
                maxLines={2}
                createdAt={new Date(UniqueHelpDesk.createdAt)}
              />
            </ListItem>
          ))}
        </List>
      )}
    </DefaultLayout>
  )
}
