import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import {
  Alert,
  Box,
  Button,
  Card,
  InputAdornment,
  Pagination,
  TextField,
  Typography,
} from '@mui/material'
import { useCallback, useMemo, useState } from 'react'
import { ConfirmDialog } from '../../../components/dialogs/ConfirmDialog'
import { PageHeader } from '../../../components/layout/PageHeader'
import { PageShell } from '../../../components/layout/PageShell'
import { useSnackbar } from '../../../hooks/useSnackbar'
import type { Product } from '../api/products'
import { ProductFormDialog } from '../components/ProductFormDialog'
import { ProductsTable } from '../components/ProductsTable'
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useProductsQuery,
  useUpdateProductMutation,
} from '../hooks/useProductsQuery'
import type { ProductFormValues } from '../validation/productSchema'

const PAGE_SIZE = 10

export function ProductsPage() {
  const { showSnackbar } = useSnackbar()

  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [page, setPage] = useState(1)

  const [addOpen, setAddOpen] = useState(false)
  const [editTarget, setEditTarget] = useState<Product | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null)

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value)
    setPage(1)
    const timer = setTimeout(() => setDebouncedSearch(value), 350)
    return () => clearTimeout(timer)
  }, [])

  const queryParams = useMemo(
    () => ({
      search: debouncedSearch || undefined,
      page,
      pageSize: PAGE_SIZE,
    }),
    [debouncedSearch, page],
  )

  const { data, isLoading, isError, error } = useProductsQuery(queryParams)

  const createMutation = useCreateProductMutation()
  const updateMutation = useUpdateProductMutation()
  const deleteMutation = useDeleteProductMutation()

  const products: Product[] = Array.isArray(data)
    ? data
    : (data as { items?: Product[] } | undefined)?.items ?? []

  const totalCount: number = Array.isArray(data)
    ? data.length
    : (data as { totalCount?: number } | undefined)?.totalCount ?? 0

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE))

  const handleAdd = async (values: ProductFormValues) => {
    await createMutation.mutateAsync(values)
    setAddOpen(false)
    showSnackbar({ message: 'Product added successfully', severity: 'success' })
  }

  const handleEdit = async (values: ProductFormValues) => {
    if (!editTarget) return
    await updateMutation.mutateAsync({ id: editTarget.id, request: values })
    setEditTarget(null)
    showSnackbar({ message: 'Product updated successfully', severity: 'success' })
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    await deleteMutation.mutateAsync(deleteTarget.id)
    setDeleteTarget(null)
    showSnackbar({ message: 'Product deleted', severity: 'success' })
  }

  return (
    <PageShell>
      <PageHeader
        action={
          <Button
            onClick={() => setAddOpen(true)}
            startIcon={<AddOutlinedIcon />}
            variant="contained"
          >
            Add product
          </Button>
        }
        description="Manage your food catalogue. Nutrition values are stored per 100 g."
        title="Products"
      />

      <Card>
        <Box
          sx={{
            alignItems: 'center',
            borderBottom: (t) => `1px solid ${t.palette.divider}`,
            display: 'flex',
            gap: 2,
            p: 2,
          }}
        >
          <TextField
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchOutlinedIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
              },
            }}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search products…"
            size="small"
            sx={{ maxWidth: 320, width: '100%' }}
            value={search}
          />

          {totalCount > 0 && !isLoading && (
            <Typography color="text.secondary" sx={{ ml: 'auto' }} variant="body2">
              {totalCount} {totalCount === 1 ? 'product' : 'products'}
            </Typography>
          )}
        </Box>

        {isError ? (
          <Alert severity="error" sx={{ m: 2 }}>
            {error instanceof Error ? error.message : 'Failed to load products.'}
          </Alert>
        ) : (
          <ProductsTable
            isLoading={isLoading}
            onDelete={setDeleteTarget}
            onEdit={setEditTarget}
            products={products}
          />
        )}

        {!isLoading && totalPages > 1 && (
          <Box
            sx={{
              borderTop: (t) => `1px solid ${t.palette.divider}`,
              display: 'flex',
              justifyContent: 'center',
              p: 2,
            }}
          >
            <Pagination
              count={totalPages}
              onChange={(_, value) => setPage(value)}
              page={page}
              shape="rounded"
              size="small"
            />
          </Box>
        )}
      </Card>

      <ProductFormDialog
        isSubmitting={createMutation.isPending}
        onClose={() => setAddOpen(false)}
        onSubmit={handleAdd}
        open={addOpen}
        submitLabel="Add product"
        title="Add product"
      />

      <ProductFormDialog
        initialValues={editTarget ?? undefined}
        isSubmitting={updateMutation.isPending}
        onClose={() => setEditTarget(null)}
        onSubmit={handleEdit}
        open={Boolean(editTarget)}
        submitLabel="Save changes"
        title="Edit product"
      />

      <ConfirmDialog
        confirmColor="error"
        confirmLabel="Delete"
        description={`"${deleteTarget?.name ?? ''}" will be permanently removed from your catalogue.`}
        isPending={deleteMutation.isPending}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        open={Boolean(deleteTarget)}
        title="Delete product?"
      />
    </PageShell>
  )
}
