import { createStyleSheet } from 'src/utils/theme/createStyleSheet';
import { palette } from 'src/utils/theme/palette';

export const styles = createStyleSheet({
  description: {
    display: 'flex',
    mt: '2rem',
    alignItems: 'center',
    width: '100%',
    outline: '0.05rem solid',
    outlineColor: palette.primary.main,
    padding: '1rem',
    borderRadius: '0.5rem',
  },
  avatar: {
    width: 150,
    height: 150,
    fontSize: '4rem',
  },
  teamStack: {
    outline: '0.05rem solid',
    outlineColor: palette.primary.main,
    borderRadius: '0.5rem',
    padding: '1rem',
  },
});
