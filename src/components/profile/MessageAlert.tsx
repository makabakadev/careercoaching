interface MessageAlertProps {
  message: {
    type: string;
    text: string;
  };
}

export function MessageAlert({ message }: MessageAlertProps) {
  if (!message.text) return null;

  return (
    <div className={`p-4 rounded-lg mb-4 ${
      message.type === 'success' 
        ? 'bg-green-500 bg-opacity-20 text-green-400' 
        : 'bg-red-500 bg-opacity-20 text-red-400'
    }`}>
      {message.text}
    </div>
  );
}