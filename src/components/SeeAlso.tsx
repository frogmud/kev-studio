import { Box, Typography, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { tokens, getDisciplineColor } from '../theme';
import type { Project } from '../data/types';

interface SeeAlsoProps {
  projects: Project[];
}

export function SeeAlso({ projects }: SeeAlsoProps) {
  if (projects.length === 0) return null;

  return (
    <Box sx={{ mt: 4 }}>
      <Typography
        variant="overline"
        sx={{
          color: tokens.colors.text.muted,
          display: 'block',
          mb: 1.5,
          letterSpacing: '0.1em',
        }}
      >
        See also
      </Typography>
      <Stack spacing={1}>
        {projects.map((project) => {
          const accentColor = project.disciplines[0]
            ? getDisciplineColor(project.disciplines[0])
            : tokens.colors.accent;

          return (
            <Box
              key={project.slug}
              component={Link}
              to={`/work/${project.slug}`}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                p: 1,
                textDecoration: 'none',
                color: 'inherit',
                borderRadius: 1,
                transition: 'all 150ms ease',
                '&:hover': {
                  bgcolor: `${accentColor}10`,
                  '& .see-also-arrow': {
                    transform: 'translateX(4px)',
                  },
                },
              }}
            >
              {project.thumbnail && (
                <Box
                  component="img"
                  src={project.thumbnail}
                  alt={project.name}
                  sx={{
                    width: 80,
                    height: 80,
                    objectFit: 'cover',
                    borderRadius: 1,
                    flexShrink: 0,
                    bgcolor: tokens.colors.background.elevated,
                  }}
                />
              )}
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {project.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: tokens.colors.text.secondary,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {project.summary}
                </Typography>
              </Box>
              <ArrowForwardIcon
                className="see-also-arrow"
                sx={{
                  fontSize: 18,
                  color: tokens.colors.text.muted,
                  flexShrink: 0,
                  transition: 'transform 150ms ease',
                }}
              />
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
}
