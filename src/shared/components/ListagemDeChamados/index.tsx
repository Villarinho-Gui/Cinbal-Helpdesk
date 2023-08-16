import React, { useState, useEffect } from 'react'
import DefaultLayout from '../../layouts/DefaultLayout'

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  LinearProgress,
  List,
  ListItem,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import BarraFerramentasListagemDeChamados from '../BarraFerramentasListagemDeChamados'

import api from '../../../service/api/config/configApi'
import { useDrawerContext } from '../../contexts/DrawerContext'
import { useHelpDeskContext } from '../../contexts/HelpDeskContext'
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { format } from 'date-fns'
import Chamado from '../Chamado'
import { HelpDeskListProp } from '../../types/helpdeskType'

export const ListagemDeChamados: React.FC = () => {
  const [helpDeskData, setHelpDeskData] = useState<HelpDeskListProp[]>([])
  const [filteredHelpDeskDataByDate, setFilteredHelpDeskDataByDate] = useState<
    HelpDeskListProp[]
  >([])
  const [openFilterDialog, setOpenFilterDialog] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [searchTextField, setSearchTextField] = useState('')
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [showRemoveFilter, setShowRemoveFilter] = useState(false)
  const [
    showMessageIfNotExistHelpDeskFilteredByDate,
    setShowMessageIfNotExistHelpDeskFilteredByDate,
  ] = useState(false)

  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))

  const { toggleDrawerOpen } = useDrawerContext()
  const { isNewHelpDesk } = useHelpDeskContext()
  const token = localStorage.getItem('access_token')

  useEffect(() => {
    setIsLoading(true)
    api
      .get<HelpDeskListProp[]>('/helpdesk', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const { data } = response
        setIsLoading(false)

        setHelpDeskData(data)
        setFilteredHelpDeskDataByDate(data)
        if (isNewHelpDesk) {
          setHelpDeskData(data)
        }
      })
      .catch((error) => {
        console.error(error)
        alert('Ocorreu um erro ao buscar os chamados')
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNewHelpDesk])

  const filteredBySearchTextField =
    searchTextField.length > 0
      ? helpDeskData!.filter((helpDesk) => {
          return (
            (helpDesk.title &&
              helpDesk.title.includes(searchTextField.toLowerCase())) ||
            (helpDesk.description &&
              helpDesk.description.includes(searchTextField.toLowerCase())) ||
            (helpDesk.category &&
              helpDesk.category.includes(searchTextField.toLowerCase()))
          )
        })
      : []

  const triggerSelectDate = (date: any) => {
    const filterByDate = filteredHelpDeskDataByDate.filter(
      (helpDesk) =>
        format(new Date(helpDesk.createdAt), 'dd-MM-yyyy') ===
        format(date, 'dd-MM-yyyy'),
    )
    setSelectedDate(date)

    if (filterByDate) {
      setShowRemoveFilter(true)
      setHelpDeskData(filterByDate)
      setShowMessageIfNotExistHelpDeskFilteredByDate(false)
    }

    if (filterByDate.length <= 0) {
      setShowMessageIfNotExistHelpDeskFilteredByDate(true)
    }
  }

  const triggerOpenFilterDialog = () => {
    setOpenFilterDialog(true)
  }
  const triggerCloseFilterDialog = () => {
    setOpenFilterDialog(false)
  }

  const removeFilter = () => {
    setHelpDeskData(filteredHelpDeskDataByDate)
    setShowRemoveFilter(false)
    setSelectedDate(undefined)
    setShowMessageIfNotExistHelpDeskFilteredByDate(false)
  }

  return (
    <DefaultLayout
      tituloPagina={''}
      mostrarTituloPagina={false}
      mostrarBotaoTema={false}
      barraDeFerramentas={
        // ...
        <BarraFerramentasListagemDeChamados
          mostrarInputBusca
          mostrarBotaoFiltro
          mostrarBotaoLimparFiltro={showRemoveFilter}
          textoBusca={searchTextField}
          aoMudarTextoDeBusca={(value) => {
            setSearchTextField(value)
          }}
          aoClicarBotaoFiltro={triggerOpenFilterDialog}
          aoClicarBotaoLimparFiltro={removeFilter}
        />
        // ...
      }
    >
      {isLoading && <LinearProgress variant="indeterminate" />}
      {searchTextField.length > 0 ? (
        filteredBySearchTextField.length === 0 ? (
          <Typography variant="body2" sx={{ marginLeft: '10px' }}>
            Nenhum chamado correspondente
          </Typography>
        ) : (
          <List
            sx={{
              overflow: 'auto',
              padding: '0px',
            }}
          >
            {filteredBySearchTextField.map((UniqueHelpDesk) => (
              <ListItem key={UniqueHelpDesk.id} disablePadding>
                <Chamado
                  id={UniqueHelpDesk.id}
                  author={UniqueHelpDesk.user.name}
                  accountable={UniqueHelpDesk.accountable}
                  title={UniqueHelpDesk.title}
                  category={UniqueHelpDesk.category}
                  description={UniqueHelpDesk.description}
                  maxLines={2}
                  createdAt={new Date(UniqueHelpDesk.createdAt)}
                  files={UniqueHelpDesk.files}
                  countFiles={UniqueHelpDesk.countFiles}
                  onClick={smDown ? toggleDrawerOpen : undefined}
                  to={`chamado/detalhe/${UniqueHelpDesk.id}`}
                />
              </ListItem>
            ))}
          </List>
        )
      ) : (
        <List sx={{ overflow: 'auto', padding: '0px' }}>
          {helpDeskData.map((UniqueHelpDesk) => (
            <ListItem key={UniqueHelpDesk.id} disablePadding>
              <Chamado
                id={UniqueHelpDesk.id}
                author={UniqueHelpDesk.user.name}
                accountable={UniqueHelpDesk.accountable}
                title={UniqueHelpDesk.title}
                category={UniqueHelpDesk.category}
                description={UniqueHelpDesk.description}
                maxLines={2}
                createdAt={new Date(UniqueHelpDesk.createdAt)}
                countFiles={UniqueHelpDesk.countFiles}
                onClick={smDown ? toggleDrawerOpen : undefined}
                to={`chamado/detalhe/${UniqueHelpDesk.id}`}
              />
            </ListItem>
          ))}
        </List>
      )}

      {showMessageIfNotExistHelpDeskFilteredByDate ? (
        <Typography variant="body2" sx={{ marginLeft: '10px' }}>
          Nenhum chamado nesta data
        </Typography>
      ) : (
        ''
      )}

      <Dialog open={openFilterDialog} onClose={triggerCloseFilterDialog}>
        <DialogTitle>Filtrar chamados por data</DialogTitle>
        <Divider />
        <DialogContent>
          <DatePicker value={selectedDate} onChange={triggerSelectDate} />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={triggerCloseFilterDialog}
            variant="contained"
            color="primary"
            sx={{ width: '90%', marginX: 'auto' }}
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </DefaultLayout>
  )
}
