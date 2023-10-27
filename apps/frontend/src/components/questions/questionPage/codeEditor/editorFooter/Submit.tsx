type SubmitProps = {};

const Submit: React.FC<SubmitProps> = ({}) => {
  return (
    <button className="px-3 py-1.5 font-medium items-center transition-all focus:outline-none inline-flex text-sm dark:text-white dark:bg-green-600 dark:hover:bg-green-500 text-white bg-green-600 hover:bg-green-500 rounded-lg">
      Submit
    </button>
  );
};

export default Submit;
