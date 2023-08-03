import { Box, Chip, Divider, Grid, Skeleton, Typography } from '@mui/material'
import React, { memo } from 'react'

interface HelpDeskPostInformationProps {
  id: string | undefined
  author: string | undefined
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
            <Typography variant="h5" sx={{ fontSize: '1rem' }}>
              {author}
            </Typography>
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
        <Grid item xs={12} lg={2}>
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
      <Box>
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
            sx={{ paddingBottom: '40px' }}
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
