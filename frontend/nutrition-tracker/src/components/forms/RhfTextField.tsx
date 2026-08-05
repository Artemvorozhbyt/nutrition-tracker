import { Controller } from 'react-hook-form'
import type { Control, FieldValues, Path } from 'react-hook-form'
import { MenuItem, TextField } from '@mui/material'
import type { TextFieldProps } from '@mui/material'

type SelectOption = {
  label: string
  value: string | number
}

type RhfTextFieldProps<TFieldValues extends FieldValues> = Omit<
  TextFieldProps,
  'defaultValue' | 'name'
> & {
  control: Control<TFieldValues>
  name: Path<TFieldValues>
  options?: SelectOption[]
}

export function RhfTextField<TFieldValues extends FieldValues>({
  control,
  helperText,
  name,
  options,
  type,
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
          type={type}
          select={Boolean(options)}
          value={field.value ?? ''}
          onChange={(event) => {
            if (type === 'number') {
              field.onChange(
                event.target.value === ''
                  ? undefined
                  : Number(event.target.value),
              )
            } else {
              field.onChange(event.target.value)
            }
          }}
          error={Boolean(fieldState.error)}
          helperText={fieldState.error?.message ?? helperText}
        >
          {options?.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  )
}