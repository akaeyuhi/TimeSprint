import { createStyleSheet } from "src/utils/theme/createStyleSheet";
import { palette } from "src/utils/theme/palette";

export const styles = createStyleSheet({
  card: {
    cursor: "pointer",
    width: 300,
    padding: "0.5rem",
    transition: "outline 0.3s, transform 0.3s",
    "&:hover": {
      transform: "translate(0, -0.3rem)",
      outline: "0.05rem solid",
      outlineColor: palette.primary.main
    }
  }
});
