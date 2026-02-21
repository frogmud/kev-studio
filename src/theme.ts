import { createTheme } from '@mui/material/styles';

// CSS custom property values per mode
const darkVars: Record<string, string> = {
  '--bg-default': '#0a0a0a',
  '--bg-paper': '#141414',
  '--bg-elevated': '#1a1a1a',
  '--text-primary': '#ffffff',
  '--text-secondary': '#a0a0a0',
  '--text-muted': '#666666',
  '--border': '#2a2a2a',
};

const lightVars: Record<string, string> = {
  '--bg-default': '#fafafa',
  '--bg-paper': '#ffffff',
  '--bg-elevated': '#e8e8e8',
  '--text-primary': '#1a1a1a',
  '--text-secondary': '#666666',
  '--text-muted': '#999999',
  '--border': '#e5e5e5',
};

// Design tokens — background, text, and border use CSS custom properties
// so they adapt automatically when the theme toggles.
// Accent and discipline colors are identical in both modes (static hex).
export const tokens = {
  colors: {
    background: {
      default: 'var(--bg-default)',
      paper: 'var(--bg-paper)',
      elevated: 'var(--bg-elevated)',
    },
    text: {
      primary: 'var(--text-primary)',
      secondary: 'var(--text-secondary)',
      muted: 'var(--text-muted)',
    },
    accent: '#3b82f6',
    border: 'var(--border)',
    disciplines: {
      Design: '#8b5cf6',
      Direction: '#f59e0b',
      Branding: '#10b981',
      Websites: '#3b82f6',
      Product: '#d946ef',
      Motion: '#ef4444',
      Storyboarding: '#ec4899',
      Strategy: '#06b6d4',
      Print: '#84cc16',
    } as Record<string, string>,
  },
  fonts: {
    body: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    heading: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  radius: {
    sm: 4,
    md: 8,
    lg: 12,
  },
};

const sharedTypography = {
  fontFamily: tokens.fonts.body,
  h1: { fontSize: '2.5rem', fontWeight: 600, letterSpacing: '-0.02em' },
  h2: { fontSize: '1.75rem', fontWeight: 600, letterSpacing: '-0.01em' },
  h3: { fontSize: '1.25rem', fontWeight: 600 },
  body1: { fontSize: '1rem', lineHeight: 1.6 },
  body2: { fontSize: '0.875rem', lineHeight: 1.5 },
} as const;

const sharedComponents = {
  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundImage: 'none',
        border: '1px solid var(--border)',
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: tokens.radius.sm,
        fontWeight: 500,
        fontSize: '0.75rem',
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: 'none' as const,
        fontWeight: 500,
      },
    },
  },
  MuiLink: {
    styleOverrides: {
      root: {
        color: tokens.colors.accent,
        textDecoration: 'none',
        '&:hover': {
          textDecoration: 'underline',
        },
      },
    },
  },
};

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: tokens.colors.accent },
    background: {
      default: darkVars['--bg-default'],
      paper: darkVars['--bg-paper'],
    },
    text: {
      primary: darkVars['--text-primary'],
      secondary: darkVars['--text-secondary'],
    },
    divider: darkVars['--border'],
  },
  typography: sharedTypography,
  shape: { borderRadius: tokens.radius.md },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ':root': darkVars,
        body: {
          backgroundColor: darkVars['--bg-default'],
          scrollBehavior: 'smooth',
        },
        '::-webkit-scrollbar': { width: 8 },
        '::-webkit-scrollbar-track': { background: darkVars['--bg-default'] },
        '::-webkit-scrollbar-thumb': { background: darkVars['--border'], borderRadius: 4 },
      },
    },
    ...sharedComponents,
  },
});

export const lightTheme = createTheme({
  ...darkTheme,
  palette: {
    mode: 'light',
    primary: { main: tokens.colors.accent },
    background: {
      default: lightVars['--bg-default'],
      paper: lightVars['--bg-paper'],
    },
    text: {
      primary: lightVars['--text-primary'],
      secondary: lightVars['--text-secondary'],
    },
    divider: lightVars['--border'],
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ':root': lightVars,
        body: {
          backgroundColor: lightVars['--bg-default'],
          scrollBehavior: 'smooth',
        },
        '::-webkit-scrollbar': { width: 8 },
        '::-webkit-scrollbar-track': { background: lightVars['--bg-default'] },
        '::-webkit-scrollbar-thumb': { background: lightVars['--border'], borderRadius: 4 },
      },
    },
    ...sharedComponents,
  },
});

// Helper to get discipline color
export function getDisciplineColor(discipline: string): string {
  return tokens.colors.disciplines[discipline] || '#a0a0a0';
}
