import React, { useState } from 'react';
import { FaQuestion } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';



function gradeCheckboxSelections(newSelections, options) {
	let answers = options.map( (answerOption, j) => {
		// An incorrect answer should not be selected, and 
		// an correct answer should be selected.
		return answerOption.answer == newSelections.has(j);
	});
	if( answers.some( v => v === false )) {
		// There is a wrong or incomplete answer.
		return false;
	} else {
		// Right!
		return true;
	}
}

export function gradeReducer(state, action) {
    // console.log('==> dispatched ', action.type);
    switch (action.type) {  
      case 'radio':
        state = { ...state }

		let newSelections = new Set([action.optionNumber]);
		let correct = action.options[action.optionNumber].answer === action.checked;
		state.quizResults[action.question] = correct;
        state.selections[action.question] = newSelections;
		break;		
	  case 'checkbox':
		state = { ...state }

		if( action.checked ) {
			state.selections[action.question].add(action.optionNumber)
		} else {
			state.selections[action.question].delete(action.optionNumber);
		}

		state.quizResults[action.question] = gradeCheckboxSelections(state.selections, action.options);

	    break;
    
    }
    return state;
}

export default function Quiz(props) {
	// const questions = [
	// 	{title: "Untitled Question", type: "mc", options: [{text:"Option 1", answer: false}]}
	// ];
	// We're only supporting a single quesiton inside a cell at the moment.
	const question = props.data[0];

	const gradeState = props.gradeState;
	const dispatch = props.dispatch;
	
	// The question number in our current notebook.
	const globalQuestionNumber = props.questionNumber;

	// id for radio button groups, which need to be unique across entire page.
	const id = uuidv4();

	function isSelected(index) {
		return gradeState.selections[globalQuestionNumber].has(index);
	}

	function updateCheckboxSelection(j, checked ) {

		dispatch({type: 'checkbox', 
			question: globalQuestionNumber,
			optionNumber: j,
			checked: checked,
			options: question.options
		});    
	}

	// Radio buttons only are "true". The act of selecting a radio button, implicitly sets 
	// other buttons in group to false. Instead of tracking selection state, which causes many re-renders per selection,
	// We simply track if the currently checked answer is correct, or not.
	function updateRadioSelection( j, checked ) {
		dispatch({type: 'radio', 
		question: globalQuestionNumber,
		optionNumber: j,
		checked: checked,
		options: question.options
	});    
	}

	function getFeedbackTextColor(isCorrect) {
		
		if( !props.feedbackOn ) {
			return "";
		}
		return isCorrect ? "text-green-500" : "text-red-500";
	}

	function QuestionTitle( {title} ) {
		return <span className="">{title}</span>;
	}

	return (
		<div className="relative p-16 rounded-lg border-4 border-purple-700 w-min-1/2 mx-20">
			<div className="flex">
				<div className="content-center w-1/2 text-2xl font-sans font-bold">
					<div className=""><span>{globalQuestionNumber+1}.&nbsp;&nbsp;</span>
					                  <QuestionTitle title={question.title}/></div>
				</div>
				<div className="ml-5 w-1/3 justify-between flex flex-col" >
				{question.type == "mc" && 
					<div>
						{question.options.map((answerOption, j) => (
						<div key={`${globalQuestionNumber} ${j}`} className={"flex items-center group"}>
							<input className="form-radio rounded-lg text-green-500" type="radio"
							 name={id}
							//  onClick={ e => updateRadioSelection(intParse(e.target.value), answerOption.answer) }
							 // Use uncontrolled management (DOM manages state of checked or not)
							onClick={(e) => {
								updateRadioSelection(j, e.target.checked); 
							}}
							defaultChecked={ isSelected(j) } 
							/>
							<div className={`ml-2 w-full ${getFeedbackTextColor(answerOption.answer)}`}>
								<span>{answerOption.text}</span>
							</div>
						</div>
						))}
					</div>
				}
				{question.type == "cb" && 
					<div>
						{question.options.map((answerOption, j) => (
						<div key={j} className={"flex items-center group"}>
							<input className="form-checkbox text-green-500" value={j} type="checkbox" 
								// onChange={(e) => updateCheckboxSelection(j, e.target.checked)}
								onClick={(e) => updateCheckboxSelection(j, e.target.checked) }
								defaultChecked={ isSelected(j) }
							/>
							<div className={`ml-2 w-full ${getFeedbackTextColor(answerOption.answer)}`}>
								{answerOption.text}
							</div>
						</div>
						))}
					</div>
				}
				</div>
			</div>
		</div>
	);
}