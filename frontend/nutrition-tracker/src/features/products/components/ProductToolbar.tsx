import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import { Box, Button, InputAdornment, TextField } from '@mui/material'

type ProductToolbarProps = {
  onAdd: () => void
  onSearch: (value: string) => void
  search: string
}

export function ProductToolbar({ onAdd, onSearch, search }: ProductToolbarProps) {
  return (
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexWrap: 'wrap',
        gap: 2,
        justifyContent: 'space-between',
        mb: 2,
      }}
    >
      <TextField
        size="small"
        placeholder="Search products…"
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlinedIcon fontSize="small" />
              </InputAdornment>
            ),
          },
        }}
        sx={{
          maxWidth: 320,
          width: '100%',
          '& .MuiOutlinedInput-root': { borderRadius: 3 },
        }}
      />
      <Button
        variant="contained"
        startIcon={<AddOutlinedIcon />}
        onClick={onAdd}
        disableElevation
      >
        Add Product
      </Button>
    </Box>
  )
}
