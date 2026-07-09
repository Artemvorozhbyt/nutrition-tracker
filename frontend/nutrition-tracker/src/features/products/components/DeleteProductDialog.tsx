import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import type { Product } from '../types'

type DeleteProductDialogProps = {
  isPending: boolean
  onClose: () => void
  onConfirm: () => void
  open: boolean
  product: Product | null
}

export function DeleteProductDialog({
  isPending,
  onClose,
  onConfirm,
  open,
  product,
}: DeleteProductDialogProps) {
  return (
    <Dialog open={open} onClose={() => !isPending && onClose()} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ fontWeight: 800 }}>Delete product</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete{' '}
          <strong>{product?.name ?? 'this product'}</strong>? This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
        <Button onClick={onClose} disabled={isPending}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={onConfirm}
          disabled={isPending}
          startIcon={isPending ? <CircularProgress size={16} color="inherit" /> : null}
          disableElevation
        >
          {isPending ? 'Deleting…' : 'Delete'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
