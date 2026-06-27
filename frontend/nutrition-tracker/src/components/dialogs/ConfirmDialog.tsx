import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'

type ConfirmDialogProps = {
  cancelLabel?: string
  confirmColor?: 'error' | 'primary'
  confirmLabel?: string
  description: string
  isPending?: boolean
  onClose: () => void
  onConfirm: () => void
  open: boolean
  title: string
}

export function ConfirmDialog({
  cancelLabel = 'Cancel',
  confirmColor = 'primary',
  confirmLabel = 'Confirm',
  description,
  isPending = false,
  onClose,
  onConfirm,
  open,
  title,
}: ConfirmDialogProps) {
  return (
    <Dialog fullWidth maxWidth="xs" onClose={onClose} open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button disabled={isPending} onClick={onClose}>
          {cancelLabel}
        </Button>
        <Button
          color={confirmColor}
          disabled={isPending}
          onClick={onConfirm}
          variant="contained"
        >
          {confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
