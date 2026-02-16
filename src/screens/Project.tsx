import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, Typography, Chip, Stack, Grid, Modal, IconButton } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import BusinessIcon from '@mui/icons-material/Business';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import CloseIcon from '@mui/icons-material/Close';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { getProject, getRelatedProjects } from '../data';
import { WikiLayout, SectionAnchor, SectionHeader, Breadcrumbs, Blockquote, SeeAlso } from '../components';
import { tokens, getDisciplineColor } from '../theme';

export function Project() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProject(slug) : undefined;
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const images = project?.images ?? [];
  const lightboxOpen = lightboxIndex !== null;

  const goNext = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i + 1) % images.length : null));
  }, [images.length]);

  const goPrev = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i - 1 + images.length) % images.length : null));
  }, [images.length]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext();
      else if (e.key === 'ArrowLeft') goPrev();
      else if (e.key === 'Escape') setLightboxIndex(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxOpen, goNext, goPrev]);

  if (!project) {
    return (
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: 4, py: 8, textAlign: 'center' }}>
        <Typography variant="h2">Project not found</Typography>
        <Typography
          component={Link}
          to="/"
          sx={{ color: tokens.colors.accent, mt: 2, display: 'block' }}
        >
          Back to work
        </Typography>
      </Box>
    );
  }

  const relatedProjects = getRelatedProjects(project.slug, 3);

  const hasImages = project.images && project.images.length > 0;
  const hasVideos = project.videos && project.videos.length > 0;
  const hasQuotes = project.quotes && project.quotes.length > 0;

  const sections = [
    { id: 'overview', title: 'Overview' },
    ...(project.sections || []).map((s) => ({ id: s.id, title: s.title })),
    ...(hasImages ? [{ id: 'gallery', title: 'Gallery' }] : []),
    ...(hasVideos ? [{ id: 'videos', title: 'Videos' }] : []),
    ...(relatedProjects.length > 0 ? [{ id: 'related', title: 'Related Projects' }] : []),
  ];

  // Infobox content
  const infobox = (
    <Box>
      {/* Hero image */}
      {project.heroImage || project.thumbnail ? (
        <Box
          sx={{
            borderRadius: 1,
            mb: 2,
            bgcolor: tokens.colors.background.elevated,
            overflow: 'hidden',
            ...(((project.heroImage || project.thumbnail) ?? '').endsWith('.svg')
              ? { p: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }
              : {}),
          }}
        >
          <Box
            component="img"
            src={project.heroImage || project.thumbnail}
            alt={project.name}
            sx={{
              width: '100%',
              display: 'block',
              ...(((project.heroImage || project.thumbnail) ?? '').endsWith('.svg')
                ? { maxWidth: 200 }
                : {}),
            }}
          />
        </Box>
      ) : (
        <Box
          sx={{
            width: '100%',
            aspectRatio: '16/10',
            bgcolor: tokens.colors.background.paper,
            borderRadius: 1,
            mb: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h1" sx={{ color: tokens.colors.text.muted }}>
            {project.name.charAt(0)}
          </Typography>
        </Box>
      )}

      {/* Title */}
      <Typography variant="h2" sx={{ mb: 1 }}>
        {project.name}
      </Typography>

      {/* Meta table */}
      <Box
        component="table"
        sx={{
          width: '100%',
          borderCollapse: 'collapse',
          mb: 2,
          '& td': {
            py: 0.75,
            borderBottom: `1px solid ${tokens.colors.border}`,
            fontSize: '0.875rem',
            verticalAlign: 'top',
          },
          '& td:first-of-type': {
            color: tokens.colors.text.muted,
            pr: 2,
            whiteSpace: 'nowrap',
            width: '1%',
          },
        }}
      >
        <tbody>
          <tr>
            <td>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <CalendarTodayIcon sx={{ fontSize: 14 }} />
                Year
              </Box>
            </td>
            <td>{project.year}</td>
          </tr>
          {project.client && (
            <tr>
              <td>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <BusinessIcon sx={{ fontSize: 14 }} />
                  Client
                </Box>
              </td>
              <td>{project.client}</td>
            </tr>
          )}
          {project.agency && (
            <tr>
              <td>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <WorkIcon sx={{ fontSize: 14 }} />
                  Agency
                </Box>
              </td>
              <td>{project.agency}</td>
            </tr>
          )}
          {project.role && (
            <tr>
              <td>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <PersonIcon sx={{ fontSize: 14 }} />
                  Role
                </Box>
              </td>
              <td>{project.role}</td>
            </tr>
          )}
        </tbody>
      </Box>

      {/* Disciplines */}
      <Typography
        variant="overline"
        sx={{ color: tokens.colors.text.muted, display: 'block', mb: 1 }}
      >
        Disciplines
      </Typography>
      <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
        {project.disciplines.map((discipline) => (
          <Chip
            key={discipline}
            label={discipline}
            size="small"
            sx={{
              bgcolor: `${getDisciplineColor(discipline)}20`,
              color: getDisciplineColor(discipline),
              border: `1px solid ${getDisciplineColor(discipline)}40`,
              fontSize: '0.7rem',
              mb: 0.5,
            }}
          />
        ))}
      </Stack>
    </Box>
  );

  // Breadcrumb footer
  const footer = (
    <Box
      sx={{
        pt: 3,
        borderTop: `1px solid ${tokens.colors.border}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 1,
      }}
    >
      <Typography variant="body2" sx={{ color: tokens.colors.text.muted }}>
        Home {'>'} Work {'>'} {project.name}
      </Typography>
      {project.lastUpdated && (
        <Typography variant="body2" sx={{ color: tokens.colors.text.muted, fontSize: '0.75rem' }}>
          Last updated {project.lastUpdated}
        </Typography>
      )}
    </Box>
  );

  return (
    <WikiLayout
      infobox={infobox}
      sections={sections}
      breadcrumbs={<Breadcrumbs items={[{ label: project.name }]} />}
      footer={footer}
    >
      {/* Overview */}
      <SectionAnchor id="overview">
        <SectionHeader title="Overview" />
        <Typography variant="body1" sx={{ mb: 2 }}>
          {project.summary}
        </Typography>
        {project.description && (
          <Typography variant="body1" sx={{ color: tokens.colors.text.secondary }}>
            {project.description}
          </Typography>
        )}
        {/* Quotes in overview */}
        {hasQuotes && project.quotes!.map((quote, i) => (
          <Blockquote key={i} text={quote.text} attribution={quote.attribution} />
        ))}
      </SectionAnchor>

      {/* Dynamic sections */}
      {project.sections?.map((section) => (
        <SectionAnchor key={section.id} id={section.id}>
          <SectionHeader title={section.title} />
          <Typography variant="body1">{section.content}</Typography>
        </SectionAnchor>
      ))}

      {/* Gallery */}
      {hasImages && (
        <SectionAnchor id="gallery">
          <SectionHeader title="Gallery" />
          <Grid container spacing={2}>
            {project.images!.map((image, i) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
                <Box
                  onClick={() => setLightboxIndex(i)}
                  sx={{
                    cursor: 'pointer',
                    borderRadius: 1,
                    overflow: 'hidden',
                    transition: 'transform 150ms ease',
                    '&:hover': {
                      transform: 'scale(1.02)',
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={image.src}
                    alt={image.alt || `${project.name} image ${i + 1}`}
                    sx={{
                      width: '100%',
                      aspectRatio: '16/10',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                </Box>
                {image.caption && (
                  <Typography
                    variant="body2"
                    sx={{ color: tokens.colors.text.muted, mt: 0.5, fontSize: '0.75rem' }}
                  >
                    {image.caption}
                  </Typography>
                )}
              </Grid>
            ))}
          </Grid>
        </SectionAnchor>
      )}

      {/* Videos */}
      {hasVideos && (
        <SectionAnchor id="videos">
          <SectionHeader title="Videos" />
          <Stack spacing={3}>
            {project.videos!.map((video, i) => (
              <Box key={i}>
                {video.title && (
                  <Typography variant="h3" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PlayCircleOutlineIcon sx={{ fontSize: 20 }} />
                    {video.title}
                  </Typography>
                )}
                <Box
                  sx={{
                    position: 'relative',
                    paddingBottom: '56.25%',
                    height: 0,
                    overflow: 'hidden',
                    borderRadius: 1,
                    bgcolor: tokens.colors.background.elevated,
                  }}
                >
                  <Box
                    component="iframe"
                    src={video.src}
                    title={video.title || `${project.name} video ${i + 1}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      border: 0,
                    }}
                  />
                </Box>
                {video.caption && (
                  <Typography
                    variant="body2"
                    sx={{ color: tokens.colors.text.muted, mt: 1, fontSize: '0.85rem' }}
                  >
                    {video.caption}
                  </Typography>
                )}
              </Box>
            ))}
          </Stack>
        </SectionAnchor>
      )}

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <SectionAnchor id="related">
          <SectionHeader title="Related Projects" />
          <SeeAlso projects={relatedProjects} />
        </SectionAnchor>
      )}

      {/* Lightbox Modal */}
      <Modal
        open={lightboxOpen}
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
            sx={{
              position: 'absolute',
              top: -40,
              right: 0,
              color: '#fff',
            }}
          >
            <CloseIcon />
          </IconButton>
          {images.length > 1 && (
            <>
              <IconButton
                onClick={goPrev}
                sx={{
                  position: 'absolute',
                  left: -48,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#fff',
                  bgcolor: 'rgba(0,0,0,0.5)',
                  '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
                }}
              >
                <ChevronLeftIcon />
              </IconButton>
              <IconButton
                onClick={goNext}
                sx={{
                  position: 'absolute',
                  right: -48,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#fff',
                  bgcolor: 'rgba(0,0,0,0.5)',
                  '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
                }}
              >
                <ChevronRightIcon />
              </IconButton>
            </>
          )}
          {lightboxIndex !== null && images[lightboxIndex] && (
            <>
              <Box
                component="img"
                src={images[lightboxIndex].src}
                alt={images[lightboxIndex].alt || 'Enlarged view'}
                sx={{
                  maxWidth: '90vw',
                  maxHeight: '85vh',
                  objectFit: 'contain',
                  borderRadius: 1,
                }}
              />
              {images[lightboxIndex].caption && (
                <Typography
                  variant="body2"
                  sx={{ color: '#aaa', textAlign: 'center', mt: 1 }}
                >
                  {images[lightboxIndex].caption} ({lightboxIndex + 1}/{images.length})
                </Typography>
              )}
            </>
          )}
        </Box>
      </Modal>
    </WikiLayout>
  );
}
