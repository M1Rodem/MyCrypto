export const TextArea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  return (
    <textarea
      {...props}
      style={{
        width: "100%",
        height: 120,
        padding: 10,
        borderRadius: 6,
        marginTop: 10
      }}
    />
  );
};