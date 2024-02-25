import { Component, OnInit } from '@angular/core';
import quizz_questions from  "../../../assets/data/quizz_questions.json"
import { identifierName } from '@angular/compiler';
@Component({
  selector: 'app-base-quizz',
  templateUrl: './base-quizz.component.html',
  styleUrls: ['./base-quizz.component.css']
})
export class BaseQuizzComponent implements OnInit {
  title:string=""
  questions:any
  question_selected:any
  answers:string[]=[]
  answerselected:string=""
  questionindex:number=0
  questionmaxindex:number=0
  finished:boolean= false
  constructor() { }

  ngOnInit(): void {
    if(quizz_questions){
      this.finished=false;
      this.title=quizz_questions.title
      this.questions=quizz_questions.questions
      this.question_selected=this.questions[this.questionindex]
      this.questionindex=0
      this.questionmaxindex=this.questions.length

    }
  }
  button_choose(value:string){
  this.answers.push(value)
  this.nextStep()
  console.log(this.answers)
  
  }
  async nextStep(){
    this.questionindex+=1
    if( this.questionmaxindex>this.questionindex){
      this.question_selected=this.questions[this.questionindex]
    }
    else{
      const finalAnswer:string= await this.checkResult(this.answers)
      this.finished=true
      this.answerselected=quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results]
    }
  }
async checkResult(answers:string[]){
  const result=answers.reduce((previous,current,index,arr)=>{
  if(
  arr.filter(item=>item===previous).length>
  arr.filter(item=>item===current).length){
  return previous
  }
  else{return current}})
  return result

}
}
