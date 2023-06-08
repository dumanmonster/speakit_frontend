import { VariantType, useSnackbar } from "notistack";
import { SlideTransition } from "../components/SlideTransition";
type Props = {
  variant: VariantType;
  message: string;
};

export const useNotification = () => {
  const { enqueueSnackbar } = useSnackbar();

  const notification = (props: Props) => {
    enqueueSnackbar(props.message, {
      variant: props.variant,
      anchorOrigin: { vertical: "bottom", horizontal: "left" },
      autoHideDuration: 3000,
      preventDuplicate: true,
      TransitionComponent: SlideTransition,
    });
  };

  return [notification];
};
