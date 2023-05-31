/* eslint-disable prettier/prettier */
import React from 'react'
import DefaultLayout from '../../shared/layouts/DefaultLayout'
import { Box, Button, Card, CardContent, Chip, Grid, Typography, useTheme } from '@mui/material'
import { BsGraphUpArrow } from 'react-icons/bs'
// import { ChamadosService } from '../../shared/services/api/Chamados/ChamadosServices'

const Dashboard: React.FC = () => {
  // const [isLoadingChamados, setIsLoadingChamados] = useState<boolean>(false)
  // const [totalCountChamados, setTotalCountChamados] = useState<number | string>(0)


  const theme = useTheme()

  // useEffect(() => {
  //     setIsLoadingChamados(true)

  //     ChamadosService.getAll(1).then((result) => {
  //       setIsLoadingChamados(false)
  //       if (result instanceof Error) {
  //         alert(result.message)
  //       } else {
  //         setTotalCountChamados(result.totalCount)
  //       }
  //     })
  //   },[])

  return (
    <DefaultLayout 
      tituloPagina="Dashboard" 
      mostrarBotaoTema       
      mostrarBotaoLogout
      mostrarBotaoPerfil 
      mostrarBotaoOpenHelpDesk
      barraDeFerramentas={''}
    >
      <Box         
          padding={2}
          borderRadius={1}
          marginX={1}
          width="auto"
          border="1px solid"
          height="max-content"
          borderColor={theme.palette.divider}
        >
        <Grid container spacing={2}>
          <Grid item lg={4} xs={12}>
            <Card 
              elevation={0}
              padding={2}
              variant='outlined'
              component={Box}
              borderRadius={1}
              marginX={2}
              border="1px solid"
              borderColor={theme.palette.divider}
            >
              <CardContent>
                <Box>
                  <Typography variant="h5" sx={{ fontSize: '1rem' }} color="text.secondary">Chamados Abertos</Typography>
                  {/* <Box display='flex' gap={2} width="100%" alignItems="center">
                    { isLoadingChamados ? 
                      <Skeleton
                        variant="text"
                        sx={{ fontSize: '4rem' }}
                        width="100px"
                      /> :
                    (
                      <Typography  
                        variant="body2"
                        color={theme.palette.text.primary}
                        sx={{ fontSize: '3rem' }}
                      >
                      {totalCountChamados}
                    </Typography>
                    )
                    }
                    <Chip label="25.5%" icon={<BsGraphUpArrow size={10} />} size='medium' variant='filled'/>
                  </Box> */}

                  <Button>Visualizar</Button>
                </Box>
                
              </CardContent>
            </Card>
          </Grid>
          <Grid item lg={4} xs={12}>
          <Card 
              elevation={0}
              padding={2}
              variant='outlined'
              component={Box}
              borderRadius={1}
              marginX={2}
              border="1px solid"
              borderColor={theme.palette.divider}
            >
              <CardContent>
                <Box>
                  <Typography variant="h5" sx={{ fontSize: '1rem' }} color="text.secondary">Chamados Assumidos</Typography>
                  <Box display='flex' gap={2} width="100%" alignItems="center">
                  {/* { isLoadingChamados ? 
                      <Skeleton
                        variant="text"
                        sx={{ fontSize: '4rem' }}
                        width="100px"
                      /> :
                    (
                      <Typography  
                        variant="body2"
                        color={theme.palette.text.primary}
                        sx={{ fontSize: '3rem' }}
                      >
                      2
                    </Typography>
                    )
                    } */}
                    <Chip label="25.5%" icon={<BsGraphUpArrow size={10} />} size='medium' variant='filled'/>
                  </Box>

                  <Button>Visualizar</Button>
                </Box>
                
              </CardContent>
            </Card>
          </Grid>
          <Grid item lg={4} xs={12}>
          <Card 
              elevation={0}
              padding={2}
              variant='outlined'
              component={Box}
              borderRadius={1}
              marginX={2}
              border="1px solid"
              borderColor={theme.palette.divider}
            >
              <CardContent>
                <Box>
                  <Typography variant="h5" sx={{ fontSize: '1rem' }} color="text.secondary">Chamados Concluídos</Typography>
                  <Box display='flex' gap={2} width="100%" alignItems="center">
                  {/* { isLoadingChamados ? 
                      <Skeleton
                        variant="text"
                        sx={{ fontSize: '4rem' }}
                        width="100px"
                      /> :
                    (
                      <Typography  
                        variant="body2"
                        color={theme.palette.text.primary}
                        sx={{ fontSize: '3rem' }}
                      >
                      3
                    </Typography>
                    )
                    } */}
                    <Chip label="25.5%" icon={<BsGraphUpArrow size={10} />} size='medium' variant='filled'/>
                  </Box>

                  <Button>Visualizar</Button>
                </Box>
                
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </DefaultLayout>)
}

export default Dashboard
