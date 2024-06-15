import { createStyleSheet } from 'src/utils/theme/createStyleSheet';

export const styles = createStyleSheet({
  card: {
    cursor: 'pointer',
    padding: '0.5rem',
    transition: 'outline 0.3s, transform 0.3s',
    '&:hover': {
      transform: 'translate(0, -0.3rem)',
      outline: '0.05rem solid',
      outlineColor: 'primary.main',
    },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
