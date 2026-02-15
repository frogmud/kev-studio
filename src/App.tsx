import { useState, useMemo } from 'react';
import { BrowserRouter, Routes, Route, Link as RouterLink } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box, Typography, Link } from '@mui/material';
import { darkTheme, lightTheme, tokens } from './theme';
import { Header } from './components';
import { Home, Project, About, Gallery } from './screens';

function SiteFooter() {
  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        px: 3,
        mt: 8,
        borderTop: `1px solid ${tokens.colors.border}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Typography
        component={RouterLink}
        to="/"
        variant="body2"
        sx={{ color: tokens.colors.text.secondary, textDecoration: 'none', '&:hover': { color: tokens.colors.text.primary } }}
      >
        kev.studio
      </Typography>
      <Typography variant="body2" sx={{ color: tokens.colors.text.muted }}>
        <Link href="https://kgrz.design" rel="me noopener" target="_blank" underline="hover" sx={{ color: tokens.colors.text.secondary }}>kgrz.design</Link>
        {' / '}
        <Link href="https://neverdie.fun" rel="me noopener" target="_blank" underline="hover" sx={{ color: tokens.colors.text.secondary }}>neverdie.fun</Link>
      </Typography>
    </Box>
  );
}

function App() {
  const [isDark, setIsDark] = useState(true);

  const theme = useMemo(() => (isDark ? darkTheme : lightTheme), [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Header isDark={isDark} onToggleTheme={toggleTheme} />
          <Box sx={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/work/:slug" element={<Project />} />
              <Route path="/about" element={<About />} />
              <Route path="/gallery" element={<Gallery />} />
            </Routes>
          </Box>
          <SiteFooter />
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
