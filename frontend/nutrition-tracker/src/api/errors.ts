import axios from 'axios'
import type { ApiProblemDetails } from '../types/api'

export class ApiClientError extends Error {
  readonly status?: number
  readonly fieldErrors?: Record<string, string[]>

  constructor(
    message: string,
    options?: {
      status?: number
      fieldErrors?: Record<string, string[]>
      cause?: unknown
    },
  ) {
    super(message, { cause: options?.cause })
    this.name = 'ApiClientError'
    this.status = options?.status
    this.fieldErrors = options?.fieldErrors
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'string')
}

function getString(value: unknown) {
  return typeof value === 'string' ? value : undefined
}

function getNumber(value: unknown) {
  return typeof value === 'number' ? value : undefined
}

function getFieldErrors(value: unknown) {
  if (!isRecord(value)) {
    return undefined
  }

  const entries = Object.entries(value).filter((entry): entry is [string, string[]] =>
    isStringArray(entry[1]),
  )

  return entries.length > 0 ? Object.fromEntries(entries) : undefined
}

function readProblemDetails(value: unknown): ApiProblemDetails | undefined {
  if (!isRecord(value)) {
    return undefined
  }

  return {
    detail: getString(value.detail),
    errors: getFieldErrors(value.errors),
    status: getNumber(value.status),
    title: getString(value.title),
    traceId: getString(value.traceId),
    type: getString(value.type),
  }
}

function readErrorMessage(value: unknown) {
  if (typeof value === 'string' && value.trim().length > 0) {
    return value
  }

  return undefined
}

export function toApiClientError(error: unknown) {
  if (!axios.isAxiosError(error)) {
    return new ApiClientError('An unexpected error occurred.', { cause: error })
  }

  const problemDetails = readProblemDetails(error.response?.data)
  const responseMessage = readErrorMessage(error.response?.data)
  const message =
    problemDetails?.detail ||
    problemDetails?.title ||
    responseMessage ||
    error.message ||
    'The request failed.'

  return new ApiClientError(message, {
    cause: error,
    fieldErrors: problemDetails?.errors,
    status: problemDetails?.status ?? error.response?.status,
  })
}
