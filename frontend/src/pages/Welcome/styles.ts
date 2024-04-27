import { createStyleSheet } from 'src/utils/theme/createStyleSheet';

export const styles = createStyleSheet({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  centeredBox: {
    marginTop: '8rem',
  },
  slogan: {
    marginBottom: '4rem',
    textAlign: 'center',
    fontSize: 24
  },
  headingBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '2rem',
  },
  buttonBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  description: {
    marginBottom: '4rem',
    textAlign: 'center',
  },
  button: {
    margin: '2rem',
  },
});
