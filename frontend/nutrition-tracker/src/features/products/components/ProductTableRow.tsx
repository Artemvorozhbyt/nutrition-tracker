import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { IconButton, TableCell, TableRow, Tooltip } from '@mui/material'
import type { Product } from '../types'

type ProductTableRowProps = {
  onDelete: (product: Product) => void
  onEdit: (product: Product) => void
  product: Product
}

export function ProductTableRow({ onDelete, onEdit, product }: ProductTableRowProps) {
  return (
    <TableRow
      sx={{
        '&:hover': { backgroundColor: 'action.hover' },
        '&:last-child td': { borderBottom: 0 },
        transition: 'background-color 0.15s ease',
      }}
    >
      <TableCell sx={{ fontWeight: 600 }}>{product.name}</TableCell>
      <TableCell align="right">{product.caloriesPer100g}</TableCell>
      <TableCell align="right">{product.proteinPer100g}g</TableCell>
      <TableCell align="right">{product.fatPer100g}g</TableCell>
      <TableCell align="right">{product.carbsPer100g}g</TableCell>
      <TableCell align="right">
        <Tooltip title="Edit">
          <IconButton size="small" onClick={() => onEdit(product)} sx={{ mr: 0.5 }}>
            <EditOutlinedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton size="small" color="error" onClick={() => onDelete(product)}>
            <DeleteOutlineOutlinedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  )
}
