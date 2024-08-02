import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function AddFAQ() {
    const [ques, setQues] = useState([{ question: '', answer: '' }]);
    const [savedQues, setSavedQues] = useState([]);
    const {title}=useParams


    const addQuestion = () => {
        setQues([...ques, { question: '', answer: '' }]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            ques.forEach((item, index) => {
                formData.append(`qs[${index}].question`, item.question);
                formData.append(`qs[${index}].answer`, item.answer);
            });
            console.log(ques)
            setSavedQues([...savedQues, ...ques]);
            
            console.log("formData", formData);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleQuesChange = (index, key, value) => {
        const updatedQues = [...ques];
        updatedQues[index][key] = value;
        setQues(updatedQues);
    };

    return (
        <>
        {savedQues.map((item, index) => (
                <div key={index}>
                    <h3>{item.question}</h3>
                    <p>{item.answer}</p>
                    <button className="btn btn-outline-dark" type="button">
                        Edit
                    </button>
                </div>
            ))}
            {ques.map((item, index) => (
                <form key={index}>
                    <h1>Add Question Here</h1>
                    <div>
                        <textarea
                            type="text"
                            className="form-control mt-1"
                            placeholder="Question Here"
                            rows={1}
                            value={item.question}
                            onChange={(e) => handleQuesChange(index, 'question', e.target.value)}
                            required
                        />
                        <textarea
                            type="text"
                            className="form-control mt-1"
                            placeholder="Answer Here"
                            rows={3}
                            value={item.answer}
                            onChange={(e) => handleQuesChange(index, 'answer', e.target.value)}
                            required
                        />
                    </div>
                </form>
            ))}
            <button className="btn inline-flex justify-center btn-outline-dark mt-2 p-1" type="button" onClick={addQuestion}>
                Add Question
            </button>

            <div className="mt-3">
                <button className="btn inline-flex justify-center btn-outline-dark" type="button">
                    Save As Draft
                </button>
                <button className="btn inline-flex justify-center btn-outline-dark ml-3 bg-green-400" type="button" onClick={handleSubmit}>
                    Make FAQ Live
                </button>
            </div>
        </>
    );
}

export default AddFAQ;
