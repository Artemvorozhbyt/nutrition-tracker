import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import {
  Box,
  IconButton,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import type { Product } from '../api/products'
import { ProductCategoryChip } from './ProductCategoryChip'

const StickyHead = styled(TableHead)(({ theme }) => ({
  position: 'sticky',
  top: 0,
  zIndex: 1,
  '& .MuiTableCell-head': {
    backgroundColor: theme.palette.background.paper,
    borderBottom: `1px solid ${theme.palette.divider}`,
    color: theme.palette.text.secondary,
    fontSize: '0.7rem',
    fontWeight: 700,
    letterSpacing: '0.07em',
    padding: theme.spacing(1.5, 2),
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
  },
}))

const DataRow = styled(TableRow)(({ theme }) => ({
  transition: theme.transitions.create('background-color', {
    duration: theme.transitions.duration.shorter,
  }),
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '& .MuiTableCell-root': {
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(1.5, 2),
  },
  '& .actions-cell': {
    opacity: 0,
    transition: theme.transitions.create('opacity', {
      duration: theme.transitions.duration.shorter,
    }),
  },
  '&:hover .actions-cell': {
    opacity: 1,
  },
}))

const NumericCell = styled(TableCell)({
  fontVariantNumeric: 'tabular-nums',
  textAlign: 'right',
})

const NumericHead = styled(TableCell)({
  textAlign: 'right',
})

function MacroValue({ value }: { value: number }) {
  return (
    <Typography component="span" sx={{ fontVariantNumeric: 'tabular-nums' }} variant="body2">
      {value.toFixed(1)}
    </Typography>
  )
}

function SkeletonRows({ count }: { count: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <TableRow key={i}>
          <TableCell><Skeleton variant="text" width="60%" /></TableCell>
          <TableCell><Skeleton variant="rounded" width={72} height={22} /></TableCell>
          <NumericCell><Skeleton variant="text" width={40} sx={{ ml: 'auto' }} /></NumericCell>
          <NumericCell><Skeleton variant="text" width={40} sx={{ ml: 'auto' }} /></NumericCell>
          <NumericCell><Skeleton variant="text" width={40} sx={{ ml: 'auto' }} /></NumericCell>
          <NumericCell><Skeleton variant="text" width={40} sx={{ ml: 'auto' }} /></NumericCell>
          <TableCell width={96} />
        </TableRow>
      ))}
    </>
  )
}

type ProductsTableProps = {
  products: Product[]
  isLoading: boolean
  onEdit: (product: Product) => void
  onDelete: (product: Product) => void
}

export function ProductsTable({ products, isLoading, onEdit, onDelete }: ProductsTableProps) {
  return (
    <TableContainer sx={{ maxHeight: 'calc(100vh - 320px)', minHeight: 240 }}>
      <Table stickyHeader size="small">
        <StickyHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Category</TableCell>
            <NumericHead>Calories</NumericHead>
            <NumericHead>Protein</NumericHead>
            <NumericHead>Fat</NumericHead>
            <NumericHead>Carbs</NumericHead>
            <TableCell width={96} />
          </TableRow>
        </StickyHead>

        <TableBody>
          {isLoading ? (
            <SkeletonRows count={8} />
          ) : products.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} sx={{ py: 8, textAlign: 'center' }}>
                <Typography color="text.secondary" variant="body2">
                  No products found. Add your first product to get started.
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            products.map((product) => (
              <DataRow key={product.id}>
                <TableCell>
                  <Typography sx={{ fontWeight: 600 }} variant="body2">
                    {product.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <ProductCategoryChip category={product.category} />
                </TableCell>
                <NumericCell>
                  <MacroValue value={product.caloriesPer100g} />
                  <Typography color="text.secondary" component="span" sx={{ ml: 0.5 }} variant="caption">
                    kcal
                  </Typography>
                </NumericCell>
                <NumericCell>
                  <MacroValue value={product.proteinPer100g} />
                  <Typography color="text.secondary" component="span" sx={{ ml: 0.5 }} variant="caption">
                    g
                  </Typography>
                </NumericCell>
                <NumericCell>
                  <MacroValue value={product.fatPer100g} />
                  <Typography color="text.secondary" component="span" sx={{ ml: 0.5 }} variant="caption">
                    g
                  </Typography>
                </NumericCell>
                <NumericCell>
                  <MacroValue value={product.carbsPer100g} />
                  <Typography color="text.secondary" component="span" sx={{ ml: 0.5 }} variant="caption">
                    g
                  </Typography>
                </NumericCell>
                <TableCell className="actions-cell" width={96}>
                  <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'flex-end' }}>
                    <Tooltip title="Edit product">
                      <IconButton
                        onClick={() => onEdit(product)}
                        size="small"
                        sx={{ color: 'text.secondary' }}
                      >
                        <EditOutlinedIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete product">
                      <IconButton
                        onClick={() => onDelete(product)}
                        size="small"
                        sx={{ color: 'error.main' }}
                      >
                        <DeleteOutlinedIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </DataRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
