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
  Grid,
  LinearProgress,
  List,
  ListItem,
  // MenuItem,
  // Select,
  // TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { BarraFerramentasListagemDeChamados } from '../BarraFerramentasListagemDeChamados'

import api from '../../../service/api/config/configApi'
import { useDrawerContext } from '../../contexts/DrawerContext'
import { useHelpDeskContext } from '../../contexts/HelpDeskContext'
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
  waiting: number
  postedAt: string
}

export const ListagemDeChamados: React.FC<HelpDeskListProp> = () => {
  const [helpDeskData, setHelpDeskData] = useState<HelpDeskListProp[]>([])
  const [filterHelpDeskData, setFilterHelpDeskData] = useState<
    HelpDeskListProp[]
  >([])
  const [openFilterDialog, setOpenFilterDialog] = useState(false)
  // const [category, setCategory] = useState('')
  const [date, setDate] = useState<Date | null>(null)

  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const theme = useTheme()

  const smDown = useMediaQuery(theme.breakpoints.down('sm'))

  const { toggleDrawerOpen } = useDrawerContext()
  const { isNewHelpDesk } = useHelpDeskContext()

  const filterHelpDesk = () => {
    const postedDate = date ? format(date, 'yyyyMMdd') : null
    console.log(date)
    if (postedDate && helpDeskData) {
      setFilterHelpDeskData(
        helpDeskData.filter((helpDesk) => {
          const helpDeskDate = format(new Date(helpDesk.createdAt), 'yyyyMMdd')
          console.log(helpDeskDate)
          return helpDesk.waiting > 0 && helpDeskDate === postedDate
        }),
      )
    } else {
      setFilterHelpDeskData([])
    }

    // console.log(postedDate)
  }

  useEffect(() => {
    setIsLoading(true)

    api
      .get<HelpDeskDataProps>('/chamados')
      .then((response) => {
        const { data } = response
        const allHelpDeskData = Object.values(data)[0]

        setIsLoading(false)

        setFilterHelpDeskData(
          Object.values(data)[0].filter(
            (current: HelpDeskListProp) => current.waiting > 0,
          ),
        )
        setHelpDeskData(allHelpDeskData)
        // console.log(allHelpDeskData[0].createdAt)

        if (isNewHelpDesk) {
          setHelpDeskData(allHelpDeskData)
        }
      })
      .catch((error) => {
        console.log(error)
        alert('Ocorreu um erro ao buscar os chamados')
      })
  }, [isNewHelpDesk])

  /**
   * Função para verificar se há algo escrito na caixa de pesquisa, e caso tenha, retorne o chamado de acordo com o título ou a descrição pelo mais recente primeiro.
   */

  const filteredHelpDesks =
    search.length > 0
      ? helpDeskData.filter((helpDesk) => {
          return (
            (helpDesk.title && helpDesk.title.includes(search.toLowerCase())) ||
            (helpDesk.description &&
              helpDesk.description.includes(search.toLowerCase())) ||
            (helpDesk.category &&
              helpDesk.category.includes(search.toLowerCase()))
          )
        })
      : []

  const triggerOpenFilterDialog = () => {
    setOpenFilterDialog(true)
  }
  const triggerCloseFilterDialog = () => {
    setOpenFilterDialog(false)
  }

  // fazer possível useEffect com função de filtro de chamados

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
          textoBusca={search}
          aoMudarTextoDeBusca={(value) => {
            setSearch(value)
          }}
          aoClicarBotaoFiltro={triggerOpenFilterDialog}
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

      {filterHelpDeskData.length > 0 ? (
        <List sx={{ overflow: 'auto', padding: '0px' }}>
          {filterHelpDeskData.map((UniqueHelpDesk) => (
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
        <DialogTitle>Filtrar chamados</DialogTitle>
        <Divider />
        <DialogContent>
          <Grid container display={'flex'} marginTop={'20px'} gap={2}>
            {/* <Grid item xs={12} lg={6} md={6} sm={12} xl={7}>
              <Select
                label="Categoria"
                placeholder="categoria"
                name="categoria"
                value={category}
                disabled={isLoading}
                type="text"
                onChange={(e) => setCategory(e.target.value)}
                fullWidth
              >
                <MenuItem value={'email'}>Email</MenuItem>
                <MenuItem value={'ramal'}>Ramal</MenuItem>
                <MenuItem value={'rede'}>Rede</MenuItem>
                <MenuItem value={'fluig'}>Fluig</MenuItem>
                <MenuItem value={'hardware'}>Hardware</MenuItem>
                <MenuItem value={'software'}>Software</MenuItem>
                <MenuItem value={'pcfactory'}>PcFactory</MenuItem>
                <MenuItem value={'preactor'}>Preactor</MenuItem>
                <MenuItem value={'protheus'}>Protheus</MenuItem>
                <MenuItem value={'vexon'}>Vexon</MenuItem>
                <MenuItem value={'portaldocliente'}>Portal do Cliente</MenuItem>
                <MenuItem value={'outros'}>Outros</MenuItem>
              </Select>
            </Grid> */}
            <Grid item xs={12} lg={5} md={4} sm={12} xl={4}>
              <DatePicker
                label="Data de postagem"
                sx={{ width: '100%' }}
                value={date}
                onChange={(newDate) => setDate(newDate)}
              />
            </Grid>
            {/* <Grid item xs={12} lg={12} md={12} sm={12} xl={12}>
              <TextField label="Autor(a)" variant="outlined" fullWidth />
            </Grid> */}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={triggerCloseFilterDialog}
            variant="outlined"
            color="error"
          >
            Cancelar
          </Button>
          <Button
            onClick={filterHelpDesk}
            autoFocus
            variant="contained"
            disableElevation
          >
            Filtrar
          </Button>
        </DialogActions>
      </Dialog>
    </DefaultLayout>
  )
}
