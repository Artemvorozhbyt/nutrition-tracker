import { alpha, createTheme } from '@mui/material/styles'
import type { PaletteMode, ThemeOptions } from '@mui/material'

const getPalette = (mode: PaletteMode): ThemeOptions['palette'] => {
  const isDark = mode === 'dark'

  return {
    mode,
    primary: {
      contrastText: isDark ? '#06201d' : '#ffffff',
      dark: isDark ? '#2dd4bf' : '#115e59',
      light: isDark ? '#99f6e4' : '#5eead4',
      main: isDark ? '#5eead4' : '#0f766e',
    },
    secondary: {
      contrastText: '#ffffff',
      dark: isDark ? '#a21caf' : '#86198f',
      light: isDark ? '#f0abfc' : '#e879f9',
      main: isDark ? '#d946ef' : '#a21caf',
    },
    success: {
      main: isDark ? '#86efac' : '#15803d',
    },
    warning: {
      main: isDark ? '#facc15' : '#b45309',
    },
    error: {
      main: isDark ? '#fca5a5' : '#dc2626',
    },
    background: {
      default: isDark ? '#111413' : '#f7faf8',
      paper: isDark ? '#171c1a' : '#ffffff',
    },
    divider: isDark ? alpha('#d1fae5', 0.12) : alpha('#134e4a', 0.12),
    text: {
      primary: isDark ? '#f1f5f3' : '#17211f',
      secondary: isDark ? '#a7b8b3' : '#5f716d',
    },
  }
}

export function createAppTheme(mode: PaletteMode) {
  const isDark = mode === 'dark'

  return createTheme({
    components: {
      MuiAlert: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: theme.shape.borderRadius,
          }),
        },
      },
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: theme.shape.borderRadius,
            fontWeight: 700,
            letterSpacing: 0,
            minHeight: 42,
            textTransform: 'none',
          }),
        },
      },
      MuiCard: {
        defaultProps: {
          elevation: 0,
        },
        styleOverrides: {
          root: ({ theme }) => ({
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: theme.shape.borderRadius,
            boxShadow: isDark
              ? '0 18px 48px rgba(0, 0, 0, 0.28)'
              : '0 18px 48px rgba(15, 23, 42, 0.08)',
          }),
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundImage: isDark
              ? 'linear-gradient(180deg, #111413 0%, #151816 100%)'
              : 'linear-gradient(180deg, #f7faf8 0%, #eef7f3 100%)',
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: ({ theme }) => ({
            borderRadius: theme.shape.borderRadius,
          }),
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: theme.shape.borderRadius,
          }),
        },
      },
      MuiPaper: {
        styleOverrides: {
          rounded: ({ theme }) => ({
            borderRadius: theme.shape.borderRadius,
          }),
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: ({ theme }) => ({
            borderRadius: theme.shape.borderRadius,
            fontSize: theme.typography.pxToRem(12),
          }),
        },
      },
    },
    palette: getPalette(mode),
    shape: {
      borderRadius: 12,
    },
    typography: {
      allVariants: {
        letterSpacing: 0,
      },
      button: {
        letterSpacing: 0,
        textTransform: 'none',
      },
      fontFamily:
        "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      h1: {
        fontSize: '2rem',
        fontWeight: 800,
        letterSpacing: 0,
        lineHeight: 1.15,
      },
      h2: {
        fontSize: '1.5rem',
        fontWeight: 800,
        letterSpacing: 0,
        lineHeight: 1.2,
      },
      h3: {
        fontSize: '1.25rem',
        fontWeight: 800,
        letterSpacing: 0,
        lineHeight: 1.25,
      },
    },
  })
}
