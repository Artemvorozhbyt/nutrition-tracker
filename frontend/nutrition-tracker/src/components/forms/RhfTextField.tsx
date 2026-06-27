import { Controller } from 'react-hook-form'
import type { Control, FieldValues, Path } from 'react-hook-form'
import { TextField } from '@mui/material'
import type { TextFieldProps } from '@mui/material'

type RhfTextFieldProps<TFieldValues extends FieldValues> = Omit<
  TextFieldProps,
  'defaultValue' | 'name'
> & {
  control: Control<TFieldValues>
  name: Path<TFieldValues>
}

export function RhfTextField<TFieldValues extends FieldValues>({
  control,
  helperText,
  name,
  ...textFieldProps
}: RhfTextFieldProps<TFieldValues>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <TextField
          {...textFieldProps}
          {...field}
          error={Boolean(fieldState.error)}
          helperText={fieldState.error?.message ?? helperText}
          value={field.value ?? ''}
        />
      )}
    />
  )
}
