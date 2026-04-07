type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export const Button = ({ variant = "primary", ...props }: Props) => {
  const style =
    variant === "primary"
      ? { background: "#4caf50", color: "white" }
      : { background: "#444", color: "white" };

  return (
    <button
      {...props}
      style={{
        padding: "8px 16px",
        border: "none",
        borderRadius: 6,
        cursor: "pointer",
        ...style
      }}
    />
  );
};