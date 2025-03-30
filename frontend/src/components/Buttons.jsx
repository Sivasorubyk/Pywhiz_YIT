const GreenButton = ({ text, onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-lg text-lg transition ${
        disabled
          ? "bg-gray-400 text-gray-600 cursor-not-allowed"
          : "mt-8 px-6 py-3 bg-[#28BEBE] text-black outline outline-[#003366] rounded-lg text-lg hover:bg-[#CCE5E5]"
      }`}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

const BlueButton = ({ text, onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-lg text-lg transition ${
        disabled
          ? "bg-gray-400 text-gray-600 cursor-not-allowed"
          : "mt-8 px-6 py-3 bg-[#73B9EE] text-black outline outline-[#003366] hover:bg-[#CAE9F5]"
      }`}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export { GreenButton, BlueButton };
