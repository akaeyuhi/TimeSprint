import { createStyleSheet } from 'src/utils/theme/createStyleSheet';

export const styles = createStyleSheet({
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
    left: '53%',
    backgroundColor: 'none',
    width: 20,
    height: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    visibility: 'hidden',
  },
});
