import React, { useState, useEffect } from 'react'
import DefaultLayout from '../../layouts/DefaultLayout'
import { Chamado, HelpDeskDataProps } from '../Chamado'

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
import { BarraFerramentasListagemDeChamados } from '../BarraFerramentasListagemDeChamados'

import api from '../../../service/api/config/configApi'
import { useDrawerContext } from '../../contexts/DrawerContext'
import { useHelpDeskContext } from '../../contexts/HelpDeskContext'
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { format } from 'date-fns'

interface FileProps {
  id: string
  url: string
  callId: string
}
interface HelpDeskListProp extends HelpDeskDataProps {
  id: string
  author: string
  title: string
  category: string
  description: string
  files?: FileProps[]
  createdAt: Date
}

export const ListagemDeChamados: React.FC<HelpDeskListProp> = () => {
  const [helpDeskData, setHelpDeskData] = useState<HelpDeskListProp[]>([])
  const [filteredHelpDeskData, setFilteredHelpDeskData] = useState<
    HelpDeskListProp[]
  >([])
  const [openFilterDialog, setOpenFilterDialog] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [searchTextField, setSearchTextField] = useState('')
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [showRemoveFilter, setShowRemoveFilter] = useState(false)

  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))

  const { toggleDrawerOpen } = useDrawerContext()
  const { isNewHelpDesk } = useHelpDeskContext()

  useEffect(() => {
    setIsLoading(true)

    api
      .get<HelpDeskDataProps>('/chamados')
      .then((response) => {
        const { data } = response
        const allHelpDeskData = Object.values(data)[0]

        setIsLoading(false)

        setHelpDeskData(allHelpDeskData)
        setFilteredHelpDeskData(allHelpDeskData)

        if (isNewHelpDesk) {
          setHelpDeskData(allHelpDeskData)
        }
      })
      .catch((error) => {
        console.log(error)
        alert('Ocorreu um erro ao buscar os chamados')
      })
  }, [isNewHelpDesk])

  const filteredBySearchTextField =
    searchTextField.length > 0
      ? helpDeskData.filter((helpDesk) => {
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
    const filterByDate = filteredHelpDeskData.filter(
      (helpDesk) =>
        format(new Date(helpDesk.createdAt), 'dd-MM-yyyy') ===
        format(date, 'dd-MM-yyyy'),
    )
    setSelectedDate(date)

    if (filterByDate) {
      setShowRemoveFilter(true)
    }
    setHelpDeskData(filterByDate)
  }

  const triggerOpenFilterDialog = () => {
    setOpenFilterDialog(true)
  }
  const triggerCloseFilterDialog = () => {
    setOpenFilterDialog(false)
  }

  const removeFilter = () => {
    setHelpDeskData(filteredHelpDeskData)
    setShowRemoveFilter(false)
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
          <List sx={{ overflow: 'auto', padding: '0px' }}>
            {filteredBySearchTextField.map((UniqueHelpDesk) => (
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
                author={UniqueHelpDesk.author}
                title={UniqueHelpDesk.title}
                category={UniqueHelpDesk.category}
                description={UniqueHelpDesk.description}
                maxLines={2}
                createdAt={new Date(UniqueHelpDesk.createdAt)}
                onClick={smDown ? toggleDrawerOpen : undefined}
                to={`chamado/detalhe/${UniqueHelpDesk.id}`}
              />
            </ListItem>
          ))}
        </List>
      )}

      <Dialog
        open={openFilterDialog}
        onClose={triggerCloseFilterDialog}
        fullWidth
      >
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
          >
            Aplicar Filtro
          </Button>
        </DialogActions>
      </Dialog>
    </DefaultLayout>
  )
}
