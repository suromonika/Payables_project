import './index.css';

function ExplanationBar() {
  const explanations = [
    'Company',
    'Invoice Date',
    'Service Date',
    'Invoice Number',
    'Invoice Amount',
    'Actions',
  ];

  return (
    <div className='ExplanationBar'>
      {explanations.map((explanation) => {
        return <span>{explanation}</span>;
      })}
    </div>
  );
}

export default ExplanationBar;
