import { useState } from 'react';
import { Box, Paper, Typography, IconButton, Collapse, useMediaQuery, useTheme } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { tokens } from '../theme';

interface Section {
  id: string;
  title: string;
}

interface WikiLayoutProps {
  children: React.ReactNode;
  infobox?: React.ReactNode;
  sections?: Section[];
  breadcrumbs?: React.ReactNode;
  footer?: React.ReactNode;
}

export function WikiLayout({ children, infobox, sections, breadcrumbs, footer }: WikiLayoutProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [tocOpen, setTocOpen] = useState(true);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 4,
        flexDirection: { xs: 'column', md: 'row' },
        maxWidth: 1200,
        mx: 'auto',
        px: { xs: 2, md: 4 },
        py: 4,
      }}
    >
      {/* Main Content */}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        {breadcrumbs && <Box sx={{ mb: 3 }}>{breadcrumbs}</Box>}

        {/* Inline TOC for mobile */}
        {sections && sections.length > 0 && isMobile && (
          <Paper
            elevation={0}
            sx={{
              p: 2,
              mb: 3,
              bgcolor: tokens.colors.background.elevated,
            }}
          >
            <Box
              onClick={() => setTocOpen(!tocOpen)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
              }}
            >
              <Typography
                variant="overline"
                sx={{ color: tokens.colors.text.muted }}
              >
                Contents
              </Typography>
              {tocOpen ? (
                <ExpandLessIcon sx={{ fontSize: 18, color: tokens.colors.text.muted }} />
              ) : (
                <ExpandMoreIcon sx={{ fontSize: 18, color: tokens.colors.text.muted }} />
              )}
            </Box>
            <Collapse in={tocOpen}>
              <Box sx={{ mt: 1 }}>
                {sections.map((section, i) => (
                  <Typography
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    sx={{
                      display: 'block',
                      py: 0.5,
                      color: tokens.colors.text.secondary,
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      '&:hover': {
                        color: tokens.colors.text.primary,
                      },
                      '&::before': {
                        content: `"${i + 1}."`,
                        mr: 1,
                        color: tokens.colors.text.muted,
                      },
                    }}
                  >
                    {section.title}
                  </Typography>
                ))}
              </Box>
            </Collapse>
          </Paper>
        )}

        {children}

        {footer && <Box sx={{ mt: 6 }}>{footer}</Box>}
      </Box>

      {/* Infobox Sidebar */}
      {(infobox || sections) && (
        <Box
          sx={{
            width: { xs: '100%', md: 300 },
            flexShrink: 0,
            order: { xs: -1, md: 1 },
          }}
        >
          {infobox && (
            <Paper
              elevation={0}
              sx={{
                p: 2,
                mb: 2,
                bgcolor: tokens.colors.background.elevated,
              }}
            >
              {infobox}
            </Paper>
          )}

          {/* Sticky section navigation (desktop only) */}
          {sections && sections.length > 0 && !isMobile && (
            <Paper
              elevation={0}
              sx={{
                p: 2,
                position: 'sticky',
                top: 80,
                bgcolor: tokens.colors.background.elevated,
              }}
            >
              <Box
                onClick={() => setTocOpen(!tocOpen)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  mb: tocOpen ? 1 : 0,
                }}
              >
                <Typography
                  variant="overline"
                  sx={{ color: tokens.colors.text.muted }}
                >
                  On this page
                </Typography>
                <IconButton size="small" sx={{ p: 0 }}>
                  {tocOpen ? (
                    <ExpandLessIcon sx={{ fontSize: 16, color: tokens.colors.text.muted }} />
                  ) : (
                    <ExpandMoreIcon sx={{ fontSize: 16, color: tokens.colors.text.muted }} />
                  )}
                </IconButton>
              </Box>
              <Collapse in={tocOpen}>
                {sections.map((section) => (
                  <Typography
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    sx={{
                      display: 'block',
                      py: 0.5,
                      color: tokens.colors.text.secondary,
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      '&:hover': {
                        color: tokens.colors.text.primary,
                      },
                    }}
                  >
                    {section.title}
                  </Typography>
                ))}
              </Collapse>
            </Paper>
          )}
        </Box>
      )}
    </Box>
  );
}

// Section anchor wrapper
interface SectionAnchorProps {
  id: string;
  children: React.ReactNode;
}

export function SectionAnchor({ id, children }: SectionAnchorProps) {
  return (
    <Box
      id={id}
      sx={{
        scrollMarginTop: 80,
        mb: 4,
      }}
    >
      {children}
    </Box>
  );
}

// Section header with collapsible chevron
interface SectionHeaderProps {
  title: string;
  collapsible?: boolean;
  defaultOpen?: boolean;
  onToggle?: (open: boolean) => void;
}

export function SectionHeader({ title, collapsible, defaultOpen = true, onToggle }: SectionHeaderProps) {
  const [open, setOpen] = useState(defaultOpen);

  const handleToggle = () => {
    const next = !open;
    setOpen(next);
    onToggle?.(next);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mb: 2,
        pb: 1,
        borderBottom: `1px solid ${tokens.colors.border}`,
        cursor: collapsible ? 'pointer' : 'default',
      }}
      onClick={collapsible ? handleToggle : undefined}
    >
      <Typography variant="h2">{title}</Typography>
      {collapsible && (
        <IconButton size="small" sx={{ p: 0 }}>
          {open ? (
            <ExpandLessIcon sx={{ fontSize: 20, color: tokens.colors.text.muted }} />
          ) : (
            <ExpandMoreIcon sx={{ fontSize: 20, color: tokens.colors.text.muted }} />
          )}
        </IconButton>
      )}
    </Box>
  );
}
