import { createStyleSheet } from 'src/utils/theme/createStyleSheet';

export const styles = createStyleSheet({
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
      mb: '2rem',
      '& > div': {
        padding: '0 0.5rem ',
      },
    },
  },
  form: {
    mt: '1rem'
  }
});
