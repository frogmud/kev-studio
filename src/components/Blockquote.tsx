import { Box, Typography } from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import { tokens } from '../theme';

interface BlockquoteProps {
  text: string;
  attribution?: string;
}

export function Blockquote({ text, attribution }: BlockquoteProps) {
  return (
    <Box
      sx={{
        borderLeft: `3px solid ${tokens.colors.accent}`,
        bgcolor: `${tokens.colors.accent}10`,
        px: 3,
        py: 2,
        my: 2,
        borderRadius: `0 ${tokens.radius.sm}px ${tokens.radius.sm}px 0`,
        position: 'relative',
      }}
    >
      <FormatQuoteIcon
        sx={{
          position: 'absolute',
          top: 8,
          right: 12,
          fontSize: 32,
          color: `${tokens.colors.accent}30`,
        }}
      />
      <Typography
        variant="body1"
        sx={{
          fontStyle: 'italic',
          color: tokens.colors.text.primary,
          lineHeight: 1.7,
        }}
      >
        {text}
      </Typography>
      {attribution && (
        <Typography
          variant="body2"
          sx={{
            mt: 1,
            color: tokens.colors.text.muted,
          }}
        >
          -- {attribution}
        </Typography>
      )}
    </Box>
  );
}
