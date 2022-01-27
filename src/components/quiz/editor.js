import React, {useState} from 'react';

//import ContentEditable from "react-contenteditable";
import Editable from "@components/common/editable";
import QuestionMenu from './questionMenu';
import { IoCloseCircle } from "react-icons/io5";


export default function EditForm(props) {

    let defaultValue = [{title: "Untitled Question", type: "mc", options: [{text:"Option 1", answer: false}]}];
    const [questions, setQuestions] = useState(props.data || defaultValue);

    function updateQuestions(q) {
        setQuestions(q);
        props.onDataChange(q);
    }

    const handleTitleChange = (e, i ) => {
        var titleOfQuestion = [...questions];
        titleOfQuestion[i].title = e.target.value;
        updateQuestions(titleOfQuestion);
    };

    const changeQuestionType = (v, i ) => {
        var typeOfQuestion = [...questions];
        typeOfQuestion[i].type = v;
        updateQuestions(typeOfQuestion);
    };

    const highlightAll = () => {
        setTimeout(() => {
          document.execCommand('selectAll', false, null)
        }, 0)
      }

    const updateOption = (v, i, j) => {
        var q = [...questions];
        q[i].options[j].text = v;
        updateQuestions(q);
    }

    const addOption = (e, i) => {
        var q = [...questions];
        q[i].options.push( {text: `Option ${q[i].options.length+1}`, answer: false} );
        updateQuestions(q);
    }

    const removeOption = (e, o, i) => {
        var q = [...questions]
        q[i].options = q[i].options.filter(option => option.text != o);
        updateQuestions(q);
    }

    const setAnswer = (e,v, i, j) => {
        var q = [...questions];
        q[i].options[j].answer = v;
        updateQuestions(q);

        // e.preventDefault();
        e.stopPropagation();
    }

    // <ImCheckmark className="inline-block"/>

    return <div className="p-10 rounded-lg text-black w-full border border-gray-300 shadow">

        <div className="">
            <div>
                {questions.map((ques, i) => (
                <div className="flex flex-row" key={ques}>
                    <div className={"w-2/3"}                        
                    >                    
                        <input
                            type="text"
                            value={ques.title}
                            onChange={(e) => handleTitleChange(e,i)}
                            placeholder={`Question ${i}`}
                            className={
                                "w-full p-2 text-primary border rounded-md outline-none focus:ring-2 focus:ring-green-400 text-lg transition duration-150 ease-in-out mb-4"
                            }
                            onFocus={highlightAll}
                        />

                        {ques.options.map( (option, j) => 
                            <div key={j} className={"flex items-center group"}
                            >
                                {questions[i].type == "mc" && <input className="form-radio rounded-lg text-green-500" type="radio" readOnly checked={questions[i].options[j].answer}/>}
                                {questions[i].type == "cb" && <input className="form-checkbox text-green-500" type="checkbox" readOnly  checked={questions[i].options[j].answer}></input>}
                                <div className="ml-2 w-full"
                                                    
                                >
                                <Editable id={option.text} setId={v=>{updateOption(v,i,j)}}>
                                <div className="flex"
                                >
                                    { option.text || `Option ${j}`}
                                    <a className="invisible group-hover:visible hover:text-green-300 ml-auto"
                                        onClick={e=>setAnswer(e,!questions[i].options[j].answer, i,j)}                                       
                                    >{
                                        questions[i].options[j].answer?
                                        "Unmark as answer": "Select answer"
                                     }
                                    </a>
                                    <a className="invisible group-hover:visible hover:text-green-300 ml-3 my-auto"
                                        onClick={e => removeOption(e, questions[i].options[j].text, i)}
                                    >
                                        <IoCloseCircle/>
                                    </a>
                                </div>
                                <div className="invisible group-hover:visible h-0.5 bg-gray-200"></div>
 
                                </Editable>
                                {/* <ContentEditable
                                    html={option.text}
                                    onChange={e =>updateOption(e,i,j) }
                                    onKeyDown={e => handleKeyDown(e,i,j) }                    
                                /> */}
                                </div>
                            </div>
                        )}
                        <div>
                            {questions[i].type == "mc" && <input type="radio" disabled></input>}
                            {questions[i].type == "cb" && <input type="checkbox" disabled></input>}
                            <button className="ml-2 underline font-sm text-gray-500" 
                                onClick={ e=> addOption(e,i) }
                                >
                                Add another option
                            </button>
                        </div>
                    </div>
                        <div className="py-1 px-5 w-1/3">
                            <QuestionMenu type={questions[i].type} data={[]} onChange={v => changeQuestionType(v, i)}/>
                        </div>                        
                    </div>                    
                    )
                )}
            </div>
        </div>

    </div>
}