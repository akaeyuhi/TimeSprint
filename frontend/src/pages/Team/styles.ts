import { createStyleSheet } from 'src/utils/theme/createStyleSheet';

export const styles = createStyleSheet({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  modalAvatar: {
    width: 60,
    height: 60,
    mx: 'auto',
    cursor: 'pointer',
  },
  avatarBox: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    mt: 1,
    '&:hover .deleteButton': {
      visibility: 'visible',
    },
  },
  deleteButton: {
    position: 'absolute',
    top: 0,
    right: 100,
    backgroundColor: 'red',
    width: 20,
    height: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    visibility: 'hidden',
  },
  textBox: {
    display: 'flex',
    alignItems: 'center',
  },
  projectBox: {
    display: 'flex',
    flexDirection: 'column',
  },
  controlsBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mt: '0.5rem',
  },
});
