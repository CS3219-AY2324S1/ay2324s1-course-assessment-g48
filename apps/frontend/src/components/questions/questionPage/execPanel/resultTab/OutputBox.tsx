type OutputBoxProps = {
  title: string;
  content: string | JSX.Element;
};

const OutputBox: React.FC<OutputBoxProps> = ({ title, content }) => {
  return (
    <div className="flex items-start space-x-4">
      <p className="text-sm font-medium mt-4 dark:text-white">{title}</p>
      <div
        className="w-full h-14 rounded-lg border px-3 py-[10px] bg-slate-100 
    border-transparent text-white font-normal text-sm mt-2 transition-all 
    overflow-y-auto dark:bg-neutral-700"
      >
        <pre>{content}</pre>
      </div>
    </div>
  );
};

export default OutputBox;
