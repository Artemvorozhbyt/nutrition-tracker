import SearchOffOutlinedIcon from '@mui/icons-material/SearchOffOutlined'
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined'
import { Box, Button, Typography } from '@mui/material'

type EmptyProductsProps = {
  isFiltered: boolean
  onAdd: () => void
  onClear: () => void
}

export function EmptyProducts({ isFiltered, onAdd, onClear }: EmptyProductsProps) {
  const Icon = isFiltered ? SearchOffOutlinedIcon : StorefrontOutlinedIcon

  return (
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        justifyContent: 'center',
        minHeight: 320,
        textAlign: 'center',
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          backgroundColor: 'action.hover',
          borderRadius: 3,
          color: 'primary.main',
          display: 'inline-flex',
          height: 56,
          justifyContent: 'center',
          width: 56,
        }}
      >
        <Icon />
      </Box>
      <Box>
        <Typography variant="h3" sx={{ fontWeight: 800, mb: 0.5 }}>
          {isFiltered ? 'No results found' : 'No products yet'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {isFiltered
            ? 'Try adjusting your search term.'
            : 'Add your first product to get started.'}
        </Typography>
      </Box>
      {isFiltered ? (
        <Button variant="outlined" onClick={onClear}>
          Clear search
        </Button>
      ) : (
        <Button variant="contained" onClick={onAdd}>
          Add product
        </Button>
      )}
    </Box>
  )
}
