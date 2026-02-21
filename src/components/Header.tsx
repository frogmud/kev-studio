import { Box, Typography, IconButton } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { tokens } from '../theme';

interface HeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

export function Header({ isDark, onToggleTheme }: HeaderProps) {
  const location = useLocation();
  const pathname = location.pathname;

  const isWorkActive = pathname === '/' || pathname.startsWith('/work');
  const isGalleryActive = pathname === '/gallery';
  const isAboutActive = pathname === '/about';

  return (
    <Box
      component="header"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: { xs: 2, md: 4 },
        py: 2,
        borderBottom: `1px solid ${tokens.colors.border}`,
        position: 'sticky',
        top: 0,
        bgcolor: isDark ? tokens.colors.background.default : '#fafafa',
        zIndex: 100,
        backdropFilter: 'blur(8px)',
      }}
    >
      {/* Logo / Name */}
      <Box
        component={Link}
        to="/"
        sx={{
          textDecoration: 'none',
          color: 'inherit',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            letterSpacing: '-0.02em',
          }}
        >
          kev.studio
        </Typography>
      </Box>

      {/* Navigation */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
        <Typography
          component={Link}
          to="/"
          sx={{
            color: isWorkActive ? tokens.colors.text.primary : tokens.colors.text.secondary,
            textDecoration: 'none',
            '&:hover': { color: tokens.colors.text.primary },
          }}
        >
          Work
        </Typography>
        <Typography
          component={Link}
          to="/gallery"
          sx={{
            color: isGalleryActive ? tokens.colors.text.primary : tokens.colors.text.secondary,
            textDecoration: 'none',
            '&:hover': { color: tokens.colors.text.primary },
          }}
        >
          Gallery
        </Typography>
        <Typography
          component={Link}
          to="/about"
          sx={{
            color: isAboutActive ? tokens.colors.text.primary : tokens.colors.text.secondary,
            textDecoration: 'none',
            '&:hover': { color: tokens.colors.text.primary },
          }}
        >
          About
        </Typography>

        {/* Theme toggle */}
        <IconButton onClick={onToggleTheme} size="small">
          {isDark ? (
            <LightModeIcon sx={{ fontSize: 20 }} />
          ) : (
            <DarkModeIcon sx={{ fontSize: 20 }} />
          )}
        </IconButton>
      </Box>
    </Box>
  );
}
