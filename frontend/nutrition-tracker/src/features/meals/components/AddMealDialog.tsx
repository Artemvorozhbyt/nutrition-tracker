import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material'

type Props = {
  open: boolean
  onClose: () => void
}

export function AddMealDialog({
  open,
  onClose,
}: Props) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        Add meal
      </DialogTitle>

      <DialogContent>
        <Typography color="text.secondary">
          Meal form will be added in the next step.
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}