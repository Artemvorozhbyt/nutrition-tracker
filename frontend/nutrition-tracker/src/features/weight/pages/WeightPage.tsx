import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import ScaleOutlinedIcon from '@mui/icons-material/ScaleOutlined'
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import dayjs from 'dayjs'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useState } from 'react'

import {
  useCreateWeightMutation,
  useDeleteWeightMutation,
  useUpdateWeightMutation,
  useWeightHistoryQuery,
} from '../hooks/useWeight'

function formatDate(date: string) {
  return dayjs(date).format('DD MMM YYYY')
}

export function WeightPage() {
  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useWeightHistoryQuery()

  const createWeightMutation = useCreateWeightMutation()
  const updateWeightMutation = useUpdateWeightMutation()
  const deleteWeightMutation = useDeleteWeightMutation()

  const [weight, setWeight] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingWeight, setEditingWeight] = useState('')
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const entries = data?.entries ?? []

  const chartData = entries.map((entry) => ({
    date: dayjs(entry.date).format('DD MMM'),
    weight: Number(entry.weight),
  }))

  const handleAddWeight = async () => {
    const value = Number(weight)

    if (!Number.isFinite(value) || value <= 0 || value > 500) {
      return
    }

    try {
      await createWeightMutation.mutateAsync({
        weight: value,
      })

      setWeight('')
    } catch {
      // Error is displayed through createWeightMutation.isError
    }
  }

  const handleEdit = (id: string, currentWeight: number) => {
    setEditingId(id)
    setEditingWeight(String(currentWeight))
  }

  const handleSaveEdit = async () => {
    if (!editingId) {
      return
    }

    const value = Number(editingWeight)

    if (!Number.isFinite(value) || value <= 0 || value > 500) {
      return
    }

    try {
      await updateWeightMutation.mutateAsync({
        id: editingId,
        weight: value,
      })

      setEditingId(null)
      setEditingWeight('')
    } catch {
      // Error is handled by mutation state.
    }
  }

  const handleDelete = async () => {
    if (!deletingId) {
      return
    }

    try {
      await deleteWeightMutation.mutateAsync(deletingId)
      setDeletingId(null)
    } catch {
      // Error is handled by mutation state.
    }
  }

  if (isError) {
    return (
      <Box
        sx={{
          maxWidth: 1200,
          mx: 'auto',
          p: { xs: 2, sm: 3, md: 4 },
          width: '100%',
        }}
      >
        <Alert
          severity="error"
          variant="filled"
          action={
            <Button
              color="inherit"
              size="small"
              onClick={() => void refetch()}
            >
              Retry
            </Button>
          }
          sx={{ borderRadius: 3 }}
        >
          Failed to load weight data. Please try again.
        </Alert>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        maxWidth: 1200,
        mx: 'auto',
        p: { xs: 2, sm: 3, md: 4 },
        width: '100%',
      }}
    >
      <Stack spacing={3}>
        {/* Header */}
        <Box>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              mb: 0.75,
            }}
          >
            Weight
          </Typography>

          <Typography color="text.secondary">
            Track your weight progress and keep your history in one place.
          </Typography>
        </Box>

        {/* Statistics */}
        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Card
              sx={{
                height: '100%',
                borderRadius: 3,
              }}
            >
              <CardContent sx={{ p: 2.5 }}>
                <Stack spacing={1.5}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    <ScaleOutlinedIcon color="primary" />

                    <Typography color="text.secondary">
                      Current weight
                    </Typography>
                  </Box>

                  {isLoading ? (
                    <Skeleton width={130} height={52} />
                  ) : (
                    <Typography
                      variant="h3"
                      sx={{ fontWeight: 800 }}
                    >
                      {data?.currentWeight != null
                        ? `${Number(data.currentWeight).toFixed(1)} kg`
                        : '—'}
                    </Typography>
                  )}
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Card
              sx={{
                height: '100%',
                borderRadius: 3,
              }}
            >
              <CardContent sx={{ p: 2.5 }}>
                <Stack spacing={1.5}>
                  <Typography color="text.secondary">
                    Start weight
                  </Typography>

                  {isLoading ? (
                    <Skeleton width={130} height={52} />
                  ) : (
                    <Typography
                      variant="h3"
                      sx={{ fontWeight: 800 }}
                    >
                      {data?.startWeight != null
                        ? `${Number(data.startWeight).toFixed(1)} kg`
                        : '—'}
                    </Typography>
                  )}
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Card
              sx={{
                height: '100%',
                borderRadius: 3,
              }}
            >
              <CardContent sx={{ p: 2.5 }}>
                <Stack spacing={1.5}>
                  <Typography color="text.secondary">
                    Change
                  </Typography>

                  {isLoading ? (
                    <Skeleton width={130} height={52} />
                  ) : (
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 800,
                        color:
                          data?.difference != null &&
                          data.difference < 0
                            ? 'success.main'
                            : data?.difference != null &&
                                data.difference > 0
                              ? 'warning.main'
                              : 'text.primary',
                      }}
                    >
                      {data?.difference != null
                        ? `${
                            data.difference > 0 ? '+' : ''
                          }${Number(data.difference).toFixed(1)} kg`
                        : '—'}
                    </Typography>
                  )}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Add weight */}
        <Card sx={{ borderRadius: 3 }}>
          <CardContent
            sx={{
              p: { xs: 2, sm: 3 },
            }}
          >
            <Stack spacing={2.5}>
              <Box>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700 }}
                >
                  Add today's weight
                </Typography>

                <Typography
                  color="text.secondary"
                  variant="body2"
                >
                  Your current weight will be updated for today.
                </Typography>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: {
                    xs: 'column',
                    sm: 'row',
                  },
                  gap: 1.5,
                  alignItems: {
                    xs: 'stretch',
                    sm: 'flex-start',
                  },
                }}
              >
                <TextField
                  label="Weight"
                  type="number"
                  value={weight}
                  onChange={(event) =>
                    setWeight(event.target.value)
                  }
                  slotProps={{
                    htmlInput: {
                      min: 1,
                      max: 500,
                      step: 0.1,
                    },
                  }}
                  sx={{
                    maxWidth: {
                      sm: 220,
                    },
                  }}
                />

                <Button
                  variant="contained"
                  startIcon={<AddOutlinedIcon />}
                  onClick={() => void handleAddWeight()}
                  disabled={
                    createWeightMutation.isPending ||
                    !weight ||
                    Number(weight) <= 0 ||
                    Number(weight) > 500
                  }
                  sx={{
                    minHeight: 56,
                    borderRadius: 2,
                    px: 3,
                  }}
                >
                  {createWeightMutation.isPending
                    ? 'Saving...'
                    : 'Add weight'}
                </Button>
              </Box>

              {createWeightMutation.isError && (
                <Alert severity="error">
                  Failed to save weight. Please check the
                  value and try again.
                </Alert>
              )}
            </Stack>
          </CardContent>
        </Card>

        {/* Chart */}
        <Card sx={{ borderRadius: 3 }}>
          <CardContent
            sx={{
              p: { xs: 2, sm: 3 },
            }}
          >
            <Stack spacing={2.5}>
              <Box>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700 }}
                >
                  Weight progress
                </Typography>

                <Typography
                  color="text.secondary"
                  variant="body2"
                >
                  Your weight changes over time.
                </Typography>
              </Box>

              {isLoading ? (
                <Skeleton
                  variant="rounded"
                  height={320}
                  sx={{ borderRadius: 2 }}
                />
              ) : chartData.length < 2 ? (
                <Box
                  sx={{
                    minHeight: 280,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    px: 3,
                  }}
                >
                  <Typography color="text.secondary">
                    Add at least two weight measurements to
                    see your progress chart.
                  </Typography>
                </Box>
              ) : (
                <Box
                  sx={{
                    width: '100%',
                    height: 320,
                  }}
                >
                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >
                    <LineChart
                      data={chartData}
                      margin={{
                        top: 10,
                        right: 20,
                        left: 0,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        opacity={0.15}
                      />

                      <XAxis
                        dataKey="date"
                        tickLine={false}
                        axisLine={false}
                      />

                      <YAxis
                        domain={[
                          'dataMin - 1',
                          'dataMax + 1',
                        ]}
                        tickLine={false}
                        axisLine={false}
                        width={45}
                      />

                      <Tooltip />

                      <Line
                        type="monotone"
                        dataKey="weight"
                        stroke="currentColor"
                        strokeWidth={3}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>
              )}
            </Stack>
          </CardContent>
        </Card>

        {/* History */}
        <Card sx={{ borderRadius: 3 }}>
          <CardContent
            sx={{
              p: { xs: 2, sm: 3 },
            }}
          >
            <Stack spacing={2}>
              <Box>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700 }}
                >
                  Weight history
                </Typography>

                <Typography
                  color="text.secondary"
                  variant="body2"
                >
                  Your recorded measurements.
                </Typography>
              </Box>

              {isLoading ? (
                <Stack spacing={1.5}>
                  <Skeleton height={60} />
                  <Skeleton height={60} />
                  <Skeleton height={60} />
                </Stack>
              ) : entries.length === 0 ? (
                <Box
                  sx={{
                    py: 5,
                    textAlign: 'center',
                  }}
                >
                  <Typography color="text.secondary">
                    No weight measurements yet.
                  </Typography>
                </Box>
              ) : (
                <Stack divider={<Divider />}>
                  {[...entries]
                    .sort(
                      (a, b) =>
                        dayjs(b.date).valueOf() -
                        dayjs(a.date).valueOf(),
                    )
                    .map((entry) => (
                      <Box
                        key={entry.id}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: 2,
                          py: 1.5,
                        }}
                      >
                        <Box>
                          <Typography
                            sx={{ fontWeight: 600 }}
                          >
                            {formatDate(entry.date)}
                          </Typography>

                          <Typography
                            color="text.secondary"
                            variant="body2"
                          >
                            {Number(entry.weight).toFixed(1)} kg
                          </Typography>
                        </Box>

                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5,
                          }}
                        >
                          <IconButton
                            size="small"
                            aria-label="Edit weight"
                            onClick={() =>
                              handleEdit(
                                entry.id,
                                Number(entry.weight),
                              )
                            }
                          >
                            <EditOutlinedIcon fontSize="small" />
                          </IconButton>

                          <IconButton
                            size="small"
                            aria-label="Delete weight"
                            onClick={() =>
                              setDeletingId(entry.id)
                            }
                          >
                            <DeleteOutlineOutlinedIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </Box>
                    ))}
                </Stack>
              )}
            </Stack>
          </CardContent>
        </Card>

        {/* Edit weight */}
        {editingId && (
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography
                variant="h6"
                sx={{ mb: 2 }}
              >
                Edit weight
              </Typography>

              <Stack spacing={2}>
                <TextField
                  label="Weight"
                  type="number"
                  value={editingWeight}
                  onChange={(event) =>
                    setEditingWeight(event.target.value)
                  }
                  fullWidth
                  slotProps={{
                    htmlInput: {
                      min: 1,
                      max: 500,
                      step: 0.1,
                    },
                  }}
                />

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: 1,
                  }}
                >
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setEditingId(null)
                      setEditingWeight('')
                    }}
                  >
                    Cancel
                  </Button>

                  <Button
                    variant="contained"
                    onClick={() =>
                      void handleSaveEdit()
                    }
                    disabled={
                      updateWeightMutation.isPending
                    }
                  >
                    {updateWeightMutation.isPending
                      ? 'Saving...'
                      : 'Save'}
                  </Button>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        )}

        {/* Delete confirmation */}
        {deletingId && (
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6">
                Delete weight entry?
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 1 }}
              >
                This action cannot be undone.
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: 1,
                  mt: 2,
                }}
              >
                <Button
                  variant="outlined"
                  onClick={() => setDeletingId(null)}
                >
                  Cancel
                </Button>

                <Button
                  variant="contained"
                  color="error"
                  onClick={() =>
                    void handleDelete()
                  }
                  disabled={
                    deleteWeightMutation.isPending
                  }
                >
                  {deleteWeightMutation.isPending
                    ? 'Deleting...'
                    : 'Delete'}
                </Button>
              </Box>
            </CardContent>
          </Card>
        )}
      </Stack>
    </Box>
  )
}