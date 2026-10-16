import { useEffect, useRef } from 'react'
import { Box, CircularProgress, Typography } from '@mui/material'
import { useNavigate, useSearchParams } from 'react-router'
import { exchangeGoogleCode } from '../api/login'
import { useAuth } from '../hooks/useAuth'
import { paths } from '../../../routes/paths'

export function GoogleCallbackPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { setSession } = useAuth()
  const exchangeStarted = useRef(false)

  useEffect(() => {
    if (exchangeStarted.current) {
      return
    }

    exchangeStarted.current = true

    const code = searchParams.get('code')

    if (!code) {
      navigate(paths.login, { replace: true })
      return
    }

    const exchangeCode = async () => {
      try {
        const response = await exchangeGoogleCode(code)

        setSession({
          tokens: {
            accessToken: response.accessToken,
          },
          user: null,
        })

        if (response.profileCompleted) {
          navigate(paths.dashboard, { replace: true })
        } else {
          navigate(paths.completeProfile, { replace: true })
        }
      } catch {
        navigate(paths.login, { replace: true })
      }
    }

    void exchangeCode()
  }, [navigate, searchParams, setSession])

  return (
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <CircularProgress />

      <Typography>
        Signing in with Google...
      </Typography>
    </Box>
  )
}