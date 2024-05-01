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
    width: 400,
    borderRadius: 2,
  }
});
