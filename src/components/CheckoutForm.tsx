import { Button } from "@mui/material";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { Appearance } from "@stripe/stripe-js";
import { FC, useEffect, useState } from "react";

type Props = {
  clientSecret: string;
};
const CheckoutForm: FC<Props> = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();

  const appearance: Appearance = {
    theme: "night",
  };
  useEffect(() => {
    stripe?.elements({ clientSecret, appearance: appearance });
  }, []);

  const [message, setMessage] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/flashcards`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.type);
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsProcessing(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" key={import.meta.env.VITE_SECRET} />
      <Button
        fullWidth
        disableElevation
        disableRipple
        color="secondary"
        variant="contained"
        sx={{
          width: "400px",
        }}
        disabled={isProcessing || !stripe || !elements}
        id="submit"
      >
        {isProcessing ? "Processing ... " : "Pay now"}
      </Button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
};

export default CheckoutForm;
