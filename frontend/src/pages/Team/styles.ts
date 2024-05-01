import { createStyleSheet } from 'src/utils/theme/createStyleSheet';

export const styles = createStyleSheet({
  container: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  modalAvatar: {
    width: 60,
    height: 60,
    mx: 'auto',
    cursor: 'pointer'
  },
  avatarBox: {
    display: 'flex',
    alignItems: 'center',
    mt: 1,
  },
  textBox: {
    display: 'flex',
    alignItems: 'center'
  },
  projectBox: {
    display: 'flex',
    flexDirection: 'column'
  },
  controlsBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mt: '1rem',
  }
});
