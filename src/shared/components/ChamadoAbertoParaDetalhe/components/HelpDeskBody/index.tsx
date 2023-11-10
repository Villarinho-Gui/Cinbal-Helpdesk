import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  IconButton,
  Menu,
  Paper,
  Skeleton,
  Tooltip,
  Typography,
} from '@mui/material'
import React, { memo, useCallback } from 'react'

import { FaClipboard } from 'react-icons/fa'
import { useUserContext } from '../../../../contexts/userContext'

interface HelpDeskPostInformationProps {
  id: string | undefined
  author:
    | {
        name: string
        email: string
        extension: string
        position: string
        sector: string
        role: string
      }
    | undefined
  sector: string | undefined
  category: string | undefined
  description: string | undefined
  createdAt: Date | undefined
  isLoading: boolean
  createdAtFormatted: () => string
  createdAtFormattedRelativeToNow: () => string
}

const HelpDeskBody: React.FC<HelpDeskPostInformationProps> = ({
  id,
  author,
  sector,
  category,
  description,
  createdAt,
  isLoading,
  createdAtFormatted,
  createdAtFormattedRelativeToNow,
}) => {
  const [openInformation, setOpenInformation] =
    React.useState<null | HTMLElement>(null)
  const openCardInformation = Boolean(openInformation)

  const openUserInformation = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setOpenInformation(event.currentTarget)
    },
    [],
  )
  const handleCloseUserInformation = () => {
    setOpenInformation(null)
  }

  const { user } = useUserContext()
  const currentUser = user

  return (
    <>
      <Box display="flex" justifyContent="space-between" paddingBottom={2}>
        <Box>
          {isLoading ? (
            <Skeleton
              variant="text"
              sx={{ fontSize: '1.5rem' }}
              width="200px"
            />
          ) : (
            <Box display={'flex'} alignItems={'center'} gap={2}>
              <Typography variant="h5" sx={{ fontSize: '1rem' }}>
                {author?.name}
              </Typography>
              {currentUser?.role === 'admin' ? (
                <Tooltip title="Informações">
                  <IconButton onClick={openUserInformation}>
                    <FaClipboard size={15} />
                  </IconButton>
                </Tooltip>
              ) : (
                ''
              )}
              <Menu
                id="basic-menu"
                anchorEl={openInformation}
                open={openCardInformation}
                onClose={handleCloseUserInformation}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <Card
                  component={Box}
                  elevation={0}
                  border={'none'}
                  color="#6F6F6F"
                  sx={{
                    width: '99%',
                    height: 'max',
                    display: 'flex',
                    flex: '1',
                    marginX: 'auto',
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" fontSize={15}>
                      Usuário:
                    </Typography>
                    <Typography
                      sx={{ fontSize: '0.8rem' }}
                      color="text.secondary"
                    >
                      {author?.name}
                    </Typography>
                    <Typography variant="h6" fontSize={15}>
                      Email:
                    </Typography>
                    <Typography
                      sx={{ fontSize: '0.8rem' }}
                      color="text.secondary"
                    >
                      {author?.email}
                    </Typography>
                    <Typography variant="h6" fontSize={15}>
                      Setor:
                    </Typography>
                    <Typography
                      sx={{ fontSize: '0.8rem' }}
                      color="text.secondary"
                    >
                      {author?.sector}
                    </Typography>
                    <Typography variant="h6" fontSize={15}>
                      Função:
                    </Typography>
                    <Typography
                      sx={{ fontSize: '0.8rem' }}
                      color="text.secondary"
                    >
                      {author?.position}
                    </Typography>
                    <Typography variant="h6" fontSize={15}>
                      Ramal:
                    </Typography>
                    <Typography
                      sx={{ fontSize: '0.8rem' }}
                      color="text.secondary"
                    >
                      {author?.extension}
                    </Typography>
                  </CardContent>
                </Card>
              </Menu>
            </Box>
          )}

          {isLoading ? (
            <Skeleton variant="text" sx={{ fontSize: '1.5rem' }} width="50px" />
          ) : (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: '0.8rem' }}
            >
              {sector}
            </Typography>
          )}
        </Box>
        <time
          title={createdAt ? createdAtFormatted() : ''}
          dateTime={String(createdAt) ?? ''}
        >
          {isLoading ? (
            <Skeleton variant="text" sx={{ fontSize: '1.5rem' }} width="90px" />
          ) : createdAt ? (
            <Typography
              variant="body2"
              sx={{ fontSize: '0.8rem' }}
              color="text.secondary"
            >
              {createdAtFormattedRelativeToNow()}
            </Typography>
          ) : null}
        </time>
      </Box>
      <Grid
        container
        spacing={2}
        display={'flex'}
        flex={1}
        justifyContent={'space-between'}
        paddingY={'20px'}
      >
        <Grid item xl={4} xs={12} md={6}>
          {isLoading ? (
            <Skeleton variant="text" sx={{ fontSize: '1.5rem' }} width="90px" />
          ) : (
            <Chip label={category} size="small" color="default" />
          )}
        </Grid>

        <Grid
          item
          xl={4}
          xs={12}
          md={6}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            justifyContent: 'end',
          }}
        >
          <Typography variant="body2">Id:</Typography>
          {isLoading ? (
            <Skeleton variant="text" sx={{ fontSize: '1.5rem' }} width="90px" />
          ) : (
            <Chip label={id} size="small" color="default" />
          )}
        </Grid>
      </Grid>
      <Box
        component={Paper}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        marginBottom={5}
        elevation={0}
        minHeight={50}
        whiteSpace={'pre-wrap'}
      >
        {isLoading ? (
          <Skeleton
            variant="rounded"
            sx={{ fontSize: '1.5rem' }}
            width="100%"
            height="100px"
          />
        ) : (
          <Typography
            variant="body2"
            color="text.secondary"
            padding={2}
            textAlign={'left'}
          >
            {description}
          </Typography>
        )}
        <Divider />
      </Box>
    </>
  )
}

export default memo(HelpDeskBody)
