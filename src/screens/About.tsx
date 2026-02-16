import { Box, Typography, Chip, Stack, Paper, Button, useTheme } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import BrushIcon from '@mui/icons-material/Brush';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import PaletteIcon from '@mui/icons-material/Palette';
import LaunchIcon from '@mui/icons-material/Launch';
import { getAbout } from '../data';
import { WikiLayout, SectionAnchor, SectionHeader } from '../components';
import { tokens } from '../theme';

// Icon mapping
const iconMap: Record<string, React.ElementType> = {
  LinkedIn: LinkedInIcon,
  GitHub: GitHubIcon,
  Brush: BrushIcon,
  VideoLibrary: VideoLibraryIcon,
  Palette: PaletteIcon,
};

export function About() {
  const about = getAbout();
  const theme = useTheme();
  const pfpSrc = theme.palette.mode === 'dark'
    ? '/assets/kevin-pfp-dark-mode.png'
    : '/assets/kevin-pfp-light-mode.png';

  const sections = [
    { id: 'bio', title: 'Bio' },
    { id: 'experience', title: 'Experience' },
    { id: 'skills', title: 'Skills' },
    { id: 'connect', title: 'Connect' },
  ];

  // Infobox content
  const infobox = (
    <Box>
      {/* Profile image */}
      {pfpSrc ? (
        <Box
          sx={{
            width: '100%',
            borderRadius: 1,
            mb: 2,
            bgcolor: tokens.colors.background.elevated,
            overflow: 'hidden',
          }}
        >
          <Box
            component="img"
            src={pfpSrc}
            alt={about.name}
            sx={{
              width: '100%',
              display: 'block',
            }}
          />
        </Box>
      ) : (
        <Box
          sx={{
            width: '100%',
            aspectRatio: '1/1',
            bgcolor: tokens.colors.background.paper,
            borderRadius: 1,
            mb: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h1" sx={{ color: tokens.colors.text.muted, fontSize: '4rem' }}>
            {about.name.charAt(0)}
          </Typography>
        </Box>
      )}

      {/* Name & Title */}
      <Typography variant="h2" sx={{ mb: 0.5 }}>
        {about.name}
      </Typography>
      <Typography variant="body2" sx={{ color: tokens.colors.text.secondary, mb: 1 }}>
        {about.title}
      </Typography>
      <Typography variant="body2" sx={{ color: tokens.colors.text.muted }}>
        {about.location}
      </Typography>
    </Box>
  );

  return (
    <WikiLayout infobox={infobox} sections={sections}>
      {/* Bio */}
      <SectionAnchor id="bio">
        <SectionHeader title="Bio" />
        <Typography variant="body1" sx={{ mb: 2 }}>
          {about.description}
        </Typography>
      </SectionAnchor>

      {/* Experience */}
      <SectionAnchor id="experience">
        <SectionHeader title="Experience" />
        <Stack spacing={2}>
          {about.experience.map((exp, i) => (
            <Paper
              key={i}
              elevation={0}
              sx={{
                p: 2,
                bgcolor: tokens.colors.background.elevated,
              }}
            >
              <Typography variant="h3" sx={{ mb: 0.5 }}>
                {exp.role}
              </Typography>
              <Typography variant="body2" sx={{ color: tokens.colors.accent, mb: 0.5 }}>
                {exp.company}
              </Typography>
              <Typography variant="body2" sx={{ color: tokens.colors.text.muted, mb: 1 }}>
                {exp.period}
              </Typography>
              {exp.description && (
                <Typography variant="body2" sx={{ color: tokens.colors.text.secondary }}>
                  {exp.description}
                </Typography>
              )}
            </Paper>
          ))}
        </Stack>
      </SectionAnchor>

      {/* Skills */}
      <SectionAnchor id="skills">
        <SectionHeader title="Skills" />
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {about.skills.map((skill) => (
            <Chip
              key={skill}
              label={skill}
              sx={{
                bgcolor: tokens.colors.background.elevated,
                border: `1px solid ${tokens.colors.border}`,
                color: tokens.colors.text.primary,
                mb: 1,
              }}
            />
          ))}
        </Stack>
      </SectionAnchor>

      {/* Connect */}
      <SectionAnchor id="connect">
        <SectionHeader title="Connect" />
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {about.links.map((link) => {
            const IconComponent = link.icon ? iconMap[link.icon] : LaunchIcon;
            return (
              <Button
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                startIcon={IconComponent ? <IconComponent /> : undefined}
                sx={{
                  borderColor: tokens.colors.border,
                  color: tokens.colors.text.primary,
                  bgcolor: tokens.colors.background.elevated,
                  '&:hover': {
                    borderColor: tokens.colors.accent,
                    bgcolor: `${tokens.colors.accent}20`,
                  },
                }}
              >
                {link.label}
              </Button>
            );
          })}
        </Stack>
      </SectionAnchor>
    </WikiLayout>
  );
}
