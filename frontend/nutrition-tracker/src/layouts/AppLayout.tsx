import { useState } from 'react'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'
import MonitorWeightOutlinedIcon from '@mui/icons-material/MonitorWeightOutlined'
import NightlightOutlinedIcon from '@mui/icons-material/NightlightOutlined'
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined'
import { Avatar, Button, Drawer, IconButton, Stack, Tooltip } from '@mui/material'
import { styled } from '@mui/material/styles'
import type { ReactNode } from 'react'
import { NavLink, Outlet } from 'react-router'
import { useAuth } from '../features/auth/hooks/useAuth'
import { useThemeMode } from '../theme/useThemeMode'
import { paths } from '../routes/paths'

const drawerWidth = 288

type NavigationItem = {
  icon: ReactNode
  label: string
  path: string
}

const navigationItems: NavigationItem[] = [
  {
    icon: <DashboardOutlinedIcon fontSize="small" />,
    label: 'Dashboard',
    path: paths.dashboard,
  },
  {
    icon: <SearchOutlinedIcon fontSize="small" />,
    label: 'Products',
    path: paths.products,
  },
  {
    icon: <RestaurantOutlinedIcon fontSize="small" />,
    label: 'Meals',
    path: paths.meals,
  },
  {
    icon: <MonitorWeightOutlinedIcon fontSize="small" />,
    label: 'Weight',
    path: paths.weight,
  },
  {
    icon: <FlagOutlinedIcon fontSize="small" />,
    label: 'Goals',
    path: paths.goals,
  },
]

const ShellRoot = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  display: 'flex',
  minHeight: '100svh',
}))

const DesktopSidebar = styled('aside')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRight: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  flex: `0 0 ${drawerWidth}px`,
  minHeight: '100svh',
  padding: theme.spacing(2),
  position: 'sticky',
  top: 0,
  [theme.breakpoints.down('lg')]: {
    display: 'none',
  },
}))

const MobileHeader = styled('header')(({ theme }) => ({
  alignItems: 'center',
  backdropFilter: 'blur(18px)',
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(17, 20, 19, 0.86)'
      : 'rgba(247, 250, 248, 0.86)',
  borderBottom: `1px solid ${theme.palette.divider}`,
  display: 'none',
  gap: theme.spacing(1.5),
  minHeight: 72,
  padding: theme.spacing(1.5, 2),
  position: 'fixed',
  top: 0,
  width: '100%',
  zIndex: theme.zIndex.appBar,
  [theme.breakpoints.down('lg')]: {
    display: 'flex',
  },
}))

const MobileDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    backgroundColor: theme.palette.background.paper,
    borderRight: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(2),
    width: drawerWidth,
  },
}))

const MainContent = styled('main')(({ theme }) => ({
  flex: '1 1 auto',
  minWidth: 0,
  [theme.breakpoints.down('lg')]: {
    paddingTop: 72,
  },
}))

const NavigationRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2.5),
  minHeight: '100%',
  width: '100%',
}))

const BrandBlock = styled('div')(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  gap: theme.spacing(1.5),
  minHeight: 56,
  padding: theme.spacing(0, 0.75),
}))

const BrandIcon = styled('div')(({ theme }) => ({
  alignItems: 'center',
  backgroundColor: theme.palette.primary.main,
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.primary.contrastText,
  display: 'inline-flex',
  fontWeight: 900,
  height: 40,
  justifyContent: 'center',
  width: 40,
}))

const BrandName = styled('p')(({ theme }) => ({
  ...theme.typography.body1,
  color: theme.palette.text.primary,
  fontWeight: 800,
  margin: 0,
}))

const BrandSubtleText = styled('p')(({ theme }) => ({
  ...theme.typography.caption,
  color: theme.palette.text.secondary,
  margin: 0,
}))

const NavigationList = styled('nav')(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(0.75),
}))

const NavigationLink = styled(NavLink)(({ theme }) => ({
  alignItems: 'center',
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.text.secondary,
  display: 'flex',
  gap: theme.spacing(1.5),
  minHeight: 46,
  padding: theme.spacing(1.25, 1.5),
  textDecoration: 'none',
  transition: theme.transitions.create(['background-color', 'color'], {
    duration: theme.transitions.duration.shorter,
  }),
  '&.active': {
    backgroundColor: theme.palette.action.selected,
    color: theme.palette.primary.main,
  },
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    color: theme.palette.text.primary,
  },
}))

const NavigationIcon = styled('span')({
  alignItems: 'center',
  display: 'inline-flex',
  flex: '0 0 22px',
  justifyContent: 'center',
})

const NavigationLabel = styled('span')(({ theme }) => ({
  ...theme.typography.body2,
  fontWeight: 700,
}))

const SidebarFooter = styled('div')(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(1.5),
  marginTop: 'auto',
}))

const UserSummary = styled('div')(({ theme }) => ({
  alignItems: 'center',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  gap: theme.spacing(1.25),
  minWidth: 0,
  padding: theme.spacing(1.25),
}))

const MobileTitle = styled('div')({
  flex: '1 1 auto',
  minWidth: 0,
})

const UserName = styled('p')(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.primary,
  fontWeight: 800,
  margin: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}))

const UserMeta = styled('p')(({ theme }) => ({
  ...theme.typography.caption,
  color: theme.palette.text.secondary,
  margin: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}))

const MobileTitleText = styled('p')(({ theme }) => ({
  ...theme.typography.body1,
  color: theme.palette.text.primary,
  fontWeight: 800,
  margin: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}))

type NavigationContentProps = {
  onNavigate?: () => void
}

function NavigationContent({ onNavigate }: NavigationContentProps) {
  const { clearSession, user } = useAuth()
  const { mode, toggleMode } = useThemeMode()

  const handleSignOut = () => {
    clearSession()
    onNavigate?.()
  }

  return (
    <NavigationRoot>
      <BrandBlock>
        <BrandIcon>NT</BrandIcon>
        <div>
          <BrandName>Nutrition</BrandName>
          <BrandSubtleText>Tracker</BrandSubtleText>
        </div>
      </BrandBlock>

      <NavigationList aria-label="Primary">
        {navigationItems.map((item) => (
          <NavigationLink key={item.path} onClick={onNavigate} to={item.path}>
            <NavigationIcon>{item.icon}</NavigationIcon>
            <NavigationLabel>{item.label}</NavigationLabel>
          </NavigationLink>
        ))}
      </NavigationList>

      <SidebarFooter>
        <Stack direction="row" spacing={1}>
          <Tooltip title={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
            <IconButton aria-label="Toggle theme" onClick={toggleMode}>
              {mode === 'dark' ? <WbSunnyOutlinedIcon /> : <NightlightOutlinedIcon />}
            </IconButton>
          </Tooltip>
        </Stack>
        <UserSummary>
          <Avatar>{user?.email?.[0]?.toUpperCase() ?? 'U'}</Avatar>
          <div>
            <UserName>{user?.displayName ?? user?.email ?? 'Authenticated user'}</UserName>
            <UserMeta>Active session</UserMeta>
          </div>
        </UserSummary>
        <Button
          color="inherit"
          fullWidth
          onClick={handleSignOut}
          startIcon={<LogoutOutlinedIcon />}
          variant="outlined"
        >
          Sign out
        </Button>
      </SidebarFooter>
    </NavigationRoot>
  )
}

export function AppLayout() {
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const closeMobileNavigation = () => {
    setIsMobileOpen(false)
  }

  return (
    <ShellRoot>
      <DesktopSidebar>
        <NavigationContent />
      </DesktopSidebar>
      <MobileHeader>
        <IconButton
          aria-label="Open navigation"
          onClick={() => setIsMobileOpen(true)}
        >
          <MenuOutlinedIcon />
        </IconButton>
        <MobileTitle>
          <MobileTitleText>Nutrition Tracker</MobileTitleText>
        </MobileTitle>
      </MobileHeader>
      <MobileDrawer onClose={closeMobileNavigation} open={isMobileOpen}>
        <NavigationContent onNavigate={closeMobileNavigation} />
      </MobileDrawer>
      <MainContent>
        <Outlet />
      </MainContent>
    </ShellRoot>
  )
}
