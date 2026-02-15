import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { Box, Typography, Grid, Chip, Stack, Modal, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { getAllProjects } from '../data';
import { tokens, getDisciplineColor } from '../theme';
import type { Discipline } from '../data/types';

interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
  projectName: string;
  projectSlug: string;
  year: number;
  disciplines: Discipline[];
}

export function Gallery() {
  const [filterProject, setFilterProject] = useState<string | null>(null);
  const [filterDiscipline, setFilterDiscipline] = useState<Discipline | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(24);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const allProjects = getAllProjects();

  // Flatten all project images into a single gallery
  const allImages: GalleryImage[] = useMemo(() => {
    const images: GalleryImage[] = [];
    for (const project of allProjects) {
      if (!project.images) continue;
      for (const image of project.images) {
        images.push({
          src: image.src,
          alt: image.alt || `${project.name} image`,
          caption: image.caption,
          projectName: project.name,
          projectSlug: project.slug,
          year: project.year,
          disciplines: project.disciplines,
        });
      }
    }
    return images.sort((a, b) => b.year - a.year);
  }, [allProjects]);

  // Apply filters
  const filteredImages = useMemo(() => {
    let result = allImages;

    if (filterProject) {
      result = result.filter((img) => img.projectSlug === filterProject);
    }

    if (filterDiscipline) {
      result = result.filter((img) => img.disciplines.includes(filterDiscipline));
    }

    return result;
  }, [allImages, filterProject, filterDiscipline]);

  const visibleImages = filteredImages.slice(0, visibleCount);

  // Intersection observer for lazy loading more images
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount < filteredImages.length) {
          setVisibleCount((prev) => Math.min(prev + 12, filteredImages.length));
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [visibleCount, filteredImages.length]);

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(24);
  }, [filterProject, filterDiscipline]);

  // Lightbox navigation
  const navigateLightbox = useCallback(
    (direction: -1 | 1) => {
      if (lightboxIndex === null) return;
      const next = lightboxIndex + direction;
      if (next >= 0 && next < filteredImages.length) {
        setLightboxIndex(next);
      }
    },
    [lightboxIndex, filteredImages.length]
  );

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') navigateLightbox(-1);
      if (e.key === 'ArrowRight') navigateLightbox(1);
      if (e.key === 'Escape') setLightboxIndex(null);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightboxIndex, navigateLightbox]);

  // Unique project names for filter
  const projectOptions = useMemo(() => {
    const unique = new Map<string, string>();
    for (const img of allImages) {
      unique.set(img.projectSlug, img.projectName);
    }
    return Array.from(unique.entries()).sort(([, a], [, b]) => a.localeCompare(b));
  }, [allImages]);

  // Unique disciplines
  const disciplineOptions = useMemo(() => {
    const set = new Set<Discipline>();
    for (const img of allImages) {
      for (const d of img.disciplines) set.add(d);
    }
    return Array.from(set);
  }, [allImages]);

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2, md: 4 }, py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h1" sx={{ mb: 1 }}>
          Gallery
        </Typography>
        <Typography variant="body1" sx={{ color: tokens.colors.text.secondary }}>
          Browse all project images.
        </Typography>
      </Box>

      {/* Filters */}
      <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap sx={{ mb: 2 }}>
        <Chip
          label="All Projects"
          size="small"
          onClick={() => setFilterProject(null)}
          sx={{
            bgcolor: !filterProject ? tokens.colors.accent : 'transparent',
            color: !filterProject ? '#fff' : tokens.colors.text.secondary,
            border: `1px solid ${!filterProject ? tokens.colors.accent : tokens.colors.border}`,
            mb: 0.5,
          }}
        />
        {projectOptions.map(([slug, name]) => (
          <Chip
            key={slug}
            label={name}
            size="small"
            onClick={() => setFilterProject(filterProject === slug ? null : slug)}
            sx={{
              bgcolor: filterProject === slug ? tokens.colors.accent : 'transparent',
              color: filterProject === slug ? '#fff' : tokens.colors.text.muted,
              border: `1px solid ${filterProject === slug ? tokens.colors.accent : tokens.colors.border}`,
              mb: 0.5,
            }}
          />
        ))}
      </Stack>

      <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap sx={{ mb: 4 }}>
        {disciplineOptions.map((discipline) => {
          const color = getDisciplineColor(discipline);
          const isActive = filterDiscipline === discipline;
          return (
            <Chip
              key={discipline}
              label={discipline}
              size="small"
              onClick={() => setFilterDiscipline(isActive ? null : discipline)}
              sx={{
                bgcolor: isActive ? `${color}30` : 'transparent',
                color: isActive ? color : tokens.colors.text.muted,
                border: `1px solid ${isActive ? color : tokens.colors.border}`,
                fontSize: '0.75rem',
                mb: 0.5,
              }}
            />
          );
        })}
      </Stack>

      {/* Count */}
      <Typography variant="body2" sx={{ color: tokens.colors.text.muted, mb: 3 }}>
        {filteredImages.length} image{filteredImages.length !== 1 ? 's' : ''}
      </Typography>

      {/* Image grid */}
      <Grid container spacing={1.5}>
        {visibleImages.map((image, i) => (
          <Grid size={{ xs: 6, sm: 4, md: 3 }} key={`${image.projectSlug}-${i}`}>
            <Box
              onClick={() => setLightboxIndex(i)}
              sx={{
                cursor: 'pointer',
                borderRadius: 1,
                overflow: 'hidden',
                position: 'relative',
                transition: 'transform 150ms ease',
                '&:hover': {
                  transform: 'scale(1.02)',
                  '& .gallery-overlay': { opacity: 1 },
                },
              }}
            >
              <Box
                component="img"
                src={image.src}
                alt={image.alt}
                loading="lazy"
                sx={{
                  width: '100%',
                  aspectRatio: '1/1',
                  objectFit: 'cover',
                  display: 'block',
                  bgcolor: tokens.colors.background.elevated,
                }}
              />
              <Box
                className="gallery-overlay"
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  p: 1,
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                  opacity: 0,
                  transition: 'opacity 150ms ease',
                }}
              >
                <Typography sx={{ color: '#fff', fontSize: '0.75rem', fontWeight: 500 }}>
                  {image.projectName}
                </Typography>
                {image.caption && (
                  <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.65rem' }}>
                    {image.caption}
                  </Typography>
                )}
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Lazy load sentinel */}
      {visibleCount < filteredImages.length && (
        <Box ref={sentinelRef} sx={{ height: 1, mt: 2 }} />
      )}

      {/* Lightbox */}
      <Modal
        open={lightboxIndex !== null}
        onClose={() => setLightboxIndex(null)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            maxWidth: '90vw',
            maxHeight: '90vh',
            outline: 'none',
          }}
        >
          <IconButton
            onClick={() => setLightboxIndex(null)}
            sx={{ position: 'absolute', top: -40, right: 0, color: '#fff' }}
          >
            <CloseIcon />
          </IconButton>

          {/* Nav arrows */}
          {lightboxIndex !== null && lightboxIndex > 0 && (
            <IconButton
              onClick={() => navigateLightbox(-1)}
              sx={{ position: 'absolute', left: -48, top: '50%', transform: 'translateY(-50%)', color: '#fff' }}
            >
              <NavigateBeforeIcon sx={{ fontSize: 32 }} />
            </IconButton>
          )}
          {lightboxIndex !== null && lightboxIndex < filteredImages.length - 1 && (
            <IconButton
              onClick={() => navigateLightbox(1)}
              sx={{ position: 'absolute', right: -48, top: '50%', transform: 'translateY(-50%)', color: '#fff' }}
            >
              <NavigateNextIcon sx={{ fontSize: 32 }} />
            </IconButton>
          )}

          {lightboxIndex !== null && filteredImages[lightboxIndex] && (
            <>
              <Box
                component="img"
                src={filteredImages[lightboxIndex].src}
                alt={filteredImages[lightboxIndex].alt}
                sx={{
                  maxWidth: '90vw',
                  maxHeight: '85vh',
                  objectFit: 'contain',
                  borderRadius: 1,
                  display: 'block',
                }}
              />
              <Box sx={{ textAlign: 'center', mt: 1 }}>
                <Typography sx={{ color: '#fff', fontSize: '0.85rem' }}>
                  {filteredImages[lightboxIndex].projectName}
                </Typography>
                {filteredImages[lightboxIndex].caption && (
                  <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem' }}>
                    {filteredImages[lightboxIndex].caption}
                  </Typography>
                )}
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
}
