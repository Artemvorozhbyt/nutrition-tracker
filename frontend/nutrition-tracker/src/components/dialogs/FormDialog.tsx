import type { FormEventHandler, ReactNode } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'

type FormDialogProps = {
  cancelLabel?: string
  children: ReactNode
  description?: string
  isSubmitting?: boolean
  onClose: () => void
  onSubmit: FormEventHandler<HTMLFormElement>
  open: boolean
  submitLabel?: string
  title: string
}

export function FormDialog({
  cancelLabel = 'Cancel',
  children,
  description,
  isSubmitting = false,
  onClose,
  onSubmit,
  open,
  submitLabel = 'Save',
  title,
}: FormDialogProps) {
  return (
    <Dialog fullWidth maxWidth="sm" onClose={onClose} open={open}>
      <Box component="form" noValidate onSubmit={onSubmit}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          {description ? (
            <DialogContentText>{description}</DialogContentText>
          ) : null}
          {children}
        </DialogContent>
        <DialogActions>
          <Button disabled={isSubmitting} onClick={onClose}>
            {cancelLabel}
          </Button>
          <Button disabled={isSubmitting} type="submit" variant="contained">
            {submitLabel}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  )
}
