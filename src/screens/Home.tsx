import { useState, useMemo } from 'react';
import { Box, Typography, Grid, Chip, Stack } from '@mui/material';
import { getAllProjects, getDisciplineCounts } from '../data';
import { sortProjects } from '../data/helpers';
import { ProjectCard } from '../components';
import { tokens, getDisciplineColor } from '../theme';
import type { Category, Discipline } from '../data/types';

type FilterCategory = 'all' | Category;

export function Home() {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('all');
  const [activeDiscipline, setActiveDiscipline] = useState<Discipline | null>(null);

  const allProjects = getAllProjects();
  const disciplineCounts = getDisciplineCounts();

  const filteredProjects = useMemo(() => {
    let result = allProjects;

    if (activeCategory !== 'all') {
      result = result.filter((p) => p.categories.includes(activeCategory));
    }

    if (activeDiscipline) {
      result = result.filter((p) => p.disciplines.includes(activeDiscipline));
    }

    return sortProjects(result, 'year-desc');
  }, [allProjects, activeCategory, activeDiscipline]);

  const categories: { id: FilterCategory; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'design', label: 'Design' },
    { id: 'direction', label: 'Direction' },
  ];

  const hiddenDisciplines: Discipline[] = ['Print', 'Storyboarding'];
  const disciplines = Object.entries(disciplineCounts)
    .sort(([, a], [, b]) => b - a)
    .map(([name]) => name as Discipline)
    .filter((d) => !hiddenDisciplines.includes(d));

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2, md: 4 }, py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h1" sx={{ mb: 1 }}>
          Work
        </Typography>
        <Typography variant="body1" sx={{ color: tokens.colors.text.secondary }}>
          Selected projects in branding, motion, and digital design.
        </Typography>
      </Box>

      {/* Category filters */}
      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        {categories.map((cat) => (
          <Chip
            key={cat.id}
            label={cat.label}
            onClick={() => setActiveCategory(cat.id)}
            sx={{
              bgcolor: activeCategory === cat.id ? tokens.colors.accent : tokens.colors.background.elevated,
              color: activeCategory === cat.id ? '#fff' : tokens.colors.text.secondary,
              border: `1px solid ${activeCategory === cat.id ? tokens.colors.accent : tokens.colors.border}`,
              fontWeight: 500,
              '&:hover': {
                bgcolor: activeCategory === cat.id ? tokens.colors.accent : `${tokens.colors.accent}20`,
              },
            }}
          />
        ))}
      </Stack>

      {/* Discipline filters */}
      <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap sx={{ mb: 4 }}>
        {disciplines.map((discipline) => {
          const color = getDisciplineColor(discipline);
          const isActive = activeDiscipline === discipline;

          return (
            <Chip
              key={discipline}
              label={discipline}
              size="small"
              onClick={() => setActiveDiscipline(isActive ? null : discipline)}
              sx={{
                bgcolor: isActive ? `${color}30` : 'transparent',
                color: isActive ? color : tokens.colors.text.muted,
                border: `1px solid ${isActive ? color : tokens.colors.border}`,
                fontSize: '0.75rem',
                mb: 0.5,
                '&:hover': {
                  bgcolor: `${color}20`,
                  color: color,
                },
              }}
            />
          );
        })}
      </Stack>

      {/* Results count */}
      <Typography variant="body2" sx={{ color: tokens.colors.text.muted, mb: 3 }}>
        {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
      </Typography>

      {/* Project grid */}
      <Grid container spacing={3}>
        {filteredProjects.map((project) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={project.slug}>
            <ProjectCard project={project} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
