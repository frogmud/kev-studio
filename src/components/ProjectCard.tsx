import { Box, Paper, Typography, Chip, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import type { Project } from '../data/types';
import { tokens, getDisciplineColor } from '../theme';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Paper
      component={Link}
      to={`/work/${project.slug}`}
      elevation={0}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        textDecoration: 'none',
        color: 'inherit',
        overflow: 'hidden',
        transition: 'all 200ms ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          borderColor: tokens.colors.accent,
          '& .project-image': {
            transform: 'scale(1.05)',
          },
        },
      }}
    >
      {/* Thumbnail */}
      <Box
        sx={{
          position: 'relative',
          aspectRatio: '16/10',
          bgcolor: tokens.colors.background.elevated,
          overflow: 'hidden',
        }}
      >
        {project.thumbnail ? (
          <Box
            component="img"
            className="project-image"
            src={project.thumbnail}
            alt={project.name}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 400ms ease',
            }}
          />
        ) : (
          <Box
            className="project-image"
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: tokens.colors.background.elevated,
              transition: 'transform 400ms ease',
            }}
          >
            <Typography
              variant="h3"
              sx={{
                color: tokens.colors.text.muted,
                fontWeight: 500,
              }}
            >
              {project.name.charAt(0)}
            </Typography>
          </Box>
        )}

        {/* Year badge */}
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            bgcolor: 'rgba(0,0,0,0.7)',
            color: '#fff',
            px: 1,
            py: 0.25,
            borderRadius: 1,
            fontSize: '0.75rem',
            fontWeight: 500,
          }}
        >
          {project.year}
        </Box>
      </Box>

      {/* Content */}
      <Box sx={{ p: 2, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h3" sx={{ mb: 0.5 }}>
          {project.name}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: tokens.colors.text.secondary,
            mb: 1.5,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {project.summary}
        </Typography>

        {/* Discipline chips */}
        <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap sx={{ mt: 'auto' }}>
          {project.disciplines.slice(0, 3).map((discipline) => (
            <Chip
              key={discipline}
              label={discipline}
              size="small"
              sx={{
                bgcolor: `${getDisciplineColor(discipline)}20`,
                color: getDisciplineColor(discipline),
                border: `1px solid ${getDisciplineColor(discipline)}40`,
                fontSize: '0.7rem',
                height: 22,
              }}
            />
          ))}
          {project.disciplines.length > 3 && (
            <Chip
              label={`+${project.disciplines.length - 3}`}
              size="small"
              sx={{
                bgcolor: tokens.colors.background.elevated,
                color: tokens.colors.text.muted,
                fontSize: '0.7rem',
                height: 22,
              }}
            />
          )}
        </Stack>
      </Box>
    </Paper>
  );
}
