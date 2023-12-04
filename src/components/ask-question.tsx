import React, { forwardRef, useRef } from 'react';

interface AskQuestionProps {
  onSubmit: (question: string) => void;
}

const AskQuestion = forwardRef<HTMLInputElement, AskQuestionProps>(
  (props, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);

		const handleSubmit = ( e: React.FormEvent ) => {
			console.log('submit');
      e.preventDefault();
      if (inputRef.current) {
        const question = inputRef.current.value;
        props.onSubmit(question);
        inputRef.current.value = '';
      }
    };

    return (
      <form onSubmit={handleSubmit} className="p-5 w-full flex flex-col">
        <input
          type="text"
          ref={inputRef}
          minLength={5}
          maxLength={100}
          className="bg-black bg-opacity-75 text-white p-5 rounded"
          placeholder="Zadaj pytanie"
          required
        />
        <button type="submit" className="bg-white text-black p-2 rounded mt-5">
          Zadaj pytanie, a następnie wybierz karty
        </button>
      </form>
    );
  },
);

AskQuestion.displayName = 'AskQuestion';
export default AskQuestion;
