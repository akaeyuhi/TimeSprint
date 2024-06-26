import { createStyleSheet } from 'src/utils/theme/createStyleSheet';

export const styles = createStyleSheet({
  chip: {
    cursor: 'pointer',
    transition: 'color 0.2s, background-color 0.2s',
  },
  toolbar: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  menu: {
    mt: '0.25rem',
  },
});
