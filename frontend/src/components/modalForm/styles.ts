import { createStyleSheet } from 'src/utils/theme/createStyleSheet';
import { palette } from 'src/utils/theme/palette';

export const styles = createStyleSheet({
  box: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: palette.background.paper,
    boxShadow: 24,
    p: 4,
    width: '40vw',
    borderRadius: 2,
    overflow: 'scroll',
  },
  buttonContainer: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    mt: '1rem',
  },
  container: {
    width: '100%',
    '& > *': {
      mb: '1.5rem',
      '& > div': {
        padding: '0 1rem ',
      },
    },
  },
});
